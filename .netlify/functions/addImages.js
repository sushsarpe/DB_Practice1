const mongoose = require("mongoose");
const Image = require("./models/Image"); // Adjust path as needed

const DB_URI = process.env.MONGO_URI; // Ensure .env is configured

// Connect to MongoDB
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

exports.handler = async (event, context) => {
    // ✅ Handle CORS Preflight (OPTIONS Request)
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 204,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
            body: "",
        };
    }

    // ✅ Handle Image Upload (POST Request)
    if (event.httpMethod === "POST") {
        try {
            const data = JSON.parse(event.body); // Get request data

            const newImage = new Image({
              Image_Id: data.ImageId,
              Image_No: data.ImageNo,
              Image_Path: data.path,
              Couple_Name: data.name,
              Image_Set: data.set,
            });

            await newImage.save(); // Save to MongoDB

            return {
                statusCode: 201,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Allow frontend requests
                },
                body: JSON.stringify({ message: "Image added successfully!" }),
            };
        } catch (error) {
            return {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({ error: error.message }),
            };
        }
    }

    // ❌ If method is not POST, return error
    return {
        statusCode: 405,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ error: "Method Not Allowed" }),
    };
};
