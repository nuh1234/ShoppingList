const mongo = require('mongoose');
schema = new mongo.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

// Adding model to mongoose
mongo.model('User', schema);