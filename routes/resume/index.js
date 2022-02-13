const express = require('express');
const UserModel = require('../../database/models/user');
// const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ResumeModel = require('../../database/models/userResume');
const InternModel = require('../../database/models/interns');
const Router = express.Router();

/* 
Route     /getresume/:id
descrip   getting user resume with user id
params    none
access    public
method    post
*/

Router.get("/getresume", async (req, res) => {
    try {
        const token = req.header('token');
        const data = jwt.verify(token, "sudhir$%%Agrawal");
        const id = data.User.id;
        const resumes = await ResumeModel.find({ user: id });
        if (!resumes) {
            return res.status(500).json({ error: 'User does not exists' });
        }
        return res.status(200).json(resumes);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

/* 
Route     /postresume/:id
descrip   posting user resume with user id
params    none
access    public
method    post
*/

Router.post("/postresume", async (req, res) => {
    try {
        const token = req.header('token');
        const data = jwt.verify(token, "sudhir$%%Agrawal");
        const id = data.User.id;
        const { resumeTitle, name, email, phone, github, linkedin, facebook, college, fromYearClg, toYearClg, percentageClg, school, fromYearSchl, toYearSchl, percentageSchl, skill1, skill2, skill3, interest1, interest2, interest3, companyName, position, duration, description } = req.body.credentials;

        const user = await ResumeModel.find({ user: id });
        const resume = await ResumeModel.create({
            user: id,
            resumeTitle, name, email, phone, github, linkedin, facebook,
            skills: [skill1, skill2, skill3],
            interests: [interest1, interest2, interest3],
            qualification: {
                college, fromYearClg, toYearClg, percentageClg, school, fromYearSchl, toYearSchl, percentageSchl
            },
            experience: {
                companyName, position, duration, description
            }
        })
        return res.status(200).json({ resume });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

/* 
Route     /updateresume
descrip   updating info from user resume with user id
params    user id
access    public
method    put
*/

Router.put("/editresume", async (req, res) => {
    try {
        const token = req.header('token');
        const data = jwt.verify(token, "sudhir$%%Agrawal");
        const id = data.User.id;
        const { resumeTitle, name, email, phone, github, linkedin, facebook, college, fromYearClg, toYearClg, percentageClg, school, fromYearSchl, toYearSchl, percentageSchl, skill1, skill2, skill3, interest1, interest2, interest3, companyName, position, duration, description, title, link, projectDescription } = req.body;
        let resume = await ResumeModel.findOne({ user: id, resumeTitle: resumeTitle });
        // console.log(req.body);
        const credentials = {
            resumeTitle, name, email, phone, github, linkedin, facebook,
            skills: [skill1, skill2, skill3],
            interests: [interest1, interest2, interest3],
            qualification: {
                college, fromYearClg, toYearClg, percentageClg, school, fromYearSchl, toYearSchl, percentageSchl
            },
            projects: {
                title, link, projectDescription 
            },
            experience: {
                companyName, position, duration, description
            }
        }
        resume = await ResumeModel.findOneAndUpdate({ resumeTitle: resumeTitle },
            {
                $set: credentials
            }, {
            new: true
        });
        return res.status(200).json(resume);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})


/* 
Route     /deleteresume/:id
descrip   deleting user resume with user id
params    user id
access    public
method    delete
*/

Router.delete("/deleteresume/:id", async (req, res) => {
    try {
        const user = await ResumeModel.findOne({ user: req.params.id });
        if (!user) {
            return res.status(500).json({ error: 'user resume does not exists' });
        }
        const userResume = await ResumeModel.findOneAndDelete({
            user: req.params.id
        });
        return res.status(200).json({ userResume });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})


module.exports = Router;