const mongoose = require('mongoose');
const User = require('../models/user');
const { Snowflake } = require("@theinternetfolks/snowflake");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.signup = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                status:false,
                message:'User already exists'
            })
        }
        console.log(user);
        const id = Snowflake.generate({timestamp: Date.now()});
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            id,
            name,
            email,
            password:hashedPassword,
            createdAt: Date.now(),
        });
        newUser.password = undefined;
        return res.status(200).json({
            status :true,
            data:newUser
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:'User cannot created, please try again',
        })
    }
}

exports.signin = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user =  await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:'User does not exists'
            })
        }
        if(await bcrypt.compare(password,user.password)){
            const token = jwt.sign(
                { email: user.email, id: user.id },
                process.env.JWT_SECRET,
                {
                  expiresIn: "24h",
                }
            )
            user.token = token
      user.password = undefined;
      // Set cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      }
      res.cookie("token", token, options).status(200).json({
        success: true,
        data:user,
        meta:token,
      })
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      })
    }
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.getMe = async (req, res) => {
    try{
        const user = await User.findOne({id:req.user.id});
        user.password = undefined
        return res.status(200).json({
            status:true,
            data:user
        })
    }catch(err){
        return res.status(500).json({
            status:false,
            message:err.message
        })
    }
}