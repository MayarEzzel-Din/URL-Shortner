const mongoose = require('mongoose');

main().then(console.log('connected')).catch(err => console.log(err));
async function main() {
  await mongoose.connect("mongodb+srv://admin:admin@cluster0.pqf8w.mongodb.net/urlShortner?retryWrites=true&w=majority");
}
// instantiate a mongoose schema
const dbSchema = new mongoose.Schema({
    url_ID: String,
    LongUrl: String,
    ShortUrl: String,
});

// create a model from schema and export it
module.exports = mongoose.model('Link', dbSchema);