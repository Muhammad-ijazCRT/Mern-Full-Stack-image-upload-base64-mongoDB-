const mongoose = require('mongoose');

// schema define the structure of a document
var imgSchema = new mongoose.Schema({
    name: { type: String, default: "anonymous" },
    email: { type: String },
    phone: { type: String }

});


// interference between schema and database
var imgModel = mongoose.model('img', imgSchema);


module.exports = imgModel