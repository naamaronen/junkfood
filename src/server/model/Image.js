const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const ImageSchema = new Schema({
    imageData: {
        type: String,
        required: true
    }
});

module.exports = Image = mongoose.model("Image", ImageSchema);
