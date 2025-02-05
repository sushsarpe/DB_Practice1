import mongoose, { model } from 'mongoose';

const ImageSchema= mongoose.Schema({
    Image_Id : String,
    Image_No: Number,
    Image_Add: String,
    Couple_Name: String,
    Image_Set : String
});

module.exports=mongoose.model("Image",ImageSchema);