const mongoose = require('mongoose');
const {role} = require('../models/role');
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

        const newRole = await role.create({
            id: Snowflake.generate({timestamp: Date.now()}),
            name,
            createdAt: Date.now().toISOString(),
            updatedAt: Date.now().toISOString()
        });
        return res.status(200).json({
            success:true,
            message:'Role created successfully',
            data:newRole
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:'Role cannot created, please try again',
        })
    }
}

exports.getRoles = async (req, res) => {
    try{
        const roles = await role.find();
        return res.status(200).json({
            success:true,
            message:'Roles fetched successfully',
            meta:{
                total:roles.length,
                pages: total/10,
                page:1
            },
            data:roles
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:'Roles cannot fetched, please try again',
        })
    }
}

