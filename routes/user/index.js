const express = require('express');
const UserModel = require('../../database/models/user');
// const passport = require('passport');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const ResumeModel = require('../../database/models/userResume');
const InternModel = require('../../database/models/interns');
const Router = express.Router();


/* 
Route     /getuser/:id
descrip   getting user details with user id
params    none
access    public
method    post
*/

Router.get("/getuser/:id", async (req, res) => {
  try {

    const user = await UserModel.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(500).json({ error: 'User does not exists' });
    }

    return res.status(200).json({ details: user });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

/* 
Route     /jobapply/:id/:companyId
descrip   posting job application
params    user id, company id
access    public
method    post
*/

Router.post("/jobapply/:id/:companyId", async (req, res) => {
  try {
    const newJob = InternModel.create(req.body.credentials)
    return res.status(200).json({ details: newJob });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


module.exports = Router;