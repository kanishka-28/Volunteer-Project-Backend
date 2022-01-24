const express = require('express');
const UserModel = require('../../database/models/user');
// const passport = require('passport');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const ResumeModel = require('../../database/models/userResume');
const Router = express.Router();


const JWT_SECRET = 'sudhir$%%Agrawal'

/* 
Route     /getuser/:id
descrip   getting user details with user id
params    none
access    public
method    post
*/

Router.get("/getuser/:id", async (req, res) => {
  try {

    const user = await UserModel.findOne({ id: req.params.id });
    if (!user) {
      return res.status(500).json({ error: 'User does not exists' });
    }

    return res.status(200).json({ details: user });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

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
      const userResume = ResumeModel.create(req.body.credentials);
      return res.status(200).json({resume: userResume});
    }

    return res.status(200).json({ details: user });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})


module.exports = Router;