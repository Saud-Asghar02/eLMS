const express = require('express');
const router = express.Router();
const loggedIn = require('../middlewares/loggedIn');
const isLoggedIn = require('../middlewares/isLoggedIn');

const ownerModel = require('../models/ownerModel');
const userModel = require('../models/userModel');
const courseModel = require('../models/courseModel');

const upload = require('../config/multerConfig');


router.get('/', loggedIn, async (req, res) => {
    try {
        let filter = {};
        const { topic, search } = req.query;

        if (topic) {
            filter.topics = { $in: [topic] };
        }

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { topics: { $regex: search, $options: "i" } },
            ];
        }

        let userCartInfo = null;
        if (req.user) {
            userCartInfo = await userModel.findOne({ email: req.user.email }).populate('cart');
        }

        // ✅ Populate reviews and users inside reviews
        const rawCourses = await courseModel.find(filter)
            .populate('reviews.user', 'username userPicture');

        // ✅ Enhance each course with review data
        const courses = rawCourses.map(course => {
            const reviews = course.reviews || [];
            const totalReviews = reviews.length;
            const averageRating = totalReviews > 0
                ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
                : 0;

            return {
                ...course._doc, // Spread the course data
                totalReviews,
                averageRating
            };
        });

        res.render('allCourses', { courses, userCartInfo });
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

router.get('/single-course/:id', loggedIn, async (req, res) => {
    try {
        const course = await courseModel.findById(req.params.id)
            .populate({
                path: 'owner',
                populate: {
                    path: 'userID',
                    model: 'users',
                    select: 'userPicture username'
                }
            })
            .populate('reviews.user', 'username userPicture');

        if (!course) return res.status(404).send('Course not found');

        const user = req.user || { cart: [] };  // If no user, fallback to empty cart
        let userCartInfo = null;

        if (req.user) {
            userCartInfo = await userModel.findOne({ email: req.user.email }).populate('cart');
        }

        // ✅ Calculate total reviews and average rating
        const reviews = course.reviews || [];
        const totalReviews = reviews.length;
        const averageRating = totalReviews > 0
            ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
            : 0;

        // ✅ Check if user is enrolled (only if the user is logged in)
        let isEnrolled = false;
        if (req.user) {
            const user = await userModel.findById(req.user._id);
            if (user && user.enrolledCourses.includes(course._id)) {
                isEnrolled = true;
            }
        }

        res.render('single-course', {
            course,
            owner: course.owner,
            userData: course.owner.userID,
            user,
            userCartInfo,
            reviews,
            totalReviews,      // <== Make sure these two are passed!
            averageRating,
            isEnrolled
        });
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// router.get('/profile/:username', loggedIn, async (req, res) => {
//     try {
//         const userInfo = await userModel.findOne({ username: req.params.username });

//         if (!userInfo) {
//             return res.status(404).send('User not found');
//         }

//         const owner = await ownerModel.findOne({ userID: userInfo._id }).populate({
//             path: 'courses',
//             model: 'courses',
//             populate: {
//                 path: 'owner',
//                 model: 'owner'
//             }
//         });

//         let userCartInfo = null;
//         if (req.user) {
//             userCartInfo = await userModel.findOne({ email: req.user.email }).populate('cart');
//         }

//         res.render('profile', {
//             userData : userInfo,
//             owner,
//             courses: owner ? owner.courses : [],
//             userCartInfo
//         });
//     } catch (error) {
//         res.status(500).send('Server Error');
//     }
// });

router.get('/profile/:username', loggedIn, async (req, res) => {
    try {
        const userInfo = await userModel.findOne({ username: req.params.username });
        if (!userInfo) return res.status(404).send('User not found');

        const owner = await ownerModel.findOne({ userID: userInfo._id }).populate({
            path: 'courses',
            model: 'courses',
            populate: {
                path: 'owner',
                model: 'owner'
            }
        });

        let userCartInfo = null;
        if (req.user) {
            userCartInfo = await userModel.findOne({ email: req.user.email }).populate('cart');
        }

        // ✅ Calculate average rating and total enrollments
        let totalRating = 0;
        let totalReviews = 0;
        let totalEnrolled = 0;

        if (owner && owner.courses.length > 0) {
            for (let course of owner.courses) {
                // Count enrolled students
                totalEnrolled += course.enrolledStudents?.length || 0;

                // Process reviews
                if (course.reviews && course.reviews.length > 0) {
                    for (let review of course.reviews) {
                        totalRating += review.rating;
                    }
                    totalReviews += course.reviews.length;
                }
            }
        }

        const averageRating = totalReviews ? (totalRating / totalReviews).toFixed(1) : 0;

        res.render('profile', {
            userData: userInfo,
            owner,
            courses: owner ? owner.courses : [],
            userCartInfo,
            averageRating,
            totalReviews,
            totalEnrolled
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.get('/single-course/addtocart/:courseid', loggedIn, async (req, res) => {
    const { courseid } = req.params;

    if (!req.user) {
        return res.redirect('/cart'); // Redirect to login page if the user is not logged in
    }

    let user = await userModel.findOne({ email: req.user.email });
    if (!user) {
        return res.status(404).send('User not found');
    }

    user.cart.push(courseid);
    await user.save();

    // Redirect to the course page after adding to the cart
    res.redirect(`/courses/single-course/${courseid}`);
});

router.get('/single-course/removefromcart/:courseid', isLoggedIn, loggedIn, async (req, res) => {
    const { courseid } = req.params;

    let user = await userModel.findOne({ email: req.user.email });

    // Remove the course from the cart
    user.cart = user.cart.filter(id => id.toString() !== courseid);
    await user.save();

    res.redirect('/cart'); // Redirect back to the cart page
});







router.get('/single-course/enroll/:courseid', isLoggedIn, loggedIn, async (req, res) => {
    try {
        const courseId = req.params.courseid;
        const course = await courseModel.findById(req.params.courseid);
        if (!course) {
            return res.status(404).send('❌ Course not found');
        }

        // Find the owner entry for this course
        let owner = await ownerModel.findOne({ courses: course._id });
        if (!owner) {
            return res.status(404).send('❌ Owner not found for this course');
        }

        // Check if user is already enrolled
        const alreadyEnrolled = owner.enrollStudent && owner.enrollStudent.includes(req.user._id);

        if (course.price === 0) {
            if (!alreadyEnrolled) {
                owner.enrollStudent.push(req.user._id);
                await owner.save();
                course.enrolledStudents.push(req.user._id);
                await course.save();
            }

            // Add the course to the user's enrolled courses
            const user = await userModel.findById(req.user._id);
            if (!user) {
                return res.status(404).send('❌ User not found');
            }

            if (!user.enrolledCourses.includes(course._id)) {
                user.enrolledCourses.push(course._id);
                await user.save();
            }

            return res.redirect('/courses/single-page/learning');
        } else {
            return res.redirect(`/courses/single-page/payment/${courseId}`);
        }
    } catch (error) {
        console.error('💥 Enrollment Server Error:', error);
        res.status(500).send('💥 Server Error: ' + error.message);
    }
});


router.get('/single-page/learning', isLoggedIn, loggedIn, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email }).populate('enrolledCourses');

        let userCartInfo = null;
        if (req.user) {
            userCartInfo = await userModel.findOne({ email: req.user.email }).populate('cart');
        }

        res.render('learning', { userEnrollInfo : user, userCartInfo });
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});


router.get('/single-page/payment/:courseId', isLoggedIn, loggedIn, async (req, res) => {
    try {
        // Access courseId from req.params (not req.query)
        const courseId = req.params.courseId;
        if (!courseId) return res.status(400).send("Course ID is required");

        const course = await courseModel.findById(courseId);
        if (!course) return res.status(404).send("Course not found");

        let userCartInfo = null;
        if (req.user) {
            userCartInfo = await userModel.findOne({ email: req.user.email }).populate('cart');
        }

        res.render('payment', { userCartInfo, course });
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

router.get('/single-page/payment', isLoggedIn, loggedIn, async (req, res) => {
    try {
        const course = await courseModel.findOne();  // Single course info
        if (!course) return res.status(404).send("Course not found");

        let userCartInfo = null;
        let totalPrice = 0;  // Initialize total price

        // If the user is logged in, fetch their cart and calculate total price
        if (req.user) {
            userCartInfo = await userModel.findOne({ email: req.user.email }).populate('cart');

            // Calculate total price if there are items in the cart
            if (userCartInfo && userCartInfo.cart.length > 0) {
                totalPrice = userCartInfo.cart.reduce((sum, course) => sum + course.price, 0);
            }
        }

        // Render the payment page with userCartInfo, totalPrice, and course
        res.render('payment', { userCartInfo, course, totalPrice });
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

router.get('/single-course/enrolled/:id', isLoggedIn, loggedIn, async (req, res) => {
    try {
        const course = await courseModel.findById(req.params.id)
            .populate({
                path: 'owner',
                populate: {
                    path: 'userID',
                    model: 'users',
                    select: 'userPicture username'
                }
            })
            .populate('reviews.user', 'username userPicture'); // 👈 Ensure you populate review user

        if (!course) {
            return res.status(404).send('Course not found');
        }

        const user = req.user || { cart: [] };
        let userCartInfo = null;
        if (req.user) {
            userCartInfo = await userModel.findOne({ email: req.user.email }).populate('cart');
        }

        // ✅ Calculate total reviews and average rating
        const reviews = course.reviews || [];
        const totalReviews = reviews.length;
        const averageRating = totalReviews > 0
            ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
            : 0;

        res.render('enroll', {
            course,
            owner: course.owner,
            userData: course.owner.userID,
            user,
            userCartInfo,
            reviews,          // 👈 Pass reviews if you need to display them
            totalReviews,     // 👈 Now available in your EJS
            averageRating
        });
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

router.post('/submit-review/:courseId', loggedIn, async (req, res) => {
    try {
        const { rating, reviewText } = req.body;
        const courseId = req.params.courseId;

        if (!rating || !reviewText) {
            return res.status(400).json({ error: 'Missing rating or review.' });
        }

        const course = await courseModel.findById(courseId);

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        const alreadyReviewed = course.reviews.some(
            (r) => r.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            return res.status(400).json({ error: 'You already reviewed this course' });
        }

        course.reviews.push({
            user: req.user._id,
            rating,
            reviewText
        });

        await course.save();
        res.status(200).json({ message: 'Review submitted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});
  

module.exports = router;