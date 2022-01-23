const express = require('express');
const UserModel = require('../../database/models/user');
// const passport = require('passport');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const Router = express.Router();


const JWT_SECRET = 'sudhir$%%Agrawal'

/* 
Route     /getuser/:id
descrip   signup with email and password
params    none
access    public
method    post
*/

Router.post("/getuser/:id", async (req, res) => {
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
Route     /signin
descrip   signin with userName and password
params    none
access    public
method    post
*/

Router.post("/signin", async (req, res) => {
  try {
      const { email, password } = req.body.credentials

      const user = await UserModel.findOne({ email });
      
      if (!user) {
        return res.status(400).json({ error: "enter correct credentials" })
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