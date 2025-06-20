const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'owner'
    },
    ownerName: String,
    image: String,
    video: String,
    title: String,
    paragraph: String,
    aboutCourse: String,
    language: String,
    level: String,
    description: String,
    requirement: [{ type: String }],
    topics: [{ type: String }],
    learning: [{ type: String }],
    content: [{
        sectionTitle: String,
        lectures: [{
            lectureTitle: String,
            lectureVideo: String
        }]
    }],
    totalLectures: { type: Number, default: 0 },
    totalDuration: { type: String, default: 0 },
    price: Number,
    discount: {
        type: Number,
        default: 0,
    },
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        reviewText: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
    }],
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('courses', CourseSchema);