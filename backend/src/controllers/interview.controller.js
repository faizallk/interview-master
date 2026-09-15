const express = require("express")
const pdfParse = require("pdf-parse");
const { generateInterviewReport, interviewReportSchema } = require("../services/ai.services");
const interviewReoprtModel = require("../models/interviewReport.model")
async function generateInterveiwController(req,res){
  
    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const {selfDescription, jobDescription} = req.body

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
            success:true,
            interviewReport
        })
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {generateInterveiwController}