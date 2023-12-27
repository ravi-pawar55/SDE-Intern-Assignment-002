const mongoose = require('mongoose');
const {member} = require('../models/member');

exports.createMember = async (req, res) => {
    try{
        const {community,user,role} = req.body;
        if(!community || !user || !role){
            return res.status(400).json({
                success:false,
                message:'Please provide all required fields'
            })
        }
        const newMember = await member.create({
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
            success:false,
            message:'Member cannot created, please try again',
        })
    }
}

exports.deleteMember = async (req, res) => {
    try{
        const id = req.params.id;
        if(!id){
            return res.status(400).json({
                success:false,
                message:'Please provide all required fields'
            })
        }
        const deletedMember = await member.deleteOne({id});
        return res.status(200).json({
            status:true,
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:'Member cannot deleted, please try again',
        })
    }
}
