const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const interviewController = require("../controllers/interview.controller")
const interveiwRouter = express.Router()
const upload = require("../middlewares/multer.middleware")

/*
    @method - POST
    @end-point - /api/v1/interview
    @description - generate interview questions
*/
interveiwRouter.post("/", authMiddleware, upload.single("resume"), interviewController.generateInterveiwController)
interveiwRouter.get("/", authMiddleware, interviewController.getAllInterviewReportsController)
interveiwRouter.get("/report/:interview", authMiddleware, interviewController.getInterveiwController)

module.exports = interveiwRouter