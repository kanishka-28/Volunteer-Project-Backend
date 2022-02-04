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
Route     /jobapply/:internId
descrip   posting job application
params    user id, intern id
access    public
method    post
*/

Router.post("/jobapply/:internId", async (req, res) => {
  try {
    const token = req.header('token');
    const data = jwt.verify(token, "sudhir$%%Agrawal");
    let intern = await InternModel.findById(req.params.internId)
    let ifAlreadyExists = false;
    intern.users.map((user)=>{
      if(user.id===data.User.id){
        ifAlreadyExists=true;
      }
    })
    if(ifAlreadyExists){
      return res.status(400).send("You have already applied for this.")
    }
    const credentials = {
      // users: [req.params.id]
      users: [{id: data.User.id,...req.body.credentials}]
    }
    intern = await InternModel.findOneAndUpdate({
      _id: req.params.internId
    }, {
      $push: credentials
    }, {
      new: true
    });

    return res.status(200).send("You have successfully applied for the opportunity");

  } catch (error) {
    return res.status(500).send("Some error occured while applying for the intern");
  }
});


module.exports = Router;