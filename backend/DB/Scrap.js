const mongoose = require('mongoose');

const scrapSchema = new mongoose.Schema({
    userEmail: String,
    scrapType: String,
    description: String,
    price: Number,
    image: String  // Path to the uploaded image file
});

module.exports = mongoose.model('Scrap', scrapSchema);
