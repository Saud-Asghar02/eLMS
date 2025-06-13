const express = require('express');
const router = express.Router();
const loggedIn = require('../middlewares/loggedIn');
const isLoggedIn = require('../middlewares/isLoggedIn');

const ownerModel = require('../models/ownerModel');
const userModel = require('../models/userModel');
const courseModel = require('../models/courseModel');

const upload = require('../config/multerConfig');

router.get("/admin", isLoggedIn, loggedIn, async (req, res) => {
    try {
        const userInfo = await userModel.findById(req.user._id);

        if (!userInfo) {
            return res.redirect("/login"); // Redirect to login if user not found
        }

        // Find the owner linked to the user and populate courses
        const owner = await ownerModel.findOne({ userID: userInfo._id }).populate("courses");
        let userCartInfo = null;
        if (req.user) {
            userCartInfo = await userModel.findOne({ email: req.user.email }).populate('cart');
        }

        res.render("admin", { user : userInfo, userCartInfo, owner, courses: owner ? owner.courses : [] }); // Pass courses to EJS
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/admin/:id", isLoggedIn, upload.single("userPicture"), async (req, res) => {
    try {
        const { phoneNumber, location, userBio, aboutUser, language, skills, socialMediaLink } = req.body;

        let updateData = {
            phoneNumber,
            location,
            userBio,
            aboutUser,
            language,
            skills,
            socialMediaLink
        };

        if (req.file) {
            updateData.userPicture = req.file.filename;
        }

        let user = await userModel.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }

        res.redirect("/owner/admin");
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
});
  
router.get('/admin/new-course', isLoggedIn, loggedIn, async (req,res)=> {
    let userCartInfo = null;
    if (req.user) {
        userCartInfo = await userModel.findOne({ email: req.user.email }).populate('cart');
    }

    const course = await courseModel.findOne(req.params)
    res.render('create-course', { course, userCartInfo });
});

router.post('/admin/new-course/:id', isLoggedIn, upload.fields([
    { name: "image" }, 
    { name: "video" }, 
    { name: "lectureVideo" }
]), async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.user.email });

        if (!user) {
            return res.status(404).send("User not found");
        }

        let owner = await ownerModel.findOne({ userID: user._id });

        if (!owner) {
            owner = new ownerModel({
                userID: user._id,
                username: user.username,
                email: user.email,
                courses: []
            });
            await owner.save();
        }

        const { title, paragraph, aboutCourse, language, level, description, requirement, topics, learning, price, discount } = req.body;
        let { sectionTitle, lectureTitle } = req.body;
        const lectureVideos = req.files && req.files.lectureVideo
            ? (Array.isArray(req.files.lectureVideo) ? req.files.lectureVideo : [req.files.lectureVideo])
            : [];

        sectionTitle = Array.isArray(sectionTitle) ? sectionTitle : [sectionTitle];
        lectureTitle = Array.isArray(lectureTitle) ? lectureTitle : [lectureTitle];

        let videoCounter = 0; // Initialize a video counter

        const content = sectionTitle.map((title, index) => {
            const lectures = Array.isArray(lectureTitle[index]) ? lectureTitle[index] : [lectureTitle[index]];

            return {
                sectionTitle: title,
                lectures: lectures.map((lecture) => {
                    const matchingVideo = lectureVideos[videoCounter] || null;
                    const lectureData = {
                        lectureTitle: lecture,
                        lectureVideo: matchingVideo ? matchingVideo.filename : null,
                    };
                    videoCounter++; // Increment the counter
                    return lectureData;
                }),
            };
        });

        // Calculate total lectures dynamically
        const totalLectures = content.reduce((sum, section) => sum + section.lectures.length, 0);
        const totalDuration = null; // You can update this logic if needed

        const newCourse = new courseModel({
            owner: owner._id,
            ownerName: owner.username,
            image: req.files.image ? req.files.image[0].filename : null,
            video: req.files.video ? req.files.video[0].filename : null,
            title,
            paragraph,
            aboutCourse,
            language,
            level,
            description,
            requirement,
            topics,
            learning,
            content,
            totalLectures, // Dynamically calculated
            totalDuration,
            price,
            discount
        });

        await newCourse.save();

        owner.courses = owner.courses || [];
        owner.courses.push(newCourse._id);
        await owner.save();

        res.redirect('/owner/admin');
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/admin/course/delete/:id', isLoggedIn, async (req, res) => {
    try {
        const courseId = req.params.id;

        // Step 1: Delete the course from the Course model
        const deletedCourse = await courseModel.findByIdAndDelete(courseId);

        // Step 2: Remove the course reference from the Owner model
        await ownerModel.updateMany(
            { courses: courseId },  // Find owners who have this course
            { $pull: { courses: courseId } } // Remove the course ID from their list
        );

        res.redirect('/owner/admin');
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get("/admin/delete/:id", isLoggedIn, async (req, res) => {
    try {
        const userId = req.params.id;

        // Find and delete user by _id
        const user = await userModel.findByIdAndDelete(userId);
        if (!user) {
            res.clearCookie("token");
            req.flash("error", "User not found or already deleted");
            return res.redirect('/');
        }

        // Find and delete owner by userID
        const owner = await ownerModel.findOneAndDelete({ userID: userId });

        // Delete courses related to the owner (if owner exists)
        if (owner) {
            await courseModel.deleteMany({ owner: owner._id });
        }

        res.clearCookie("token");
        req.flash("success", "Account and associated records deleted successfully.");
        return res.redirect('/');
    } catch (error) {
        req.flash("error", "Server error: " + error.message);
        return res.redirect('/');
    }
});

module.exports = router;