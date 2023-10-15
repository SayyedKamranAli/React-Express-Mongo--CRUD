const mongoose = require("mongoose") ;


const CRUDSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const crud = mongoose.model('crud', CRUDSchema);

module.exports = crud;