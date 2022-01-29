const mongoose = require('mongoose');

// instantiate a mongoose schema
const dbSchema = new mongoose.Schema({
    url_ID: String,
    LongUrl: String,
    ShortUrl: String,
});

// create a model from schema and export it
module.exports = mongoose.model('Link', dbSchema);
