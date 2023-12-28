const mongoose = require('mongoose');
const Role = require('../models/role');
const { Snowflake } = require('@theinternetfolks/snowflake');

exports.createRole = async (req, res) => {
    try{
        const {name} = req.body;
        if(!name){
            return res.status(400).json({
                success:false,
                message:'Please provide all required fields'
            })
        }

        const newRole = await Role.create({
            id: Snowflake.generate({timestamp: Date.now()}),
            name,
            createdAt: Date.now(),
            updatedAt: Date.now()
        });
        return res.status(200).json({
            status:true,
            data:newRole
        })
    }catch(err){
        return res.status(500).json({
            status:false,
            message:err.message,
        })
    }
}

exports.getAllRoles = async (req, res) => {
    try{
        const roles = await Role.find();
        return res.status(200).json({
            status:true,
            meta:{
                total:roles.length,
                pages: Math.ceil(roles.length / 10),
                page:1
            },
            data:roles
        })
    }catch(err){
        return res.status(500).json({
            status:false,
            message:err.message,
        })
    }
}

