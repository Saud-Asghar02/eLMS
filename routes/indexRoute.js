const express = require('express');
const router = express.Router();
const loggedIn = require('../middlewares/loggedIn');
const isLoggedIn = require('../middlewares/isLoggedIn');

const userModel = require('../models/userModel');
const ownerModel = require('../models/ownerModel');
const courseModel = require('../models/courseModel');

const upload = require('../config/multerConfig');

router.get('/', loggedIn, async (req, res) => {
    try {
        if (req.user) {
            // Fetch user details along with cart if the user is logged in
            let user = await userModel.findOne({ email: req.user.email }).populate('cart');
            res.render('index', {
                success: req.flash("success"),
                error: req.flash("error"),
                userCartInfo: user, // Pass the logged-in user's data
            });
        } else {
            // Render index without user data if not logged in
            res.render('index', {
                success: req.flash("success"),
                error: req.flash("error"),
                userCartInfo: null, // No user is logged in
            });
        }
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

router.get('/cart', isLoggedIn, loggedIn, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email }).populate('cart');
        const course = await courseModel.find();

        res.render('cart', { userCartInfo : user, course });
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});


router.get('/api/search-suggestions', async (req, res) => {
    const query = req.query.q;
    if (!query) return res.json([]);

    try {
        const matchingCourses = await courseModel.find({
            topics: { $regex: query, $options: 'i' }
        }).select('topics');

        // Extract and flatten topics
        let topics = matchingCourses.flatMap(course => course.topics);

        // Filter unique and match search query
        const uniqueTopics = [...new Set(topics)].filter(topic =>
            topic.toLowerCase().includes(query.toLowerCase())
        );

        const suggestions = uniqueTopics.map(topic => ({ name: topic }));
        res.json(suggestions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;

