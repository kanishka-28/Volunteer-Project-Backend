const express = require('express');
const UserModel = require('../../database/models/user');
// const passport = require('passport');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
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

Router.get("/getresume/:id", async (req, res) => {
    try {

        const user = await ResumeModel.findOne({ user: req.params.id });
        if (!user) {
            return res.status(500).json({ error: 'User does not exists' });
        }

        return res.status(200).json({ details: user });

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

Router.post("/postresume/:id", async (req, res) => {
    try {
        const user = await ResumeModel.findOne({ user: req.params.id });
        if (!user) {
            const userResume = ResumeModel.create({ user: req.params.id, ...req.body.credentials });
            return res.status(200).json({ resume: userResume });
        }
        const userResume = await ResumeModel.findOneAndUpdate({
            user: req.params.id
        }, {
            $push: req.body.credentials
        }, {
            new: true
        });
        return res.status(200).json({ userResume });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

/* 
Route     /updateresume/:id
descrip   updating info from user resume with user id
params    user id
access    public
method    put
*/








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