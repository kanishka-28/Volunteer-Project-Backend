const express = require('express');
const UserModel = require('../../database/models/user');
// const passport = require('passport');

const Router=express.Router();

//models
// import {UserModel} from "../../database/user/index";


//validation

// import { ValidateSignup,ValidateSignin } from "../../validation/auth";


/* 
Route     /signup
descrip   signup with email and password
params    none
access    public
method    post

*/

Router.post("/signup",async(req,res)=>{
    try{
      // await ValidateSignup(req.body.credentials);
        const {email} = req.body.credentials;
        //check whether email already exists
        const ifAlreadyExists = await UserModel.findOne({email: email});
        if(ifAlreadyExists){
          return res.status(500).json({error: 'User with this email already exists'});
        }

        //DB
        const newUser=await UserModel.create(req.body.credentials)

        //JWT AUth Token
        // const token = newUser.generateJwtToken();

        return res.status(200).json({ status: newUser.status, details: newUser});

    } catch(error){
        return res.status(500).json({error: error.message});
    }
})

// /* 
// Route     /signin
// descrip   signin with userName and password
// params    none
// access    public
// method    post

// */

// Router.post("/signin",async(req,res)=>{
//     try{
//       const {userName, password} = req.body.credentials
//         await ValidateSignin(req.body.credentials);
//         // console.log(req.body.credentials);
//         const user = await UserModel.findByUserNameAndPassword({userName, password});
//         // console.log(req.body.credentials);
//         //JWT AUth Token
//         const token = user.generateJwtToken();

//         return res.status(200).json({token, status:"Success", user: user.status, details: user});

//     } catch(error){
//         return res.status(500).json({error: error.message});
//     }
// })

// Router.post("/googlesignin",async(req,res)=>{
//     try{
//       const {userName, password , email} = req.body.credentials

//         const user = await UserModel.findOne({email})
//         if(!user){

//           const newUser=await UserModel.create(req.body.credentials)
//           const token = newUser.generateJwtToken();
//           return res.status(200).json({token, status: newUser.status, details: newUser});
//         }
//         //JWT AUth Token
//         const token = user.generateJwtToken();

//         return res.status(200).json({token, status:"Success", user: user.status, details: user});

//     } catch(error){
//         return res.status(500).json({error: error.message});
//     }
// })
// /* 
// Route     /google
// descrip   Google signin/signup 
// params    none
// access    public
// method    GET
// */

// Router.get("/google",passport.authenticate("google",{
//   scope:[
//     "https://www.googleapis.com/auth/userinfo.profile",
//     "https://www.googleapis.com/auth/userinfo.email"
//   ],
// }));

// /* 
// Route     /google/callback
// descrip   Google signin/signup callback
// params    none
// access    public
// method    GET

// */

// Router.get("/google/callback",passport.authenticate("google",{
//   failureRedirect:"/"
// } ),(req,res)=>{
//   res.set('Access-Control-Allow-Origin', 'http://localhost:3000');  
//    res.json({token: req.session.passport.user.token});
// });

module.exports = Router;