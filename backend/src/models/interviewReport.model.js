import mongoose = require("mongoose");


// Sub Schema for the technical questions
const technicalQuestions = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Question is required"]
    },
    intention: {
        type: Stirng,
        required: [true, "Intention is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }
}, {
    _id: false
})

// Sub Schema for the behavior questions
const behaviorQuestions = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Question is required"]
    },
    intention: {
        type: Stirng,
        required: [true, "Intention is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }
}, {
    _id: false
})
// Sub Schema for the Skill gaps
const skillGapSchema = new mongoose.Schema({
    skills: {
        type: String,
        required: [true, "Skills is required"]
    },
    severity: {
        type: String,
        enum: [
            "Low",
            "Medium",
            "High"
        ],
        default: "Medium"
        required: [true, "Severity is required"]
    }
}
    , {
        _id: false
    })

//sub schema for prepration plan
const preprationPlan = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "Day is required"]
    },
    task: [{
        type: String,
        required: [true, "Task is required"]
    }],
    focus:{
        type:String,
        required: [true, "Focus is required"]
    }
},{
    _id: false
})


//Main Interview Schema
const InterveiwReport = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, "Job description is required"]
    },
    resume: String,
    selfDescription: {
        type: String,
        required: [true, "Self description is required"]
    },
    matchScore: Number,
    technicalQuestions: [technicalQuestions],
    behaviorQuestions: [behaviorQuestions],
    skillGapSchema: [skillGapSchema],
    preprationPlan: [preprationPlan]
},
{
    timestamps:true
})


const interviewReoprtModel = mongoose.model('interviewReport', InterveiwReport);
module.exports = interviewReoprtModel;