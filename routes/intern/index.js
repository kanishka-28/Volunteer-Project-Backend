const express = require('express');
const UserModel = require('../../database/models/user');
// const passport = require('passport');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const InternModel = require('../../database/models/interns');
const CompanyModel = require('../../database/models/company');
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

    return res.status(200).json(interns);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

/* 
Route     /get one intern
descrip   particular intern
params    id
access    public
method    get
*/

Router.get("/getintern/:id", async (req, res) => {
  try {

    const intern = await InternModel.findById(req.params.id);
    const company = await CompanyModel.findById(intern.company)
    return res.status(200).json({intern: intern, company: company});

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

// Router.get("/getapplicants/:internID", async (req, res) => {
//   try {
//     const interns = await InternModel.findById(req.params.internID);
//     const response = await interns.users.map( async(user, i)=>{
//       const res = await UserModel.findById(user.id); 
//       return res;
//     })
//     console.log(await response);
//     return res.status(200).json(response);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });
Router.get("/getapplicants/:internID", async (req, res) => {
  try {
    const interns = await InternModel.findById(req.params.internID);
    Promise.all(interns.users.map(async (user, i) => {
      const res = await UserModel.findById(user.id);
      return res;
    })).then((response) => {
      return res.status(200).json(response);
    })
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
    const newArray = interns.usersApplied.filter((user, i) => {
      return user !== req.body.credentials
    });
    const credentials = {
      usersApplied: newArray
    }
    interns = await InternModel.findByIdAndUpdate(
      req.params.internID,
      {
        $set: credentials
      }, {
      new: true
    });
    return res.status(200).json(interns);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* 
Route     /acceptapplicant
descrip   accept an applicant for the intern
params    intern id
access    public
method    post
*/

Router.post("/acceptapplicant/:internID", async (req, res) => {
  try {
    let interns = await InternModel.findById(req.params.internID);
    const newArray = interns.usersApplied?.filter((user, i) => {
      return user === req.body.credentials
    });
    interns = await InternModel.findByIdAndUpdate(
      req.params.internID,
      {
        $push: {
          usersAccepted: newArray
        }
      }, {
      new: true
    });
    const user = await UserModel.findByIdAndUpdate(
      req.body.credentials,
      {
        $push: {
          currentProjects: [req.params.internID]
        }
      }, {
      new: true
    });

    return res.status(200).json({interns, user});
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