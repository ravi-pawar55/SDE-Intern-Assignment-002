const mongoose = require('mongoose');
 
const memberSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    community:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    role:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});