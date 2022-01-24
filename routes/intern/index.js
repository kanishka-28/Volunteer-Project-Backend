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
Route     /postintern
descrip   signin with google
params    none
access    public
method    post
*/

Router.post("/postintern/:id", async (req, res) => {
  try {
    
      const company = await InternModel.findOne({ company: req.params.id });
      
      if (!company) {
        const newIntern = await InternModel.create(req.body.credentials);

        return res.status(200).json({ newIntern });
      }

      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return res.status(400).json({ error: "enter correct credentials" })
      }

      // sending data 
      const data = {
        User: {
          id: user.id,
        }
      }

      const token = JWT.sign(data, JWT_SECRET, { expiresIn: "2d" });

      return res.status(200).json({ token: token, status: user.status, details: user });

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
})

module.exports = Router;