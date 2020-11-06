const mongoose = require('mongoose');

const SchemeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    fields: {
        type: [FieldSchema],
        required: true
    },
});


const FieldSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    expectType: {
        type: String,
        required: true
    },
    component: {
        type: String,
        required: true
    },
    displayables: {
        type: Mixed,
        required: true
    } 
});


module.exports = mongoose.model('Schemes', SchemeSchema);
