const jwt = require('jsonwebtoken');
require('dotenv').config();
const mongoose = require('mongoose');
const Community = require('../models/community');

exports.auth = async (req, res, next) => {
    try{
        //extract token
        const token = req.cookies.token 
                        || req.body.token 
                        || req.header("Authorization").replace("Bearer ", "");

        if(!token) {
            return res.status(401).json({
                success:false,
                message:'Token is missing',
            });
        }

        //verify the token
        try{
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
        }
        catch(err) {
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }
    catch(error) {  
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }
}

exports.isCommunityAdmin = async (req, res, next) => {
    try{
        const {communityId} = req.body.community;
        const {id} = req.user;
        const member = await member.findOne({community:communityId, user:id});
        if(member.role==='Community admin'){
            next();
        }else{
            return res.status(401).json({
                status:false,
                message:'NOT_ALLOWED_ACCESS',
            });
        }
    }catch(err){
        return res.status(500).json({
            status:false,
            message:err.message,
        })
    }
}

exports.isAllowed = async (req, res, next) => {
    try{
        const {id} = req.user;
        const member = await member.findOne({id:id});
        if(member.role==='Community admin'||member.role==='Community Moderatr'){
            next();
        }else{
            return res.status(401).json({
                status:false,
                message:'NOT_ALLOWED_ACCESS',
            });
        }

    }catch(err){
        return res.status(500).json({
            status:false,
            message:err.message,
        })
    }
}   