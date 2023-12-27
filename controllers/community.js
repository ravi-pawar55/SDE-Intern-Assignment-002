const mongoose = require('mongoose');
const {community} = require('../models/community');
const { Snowflake } = require('@theinternetfolks/snowflake');

exports.createCommunity = async (req, res) => {
    try{
        const {name} = req.body;
        if(!name){
            return res.status(400).json({
                success:false,
                message:'Please provide all required fields'
            })
        }
        const newCommunity = await community.create({
            id: Snowflake.generate({timestamp:Date.now()}),
            name,
            slug:'',
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
            success:false,
            message:'Community cannot created, please try again',
        })
    }
}

exports.getCommunitys = async (req, res) => {
    try{
        const communitys = await community.find();
        return res.status(200).json({
            status:true,
            content:{
                meta:{
                    total:communitys.length,
                    pages:1,
                    page:1
                },
                data:communitys
            }
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:'Communitys cannot fetched, please try again',
        })
    }
}

exports.getAllMembers = async (req, res) => {
    try{
        const {communityId} = req.params;
        const communitys = await community.findOne({id:communityId}).populate('members');
        return res.status(200).json({
            status:true,
            content:{
                meta:{
                    total:communitys.length,
                    pages:1,
                    page:1
                },
                data:communitys
            }
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:'Communitys cannot fetched, please try again',
        })
    }
}

exports.getMyOwnedCommunity = async (req, res) => {
    try{
        const communitys = await community.find({owner:req.user.id});
        return res.status(200).json({
            status:true,
            content:{
                meta:{
                    total:communitys.length,
                    pages:1,
                    page:1

                },
                data:communitys
                }
            }
        )
    }catch(err){
        return res.status(500).json({
            success:false,
            message:'Communitys cannot fetched, please try again',
        })
    }
}

exports.getMyJoinedCommunity = async (req, res) => {
    try{
        const communitys = await community.find({members:req.user.id});
        return res.status(200).json({
            status:true,
            content:{
                meta:{
                    total:communitys.length,
                    pages:1,
                    page:1
                },
                data:communitys
            }
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:'Communitys cannot fetched, please try again',
        })
    }
}
