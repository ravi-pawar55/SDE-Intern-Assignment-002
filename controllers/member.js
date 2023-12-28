const mongoose = require('mongoose');
const Member = require('../models/member');
const {Snowflake} = require('@theinternetfolks/snowflake');
exports.addMember = async (req, res) => {
    try{
        const {community,user,role} = req.body;
        if(!community || !user || !role){
            return res.status(400).json({
                success:false,
                message:'Please provide all required fields'
            })
        }
        const newMember = await Member.create({
            id: Snowflake.generate({timestamp:Date.now()}),
            community,
            user,
            role,
            createdAt: Date.now(),
        });
        return res.status(200).json({
            status:true,
            content:{
                data:newMember
            }
        })
    }catch(err){
        return res.status(500).json({
            status:false,
            message:err.message,
        })
    }
}

exports.removeMember = async (req, res) => {
    try{
        const id = req.params.id;
        if(!id){
            return res.status(400).json({
                success:false,
                message:'Please provide all required fields'
            })
        }
        const deletedMember = await Member.deleteOne({id});
        return res.status(200).json({
            status:true,
        })
    }catch(err){
        return res.status(500).json({
            status:false,
            message:err.message,
        })
    }
}
