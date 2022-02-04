const express = require('express');
// const passport = require('passport');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const CompanyModel = require('../../database/models/company');
const InternModel = require('../../database/models/interns');
const UserModel = require('../../database/models/user');
const Router = express.Router();
const jwt = require("jsonwebtoken")

/* 
Route     /getcompany/:id
descrip   getting company details with user id
params    none
access    public
method    get
*/

Router.get("/getcompany/:id", async (req, res) => {
  try {

    // console.log(req.params.id);
    const company = await CompanyModel.findById(req.params.id);
    if (!company) {
      return res.status(500).json({ error: 'Organization does not exists' });
    }
    return res.status(200).json(company);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

/* 
Route     /postjob/:companyId
descrip   posting job application
params    company id
access    public
method    post
*/

Router.post("/postjob", async (req, res) => {
  try { 
    const token = req.header('token');
    const data = jwt.verify(token, "sudhir$%%Agrawal");
    const intern = await InternModel.create({company: data.Company.id, ...req.body.credentials})
    return res.status(200).json({ intern });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* 
Route     /getjobs/:companyId
descrip   posting job application
params    company id
access    public
method    get
*/

Router.get("/getinterns", async (req, res) => {
  try { 
    const token = req.header('token');
    const data = jwt.verify(token, "sudhir$%%Agrawal");
    const intern = await InternModel.find({company: data.Company.id})
    if(!intern){
      return res.status(500).json({ error: 'org has not posted any opportunity' });
    }
    return res.status(200).json({ intern });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


module.exports = Router;