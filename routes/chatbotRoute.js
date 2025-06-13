const express = require('express');
const router = express.Router();
const courseModel = require('../models/courseModel');
const userModel = require('../models/userModel');
const ownerModel = require('../models/ownerModel');
const axios = require('axios');

// Standard response format
const createResponse = (success, reply, data = null, metadata = {}, actions = []) => {
  return {
    success,
    reply,
    data,
    metadata,
    actions
  };
};

// Enhanced helper function to format course details
const formatCourseDetails = (courses) => {
  return courses.map(course => {
    // Calculate average rating
    const ratings = course.reviews || [];
    const avgRating = ratings.length > 0 
      ? (ratings.reduce((sum, review) => sum + review.rating, 0) / ratings.length).toFixed(1)
      : null;
    
    // Get enrolled count (would need to be populated or calculated separately)
    const enrolledCount = course.enrolledStudents ? course.enrolledStudents.length : 0;
    
    return {
      id: course._id,
      title: course.title,
      description: course.description || course.paragraph || 'No description available',
      price: course.price === 0 ? 'Free' : `Rs. ${course.price}`,
      duration: course.totalDuration || 'Not specified',
      instructor: course.ownerName || course.owner?.username || 'Unknown',
      rating: avgRating || 'Not rated',
      students: enrolledCount,
      category: course.category || course.level || 'General',
      thumbnail: course.image || course.thumbnail || '/images/default-course.jpg',
      link: `/courses/single-course/${course._id}`,
      reviewsCount: ratings.length
    };
  });
};

// Generate structured course response
const generateStructuredCourseResponse = (courses, title = 'Available Courses') => {
  const formattedCourses = formatCourseDetails(courses);
  
  // Text response for chat
  const textResponse = formattedCourses.map((course, index) => {
    return `${index + 1}. ${course.title}\n` +
           `   - Price: ${course.price}\n` +
           `   - Instructor: ${course.instructor}\n` +
           `   - Duration: ${course.duration}\n` +
           `   - Students: ${course.students}\n` +
           `   - Rating: ${course.rating}${course.reviewsCount ? ` (${course.reviewsCount} reviews)` : ''}\n` +
           `   - Category: ${course.category}\n` +
           `   - Link: ${course.link}`;
  }).join('\n\n');

  // Structured data for UI display
  const structuredData = {
    title: title,
    courses: formattedCourses,
    count: formattedCourses.length
  };

  // Suggested actions
  const actions = formattedCourses.length > 0 ? [{
    type: "showAll",
    label: "View All Courses",
    target: "/courses"
  }] : [];

  return createResponse(
    true,
    textResponse,
    structuredData,
    { displayType: 'structuredCourseList', count: formattedCourses.length },
    actions
  );
};

