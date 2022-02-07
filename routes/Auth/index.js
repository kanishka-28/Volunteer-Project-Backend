const express = require('express');
const UserModel = require('../../database/models/user');
// const passport = require('passport');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const CompanyModel = require('../../database/models/company');
const Router = express.Router();


const JWT_SECRET = 'sudhir$%%Agrawal'

/* 
Route     /signup
descrip   signup
params    none
access    public
method    post
*/

Router.post("/signup", async (req, res) => {
  try {
    // await ValidateSignup(req.body.credentials);
    const { name, email, password, status, address, city, title } = req.body.credentials;
    let ifAlreadyExists=null;

    if(status===null){
      return res.status(401).json({error: 'status not provided'})
    }
    if(status==='user'){
      //check whether email already exists
      ifAlreadyExists = await UserModel.findOne({ email: email });
    }
    else if(status==='company'){
      //check whether email already exists
      ifAlreadyExists = await CompanyModel.findOne({ email: email });
    }

    if (ifAlreadyExists) {
      return res.status(500).json({ error: `${status} with this email already exists`});
    }

    //generating salt
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    if(status==='user'){
      //creating new user 
      const user = await UserModel.create({
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

    }
    else if(status==='company'){
      const company = await CompanyModel.create({
        name: name,
        title: title,
        email: email,
        password: secPass,
        status: status,
        address: address,
        city: city
      });

    // creating user data token 
    const data = {
      Company: {
        id: company.id
      }
    }

    //JWT AUth Token
    const token = JWT.sign(data, JWT_SECRET, { expiresIn: "2d" });

    return res.status(200).json({ token: token, status: status, details: company });

    }
      
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

/* 
Route     /signin
descrip   signin with email and password
params    none
access    public
method    post
*/

Router.post("/signin", async (req, res) => {
  try {
      const { email, password, status, aMonth } = req.body.credentials
      let user=[];
      if(status==='user'){
        user = await UserModel.findOne({ email });      
      }
      else if(status==='company'){
        user = await CompanyModel.findOne({ email });      
      }
      
      if (!user) {
        return res.status(400).json({ error: "Enter correct credentials" })
      }

      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return res.status(400).json({ error: "Password is incorrect" })
      }
      let data={};
      if(status==='user'){    
        // sending data 
        data = {
          User: {
            id: user.id,
          }
        }     
      }
      else if(status==='company'){       
        // sending data 
        data = {
          Company: {
            id: user.id,
          }
        }     
      }
      if(aMonth){
        const token = JWT.sign(data, JWT_SECRET, { expiresIn: "30d" });
        return res.status(200).json({ token: token, status: status, details: user });
      }else{
        const token = JWT.sign(data, JWT_SECRET, { expiresIn: "2d" });
        return res.status(200).json({ token: token, status: status, details: user });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
})

/* 
Route     /googlesignin
descrip   signin with google
params    none
access    public
method    post
*/

Router.post("/googlesignin", async (req, res) => {
  try {
      const {name, email, password, status } = req.body.credentials

      const user = await UserModel.findOne({ email });
      
      if (!user) {
            //creating new user 
        const user = await UserModel.create({
          name: name,
          email: email,
          password: secPass,
        });

        // creating user data token 
        const data = {
          User: {
            id: user.id
          }
        }

        //generating salt
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);

        //JWT AUth Token
        const token = JWT.sign(data, JWT_SECRET, { expiresIn: "2d" });

        return res.status(200).json({ token: token, status: status, details: user });
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


/* 
Route     /forgotpass
descrip   forgotpass
params    none
access    public
method    put
*/

Router.put("/forgotpass", async (req, res) => {
  try {
    // await ValidateSignup(req.body.credentials);
    const { email, password, status } = req.body.credentials;
    let ifAlreadyExists=null;

    if(status===null){
      return res.status(401).json({error: 'status not provided'})
    }
    if(status==='user'){
      //check whether email already exists
      ifAlreadyExists = await UserModel.findOne({email});
      if (!ifAlreadyExists) {
        return res.status(500).json({ error: `${status} with this email does not exists`});
      }

      //generating salt
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(password, salt);
      const user = await UserModel.findOneAndUpdate({email},{
        $set: {password: secPass}
      })
      return res.status(200).json(user);
    }
    else if(status==='company'){
      //check whether email already exists
      ifAlreadyExists = await CompanyModel.findOne({email});
      if (!ifAlreadyExists) {
        return res.status(500).json({ error: `${status} with this email does not exists`});
      }
      
      //generating salt
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(password, salt);

      const company = await CompanyModel.findOneAndUpdate({email},{
        $set: {password: secPass}
      })
      return res.status(200).json(company);
    }

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})


module.exports = Router;