const mongoose = require("mongoose");


const ratingSchema = new mongoose.Schema({
    userUuid: {
        type: String,
        required: true,
        unique: true,
      },
        rating: {
            type: Number,
            required: true,
        },
        totalCalls: {
            type: Number,
            required: true,
        },
        intrests : {
            type:  [String],
            required: true,
        },
})


