const mongoose = require("mongoose");
const Image = require("../models/Image");

let con = null;

exports.handler = async (e) => {
  if (e.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method No Allowed" };
  }

  const data = JSON.parse(e.body);

  if (!data.path) {
    return { statusCode: 400, body: "Image path is required" };
  }

  try {
    if (!con) {
      con = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
      });
    }
    const newImage = new Image({
      Image_Id: data.ImageId,
      Image_No: data.ImageNo,
      Image_Path: data.path,
      Couple_Name: data.name,
      Image_Set: data.set,
    });

    await newImage.save();

    return {
      statusCode: 201,
      body: JSON.stringlyfy({ message: "Images added." }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Database error" }),
    };
  }
};
