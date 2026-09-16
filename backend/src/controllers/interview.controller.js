const express = require("express")
const pdfParse = require("pdf-parse");
const { generateInterviewReport, interviewReportSchema } = require("../services/ai.services");
const interviewReoprtModel = require("../models/interviewReport.model")

/*
    @method - POST
    @end-point - /api/v1/interview
    @description - generate interview questions
*/
async function generateInterveiwController(req, res) {

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const { selfDescription, jobDescription } = req.body

    try {
        const interviewReportByAi = await generateInterviewReport({

            resume: resumeContent.text,
            selfDescription,
            jobDescription,

        })


        const interviewReport = await interviewReoprtModel.create({
            userId: req.user.id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            ...interviewReportByAi
        })

        res.status(200).json({
            success: true,
            interviewReport
        })
    } catch (error) {
        console.log(error.message)
    }
}

async function getInterveiwController(req, res) {
    const interviewId = req.params.interview;

    if (!interviewId)
        return res.status(400).json({ success: false, message: "Interview Id is required" })

    try {
        const interviewReport = await interviewReoprtModel.findOne({ _id: interviewId, userId: req.user.id });
        if (!interviewReport)
            return res.status(404).json({ success: false, message: "Report not found" })
        return res.status(200).json({ success: true, interviewReport })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: err.message })
    }
}

async function getAllInterviewReportsController(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const [reports, total] = await Promise.all([
            interviewReoprtModel
                .find({ userId: req.user.id })
                .select("jobDescription matchScore createdAt")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            interviewReoprtModel.countDocuments({ userId: req.user.id })
        ]);

        return res.status(200).json({
            success: true,
            reports,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: err.message })
    }
}

module.exports = { generateInterveiwController, getInterveiwController, getAllInterviewReportsController }