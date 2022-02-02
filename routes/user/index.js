const express = require('express');
const UserModel = require('../../database/models/user');
// const passport = require('passport');
const bcrypt = require('bcryptjs');
const ResumeModel = require('../../database/models/userResume');
const InternModel = require('../../database/models/interns');
const Router = express.Router();
const jwt = require("jsonwebtoken");

/* 
Route     /getuser/:id
descrip   getting user details with user id
params    none
access    public
method    get
*/

Router.get("/getuser/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(500).json({ error: 'User does not exists' });
    }

    return res.status(200).json( user );

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

/* 
Route     /jobapply/:id/:internId
descrip   posting job application
params    user id, intern id
access    public
method    post
*/

Router.post("/jobapply/:internId", async (req, res) => {
  try {
    const token = req.header('token');
    const data = await jwt.verify(token, "sudhir$%%Agrawal");
    const credentials = {
      // users: [req.params.id]
      users: [{id: data.User.id,...req.body.credentials}]
    }
    const intern = await InternModel.findOneAndUpdate({
      _id: req.params.internId
    }, {
      $push: credentials
    }, {
      new: true
    });

    return res.status(200).json({ intern });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


module.exports = Router;