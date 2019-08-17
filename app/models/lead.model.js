const mongoose = require('mongoose');

const LeadSchema = mongoose.Schema({
    name: String,
    email: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Lead', LeadSchema);