// Enhanced course query handler
async function handleCourseQuery(query) {
  try {
    // Count queries
    if (/how many|number of|count of/i.test(query)) {
      const [totalCount, freeCount] = await Promise.all([
        courseModel.countDocuments(),
        courseModel.countDocuments({ price: 0 })
      ]);
      
      const paidCount = totalCount - freeCount;
      
      if (/free/i.test(query)) {
        return createResponse(
          true,
          `We currently offer ${freeCount} free courses out of ${totalCount} total courses.`,
          { totalCourses: totalCount, freeCourses: freeCount }
        );
      }
      
      if (/paid/i.test(query)) {
        return createResponse(
          true,
          `We have ${paidCount} paid courses available in our catalog.`,
          { totalCourses: totalCount, paidCourses: paidCount }
        );
      }
      
      return createResponse(
        true,
        `Our platform currently has ${totalCount} courses available for learning.`,
        { totalCourses: totalCount }
      );
    }
    
    // List courses queries
    if (/list|show|what courses|available courses/i.test(query)) {
      const courses = await courseModel.find({})
        .select('title price description paragraph totalDuration ownerName image level reviews owner')
        .populate('owner', 'username')
        .limit(50)
        .lean();
        
      if (courses.length === 0) {
        return createResponse(
          true,
          "We currently don't have any courses listed.",
          { courses: [] }
        );
      }
      
      return generateStructuredCourseResponse(courses, 'Available Courses');
    }
    
    // Specific course details queries
    if (/give me|show me|details of|about/i.test(query)) {
      const count = parseInt(query.match(/\d+/)?.[0]) || 5;
      const isPaid = /paid/i.test(query);
      const isFree = /free/i.test(query);
      const isPopular = /popular|top|best/i.test(query);
      const isNew = /new|recent/i.test(query);
      
      let queryConditions = {};
      if (isPaid) queryConditions.price = { $gt: 0 };
      if (isFree) queryConditions.price = 0;
      
      let sortCriteria = { enrolledCount: -1 }; // Default to most popular
      if (isNew) sortCriteria = { date: -1 };
      
      const courses = await courseModel.find(queryConditions)
        .select('title price description paragraph totalDuration ownerName image level reviews date owner')
        .populate('owner', 'username')
        .sort(sortCriteria)
        .limit(count)
        .lean();
        
      if (courses.length === 0) {
        const type = isPaid ? 'paid' : isFree ? 'free' : '';
        return createResponse(
          true,
          `We currently don't have any ${type} courses listed.`,
          { courses: [] }
        );
      }
      
      let title = 'Course Details';
      if (isPaid) title = 'Paid Courses';
      if (isFree) title = 'Free Courses';
      if (isPopular) title = 'Popular Courses';
      if (isNew) title = 'New Courses';
      
      return generateStructuredCourseResponse(courses, title);
    }
    
    // Search by title
    const titleMatch = query.match(/title:(\w+)|"([^"]+)"|'([^']+)'/i);
    if (titleMatch) {
      const title = titleMatch[1] || titleMatch[2] || titleMatch[3];
      const courses = await courseModel.find({ 
        title: new RegExp(title, 'i')
      })
      .select('title price description paragraph totalDuration ownerName image level reviews owner')
      .populate('owner', 'username')
      .limit(5)
      .lean();
      
      if (courses.length > 0) {
        return generateStructuredCourseResponse(courses, `Courses matching "${title}"`);
      }
      return createResponse(
        true,
        `No courses found with title containing "${title}".`,
        { courses: [], searchTerm: title }
      );
    }
    
    // Topic-based queries
    const topicMatch = query.match(/react|python|node\.?js|javascript|java|html|css|web|mobile|data/i);
    if (topicMatch) {
      const topic = topicMatch[0].toLowerCase();
      const courses = await courseModel.find({ 
        $or: [
          { topics: new RegExp(topic, 'i') },
          { title: new RegExp(topic, 'i') },
          { description: new RegExp(topic, 'i') },
          { learning: new RegExp(topic, 'i') }
        ]
      })
      .select('title price description paragraph totalDuration ownerName image level reviews topics learning owner')
      .populate('owner', 'username')
      .limit(10)
      .lean();
      
      if (courses.length > 0) {
        return generateStructuredCourseResponse(courses, `${topic.charAt(0).toUpperCase() + topic.slice(1)} Courses`);
      }
      return createResponse(
        true,
        `Currently we don't have any ${topic} courses, but we may add them soon!`,
        { courses: [], topic }
      );
    }
    
    // Price range queries
    const priceMatch = query.match(/(under|below|less than|more than|above|over) (rs\.?|₹|rs )?(\d+)/i);
    if (priceMatch) {
      const operator = priceMatch[1].toLowerCase();
      const amount = parseInt(priceMatch[3]);
      
      let priceCondition = {};
      if (operator === 'under' || operator === 'below' || operator === 'less than') {
        priceCondition = { price: { $lt: amount } };
      } else if (operator === 'over' || operator === 'above' || operator === 'more than') {
        priceCondition = { price: { $gt: amount } };
      }
      
      const courses = await courseModel.find(priceCondition)
        .select('title price description paragraph totalDuration ownerName image level reviews owner')
        .populate('owner', 'username')
        .limit(10)
        .lean();
        
      if (courses.length > 0) {
        const operatorText = operator === 'under' ? 'under' : 'over';
        return generateStructuredCourseResponse(courses, `Courses ${operatorText} Rs. ${amount}`);
      }
      return createResponse(
        true,
        `No courses found ${operator} Rs. ${amount}.`,
        { courses: [] }
      );
    }
    
    return null;
  } catch (error) {
    console.error('Error handling course query:', error);
    return createResponse(
      false,
      "Sorry, I'm having trouble accessing the course information right now.",
      null,
      { error: error.message }
    );
  }
}

