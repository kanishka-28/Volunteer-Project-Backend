const express = require('express');
const UserModel = require('../../database/models/user');
// const passport = require('passport');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const InternModel = require('../../database/models/interns');
const Router = express.Router();

const JWT_SECRET = 'sudhir$%%Agrawal'

/* 
Route     /allinterns
descrip   get all interns
params    none
access    public
method    get
*/

Router.get("/allinterns", async (req, res) => {
  try {

    const interns = await InternModel.find({});
    return res.status(200).json({ interns });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

/* 
Route     /searchinterns
descrip   get all interns
params    none
access    public
method    get
*/

Router.get("/searchinterns", async (req, res) => {
  try {

    const interns = await InternModel.find({});
    return res.status(200).json({ interns });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})


/* 
Route     /getapplicants
descrip   get all applicants for an intern
params    intern id
access    public
method    get
*/

Router.get("/getapplicants/:internID", async (req, res) => {
  try {
    const interns = await InternModel.find({_id: req.params.internID});
    return res.status(200).json( interns[0].users );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* 
Route     /rejectapplicant
descrip   reject an applicant for the intern
params    intern id
access    public
method    post
*/

Router.put("/rejectapplicant/:internID", async (req, res) => {
  try {
    let interns = await InternModel.findById(req.params.internID);
    const newArray = interns.users.filter((user, i)=>{
      return user!==req.body.credentials
    });
    const credentials = {
      users: newArray
    }
    interns = await InternModel.findByIdAndUpdate(
      req.params.internID,
     {
      $set: credentials
    },{
      new: true
    });
    return res.status(200).json( interns );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


module.exports = Router;


// /* 
// Route     /postintern
// descrip   posting intern with company id
// params    none
// access    public
// method    post
// */

// Router.post("/postintern/:id", async (req, res) => {
//   try {

//     const company = await InternModel.findOne({ company: req.params.id });

//     if (!company) {
//       const newIntern = await InternModel.create(req.body.credentials);
//       return res.status(200).json({ newIntern });
//     }

//     // put request for editing 
//     const intern = await InternModel.findOneAndUpdate({
//       company: req.params.id
//     }, {
//       $push: req.body.credentials
//     }, {
//       new: true
//     });
//     return res.status(200).json({ intern });

//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// })