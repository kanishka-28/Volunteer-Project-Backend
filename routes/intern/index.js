const express = require('express');
const UserModel = require('../../database/models/user');
// const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
    return res.status(200).json({ intern: intern, company: company });

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
    console.log(interns);
    Promise.all(interns.usersApplied.map(async (user, i) => {
      const res = await UserModel.findById(user);
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

Router.put("/acceptapplicant/:internID", async (req, res) => {
  try {
    console.log(req.params.internID);
    let interns = await InternModel.findById(req.params.internID);
    const userAccepted = interns.usersApplied?.filter((user, i) => {
      return user === req.body.credentials
    });
    const userApplied = interns.usersApplied?.filter((user, i) => {
      return user !== req.body.credentials
    });
    interns = await InternModel.findByIdAndUpdate(
      req.params.internID,
      {
        $push: {
          usersAccepted: userAccepted
        },
        $set: {
          usersApplied: userApplied
        }
      }, {
      new: true
    });
    let user = await UserModel.findById(req.body.credentials)
    const internApplied = user.internsApplied.filter((data) => {
      return data.id !== req.body.credentials
    })
    user = await UserModel.findByIdAndUpdate(
      req.body.credentials,
      {
        $push: {
          offers: [req.params.internID]
        },
        $set: {
          internsApplied: internApplied
        }
      }, {
      new: true
    });

    return res.status(200).json({ interns, user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


Router.get("/userapplied/:id", async (req, res) => {
  try {

    const intern = await InternModel.findById(req.params.id);
    return res.status(200).json(intern.userApplied);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

Router.get("/useraccepted/:id", async (req, res) => {
  try {

    const intern = await InternModel.findById(req.params.id);
    return res.status(200).json(intern.userAccepted);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

Router.get("/useronboarded/:id", async (req, res) => {
  try {

    const intern = await InternModel.findById(req.params.id);
    return res.status(200).json(intern.userOnBoarded);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})



// /*
// Route     /postintern
// descrip   posting intern with company id
// params    none
// access    public
// method    post
// */

Router.post("/postintern", async (req, res) => {
  try {
    
    const token = req.header('token');
    const data = jwt.verify(token, "sudhir$%%Agrawal");
    const newIntern = await InternModel.create({companyId: data.Company.id,...req.body.credentials});
    return res.status(200).json({ newIntern });
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})


module.exports = Router;