const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
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
    scopes: {
        type: Array,
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

const Role = mongoose.model('Role', roleSchema);