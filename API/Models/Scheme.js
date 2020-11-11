const mongoose = require('mongoose');

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
        type: mongoose.Schema.Types.Mixed,
        required: true
    } 
},{_id: false});



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


module.exports = mongoose.model('Schemes', SchemeSchema);
