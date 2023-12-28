const mongoose = require('mongoose');
const {user} = require('../models/user');
const { Snowflake } = require("@theinternetfolks/snowflake");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const Validate = require('validatorjs');

exports.signup = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        const user = user.findOne({email});
        if(user){
            return res.status(400).json({
                status:false,
                message:'User already exists'
            })
        }
        const id = Snowflake.generate({timestamp: Date.now()});
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await user.create({
            id,
            name,
            email,
            password:hashedPassword,
            createdAt: Date.now(),
        });
        delete newUser.password;
        return res.status(200).json({
            success:true,
            message:'User created successfully',
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
        const user = user.findOne({email});
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
      delete user.password
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
            message:'User cannot logged in, please try again',
        })
    }
}

exports.getMe = async (req, res) => {
    try{
        const user = await user.findById(req.user.id);
        delete user.password;
        return res.status(200).json({
            success:true,
            message:'User details fetched successfully',
            data:user
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:'User details cannot fetched, please try again',
        })
    }
}