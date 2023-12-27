const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true,
        unique: true
    },
    slug:{
        type: String,
        required: true,
        unique: true
    },
    owner:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
});

const Community = mongoose.model('Community', communitySchema);