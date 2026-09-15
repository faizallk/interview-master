const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const interviewController = require("../controllers/interview.controller")
const interveiwRouter = express.Router()
const upload = require("../middlewares/multer.middleware")
interveiwRouter.post("/",authMiddleware, upload.single("resume"), interviewController.generateInterveiwController)

module.exports = interveiwRouter