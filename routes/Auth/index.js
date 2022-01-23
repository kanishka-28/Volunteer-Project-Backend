const express = require('express');
const UserModel = require('../../database/models/user');
// const passport = require('passport');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const Router = express.Router();


const JWT_SECRET = 'sudhir$%%Agrawal'

/* 
Route     /signup
descrip   signup with email and password
params    none
access    public
method    post
*/

Router.post("/signup", async (req, res) => {
  try {
    // await ValidateSignup(req.body.credentials);
    const { name, email, password, status, address, city } = req.body.credentials;

    //check whether email already exists
    const ifAlreadyExists = await UserModel.findOne({ email: email });
    if (ifAlreadyExists) {
      return res.status(500).json({ error: 'User with this email already exists' });
    }

    //generating salt
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    //creating new user 
    user = await UserModel.create({
      name: name,
      email: email,
      password: secPass,
      status: status,
      address: address,
      city: city
    });

    // creating user data token 
    const data = {
      User: {
        id: user.id
      }
    }

    //JWT AUth Token
    const token = JWT.sign(data, JWT_SECRET, { expiresIn: "2d" });

    return res.status(200).json({ token: token, status: status, details: user });

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