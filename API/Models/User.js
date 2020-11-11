const mongoose = require('mongoose');

const AccessibleSchemeSchema = mongoose.Schema({
    schemeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schemes',
        required: true
    }
});

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    accessibleSchemes: {
        type: [AccessibleSchemeSchema],
        required: false
    }
});

module.exports = mongoose.model('Users', UserSchema); 