// Enhanced owner query handler
async function handleOwnerQuery(query) {
  try {
    if (query.includes('count') || query.includes('how many') || query.includes('number of')) {
      const count = await ownerModel.countDocuments();
      return createResponse(
        true,
        `Our platform has ${count} instructors creating courses.`,
        { ownerCount: count }
      );
    }
    
    if (query.includes('list') || query.includes('who are')) {
      const owners = await ownerModel.find({})
        .select('username email userBio courses')
        .populate('courses', 'title')
        .limit(10);
      
      if (owners.length === 0) {
        return createResponse(
          true,
          "We currently don't have any instructors listed.",
          { owners: [] }
        );
      }
      
      const ownerList = owners.slice(0, 5).map(o => 
        `${o.username} (${o.userBio ? o.userBio.substring(0, 30) + '...' : 'Instructor'})`
      ).join(', ');
      
      const more = owners.length > 5 ? ` and ${owners.length - 5} more` : '';
      
      const actions = [{
        type: "redirect",
        label: "View All Instructors",
        target: "/instructors"
      }];
      
      return createResponse(
        true,
        `Our instructors include ${ownerList}${more}.`,
        { owners },
        { count: owners.length },
        actions
      );
    }
    
    // Search for specific owner
    const nameMatch = query.match(/instructor:(\w+)|"([^"]+)"|'([^']+)'/i);
    if (nameMatch) {
      const name = nameMatch[1] || nameMatch[2] || nameMatch[3];
      const owner = await ownerModel.findOne({ 
        username: new RegExp(name, 'i')
      })
      .select('username email userBio courses')
      .populate('courses', 'title price image');
      
      if (owner) {
        const courseCount = owner.courses ? owner.courses.length : 0;
        const responseText = `Instructor ${owner.username} has ${courseCount} courses. ` +
          (owner.userBio ? `About: ${owner.userBio.substring(0, 100)}...` : '');
        
        const actions = [{
          type: "redirect",
          label: "View Instructor Profile",
          target: `/instructors/${owner._id}`
        }];
        
        if (courseCount > 0) {
          actions.push({
            type: "redirect",
            label: "View Their Courses",
            target: `/courses?instructor=${owner._id}`
          });
        }
        
        return createResponse(
          true,
          responseText,
          { owner },
          { courseCount },
          actions
        );
      }
      return createResponse(
        true,
        `No instructor found with name containing "${name}".`,
        { owner: null, searchTerm: name }
      );
    }
    
    return null;
  } catch (error) {
    console.error('Error handling owner query:', error);
    return createResponse(
      false,
      "Sorry, I'm having trouble accessing the instructor information right now.",
      null,
      { error: error.message }
    );
  }
}

