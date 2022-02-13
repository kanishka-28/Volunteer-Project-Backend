const express = require('express');
const UserModel = require('../../database/models/user');
// const passport = require('passport');
const bcrypt = require('bcryptjs');
const ResumeModel = require('../../database/models/userResume');
const InternModel = require('../../database/models/interns');
const Router = express.Router();
const jwt = require("jsonwebtoken");

/* 
Route     /getuser
descrip   getting user details with user id
params    none
access    public
method    get
*/

Router.get("/getuser", async (req, res) => {
  try {
    const token = req.header('token');
    const data = jwt.verify(token, "sudhir$%%Agrawal");
    const user = await UserModel.findById(data.User.id);
    if (!user) {
      return res.status(500).json({ error: 'User does not exists' });
    }

    return res.status(200).json( user );

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

/* 
Route     /edituser
descrip   editing user details with user id
params    none
access    public
method    put
*/

Router.put("/edituser", async (req, res) => {
  try {
    const token = req.header('token');
    const data = jwt.verify(token, "sudhir$%%Agrawal");
    let user = await UserModel.findById(data.User.id);
    if (!user) {
      return res.status(500).json({ error: 'User does not exists' });
    }
    user = await UserModel.findByIdAndUpdate(data.User.id, {
      $set: req.body.credentials
    })
    return res.status(200).json( user );

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

/* 
Route     /jobapply/:internId
descrip   applying for job
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
    intern.usersApplied?.map((user)=>{
      if(user===data.User.id){
        ifAlreadyExists=true;
      }
    })
    if(ifAlreadyExists){
      return res.status(400).send("You have already applied for this.")
    }
    //finding resume id
    let resume = await ResumeModel.find({user: data.User.id});
    resume = resume.filter((data)=>{
      return data.resumeTitle==req.body.credentials.resume
    })

    // //pushing intern in intern model
    intern = await InternModel.findOneAndUpdate({
      _id: req.params.internId
    }, {
      $push: {usersApplied: [data.User.id]}
    }, {
      new: true
    });

    const user = await UserModel.findOneAndUpdate({
      _id: data.User.id
    }, {
      // $push: {internsApplied: [req.params.internId]} 
      $push: {internsApplied: [{ 
        id: req.params.internId, 
        date: new Date(),
        resume: resume[0]._id.toString(),
        question: req.body.credentials.question
      }]} 
    }, {
      new: true
    });
    return res.status(200).send("You have successfully applied for the opportunity");

  } catch (error) {
    return res.status(500).json({error: error.message} || "Some error occured while applying for the intern");
  }
});

/* 
Route     /getmyjobs/:userId
descrip   getting my jobs
params    user id
access    public
method    get
*/

Router.get("/getappliedjobs", async (req, res) => {
  try {
    const token = req.header('token');
    const data = jwt.verify(token, "sudhir$%%Agrawal");
    const user = await UserModel.findById(data.User.id);
    const interns=user.internsApplied
    Promise.all(interns.map(async (intern) => {
      const res = await InternModel.findById(intern.id);
      return res;
    })).then((response) => {
      return res.status(200).json({response,user});
    })    
  } catch (error) {
    return res.status(500).send("Some error occured while fetching your interns");
  }
});

/* 
Route     /getprojects/:userId
descrip   getting my jobs
params    user id
access    public
method    get
*/

Router.get("/getprojects", async (req, res) => {
  try {
    const token = req.header('token');
    const data = jwt.verify(token, "sudhir$%%Agrawal");
    const user = await UserModel.findById(data.User.id);
    const projects=user.currentProjects

    Promise.all(projects.map(async (project) => {
      const res = await InternModel.findById(project);
      return res;
    })).then((response) => {
      return res.status(200).json(response);
    })    
  } catch (error) {
    return res.status(500).send(error || "Some error occured while fetching your projects");
  }
});


module.exports = Router;