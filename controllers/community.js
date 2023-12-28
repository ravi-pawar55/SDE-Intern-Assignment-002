const mongoose = require('mongoose');
const Community = require('../models/community');
const { Snowflake } = require('@theinternetfolks/snowflake');
const generateSlug = require('../helpers/slug');
const Member = require('../models/member');

exports.createCommunity = async (req, res) => {
    try{
        const {name} = req.body;
        if(!name){
            return res.status(400).json({
                success:false,
                message:'Please provide all required fields'
            })
        }
        const newCommunity = await Community.create({
            id: Snowflake.generate({timestamp:Date.now()}),
            name,
            slug:generateSlug(name),
            owner:req.user.id,
            createdAt: Date.now(),
        });
        return res.status(200).json({
            status:true,
            content:{
                data:newCommunity
            }
        })
    }catch(err){
        return res.status(500).json({
            status:false,
            message:err.message
        })
    }
}

exports.getAllCommunities = async (req, res) => {
    try{
        const communitys = await Community.find();
        return res.status(200).json({
            status:true,
            content:{
                meta:{
                    total:communitys.length,
                    pages:Math.ceil(communitys.length/10),
                    page:1
                },
                data:communitys
            }
        })
    }catch(err){
        return res.status(500).json({
            status:false,
            message:err.message,
        })
    }
}

exports.getAllMembers = async (req, res) => {
    try{
        const {id} = req.params;
        console.log(id);
        const community = await Community.find({id:id});
        const member = await Member.find({community:id});
        return res.status(200).json({
            status:true,
            content:{
                meta:{
                    total:member.length,
                    pages:Math.ceil(member.length/10),
                    page:1
                },
                data:{
                    community:community,
                    member:member
                }
            }
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}

exports.getOwnedCommunities = async (req, res) => {
    try{
        const communitys = await Community.find({owner:req.user.id});
        return res.status(200).json({
            status:true,
            content:{
                meta:{
                    total:communitys.length,
                    pages:Math.ceil(communitys.length/10),
                    page:1

                },
                data:communitys
                }
            }
        )
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}

exports.getJoinedCommunities = async (req, res) => {
    try{
        const communitys = await Community.find({members:req.user.id});
        return res.status(200).json({
            status:true,
            content:{
                meta:{
                    total:communitys.length,
                    pages:Math.ceil(communitys.length/10),
                    page:1
                },
                data:communitys
            }
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}