// Enhanced user query handler
async function handleUserQuery(query, userId = null) {
  try {
    if (query.includes('count') || query.includes('how many') || query.includes('number of')) {
      const count = await userModel.countDocuments();
      return createResponse(
        true,
        `There are currently ${count} registered users on our platform.`,
        { userCount: count }
      );
    }
    
    // User profile queries
    if (query.includes('my profile') || query.includes('my account')) {
      if (!userId) {
        return createResponse(
          false,
          "Please log in to access your profile information.",
          null,
          {},
          [{
            type: "redirect",
            label: "Login",
            target: "/login"
          }]
        );
      }
      
      const user = await userModel.findById(userId)
        .select('username email userPicture phoneNumber location userBio aboutUser language skills');
      
      if (!user) {
        return createResponse(
          false,
          "User profile not found.",
          null,
          { error: "User not found" }
        );
      }
      
      const responseText = `Your profile:\n` +
        `- Name: ${user.username}\n` +
        (user.userBio ? `- Bio: ${user.userBio}\n` : '') +
        (user.location ? `- Location: ${user.location}\n` : '') +
        (user.skills?.length > 0 ? `- Skills: ${user.skills.join(', ')}\n` : '');
      
      const actions = [{
        type: "redirect",
        label: "View Full Profile",
        target: "/user/profile"
      }, {
        type: "redirect",
        label: "Edit Profile",
        target: "/user/profile/edit"
      }];
      
      return createResponse(
        true,
        responseText,
        { user },
        {},
        actions
      );
    }
    
    // User courses queries
    if (query.includes('my courses') || query.includes('enrolled')) {
      if (!userId) {
        return createResponse(
          false,
          "Please log in to view your enrolled courses.",
          null,
          {},
          [{
            type: "redirect",
            label: "Login",
            target: "/login"
          }]
        );
      }
      
      const user = await userModel.findById(userId)
        .select('enrolledCourses')
        .populate('enrolledCourses', 'title price image ownerName totalDuration');
      
      if (!user) {
        return createResponse(
          false,
          "User not found.",
          null,
          { error: "User not found" }
        );
      }
      
      if (!user.enrolledCourses || user.enrolledCourses.length === 0) {
        return createResponse(
          true,
          "You haven't enrolled in any courses yet.",
          { courses: [] },
          {},
          [{
            type: "redirect",
            label: "Browse Courses",
            target: "/courses"
          }]
        );
      }
      
      const formattedCourses = user.enrolledCourses.map(course => ({
        id: course._id,
        title: course.title,
        price: course.price === 0 ? 'Free' : `Rs. ${course.price}`,
        duration: course.totalDuration || 'Not specified',
        instructor: course.ownerName || 'Unknown',
        thumbnail: course.image || '/images/default-course.jpg',
        link: `/courses/single-course/${course._id}`
      }));
      
      const textResponse = `You're enrolled in ${formattedCourses.length} courses:\n` +
        formattedCourses.map((course, index) => {
          return `${index + 1}. ${course.title}\n` +
                 `   - Instructor: ${course.instructor}\n` +
                 `   - Duration: ${course.duration}\n` +
                 `   - Link: ${course.link}`;
        }).join('\n\n');
      
      const actions = [{
        type: "redirect",
        label: "View All Enrolled Courses",
        target: "/user/courses"
      }];
      
      return createResponse(
        true,
        textResponse,
        { courses: formattedCourses },
        { count: formattedCourses.length },
        actions
      );
    }
    
    return null;
  } catch (error) {
    console.error('Error handling user query:', error);
    return createResponse(
      false,
      "Sorry, I'm having trouble accessing user information right now.",
      null,
      { error: error.message }
    );
  }
}

// Main query endpoint
router.post('/query', async (req, res) => {
  const query = req.body.query?.trim() || '';
  const userId = req.user?.id; // Assuming user is attached to request if authenticated
  
  if (!query) {
    return res.status(400).json(createResponse(
      false,
      "Please provide a query to search.",
      null,
      { error: "Empty query" }
    ));
  }
  
  try {
    const lowerCaseQuery = query.toLowerCase();
    
    // First try course-related queries
    if (/course|class|learn|training|tutorial|price|instructor|teacher|lesson|module/i.test(lowerCaseQuery)) {
      const courseResponse = await handleCourseQuery(lowerCaseQuery);
      if (courseResponse) return res.json(courseResponse);
    }
    
    // Then try owner/instructor queries
    if (/owner|instructor|teacher|creator|educator/i.test(lowerCaseQuery)) {
      const ownerResponse = await handleOwnerQuery(lowerCaseQuery);
      if (ownerResponse) return res.json(ownerResponse);
    }
    
    // Then try user-related queries
    if (/user|profile|account|me|my|enrolled/i.test(lowerCaseQuery)) {
      const userResponse = await handleUserQuery(lowerCaseQuery, userId);
      if (userResponse) return res.json(userResponse);
    }
    
    // Finally forward to Python/Gemini
    const geminiResponse = await forwardToPythonAPI(query);
    return res.json(createResponse(
      true,
      geminiResponse,
      null,
      { source: "gemini" }
    ));
    
  } catch (err) {
    console.error("Chatbot error:", err);
    res.status(500).json(createResponse(
      false,
      "I'm having trouble answering that right now. Please try again later.",
      null,
      { error: err.message }
    ));
  }
});

async function forwardToPythonAPI(query) {
  try {
    const response = await axios.post('http://localhost:5000/chat', {
      message: query
    });
    return response.data.reply || "I'm not sure how to answer that. Could you try asking in a different way?";
  } catch (error) {
    console.error('Error forwarding to Python API:', error);
    return "I'm having trouble connecting to the knowledge base. Please try again later.";
  }
}

module.exports = router;