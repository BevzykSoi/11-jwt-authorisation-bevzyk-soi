const { Schema, model } = require("mongoose");

const userSchema = new Schema ({
    username: {
        type: String,
        minLength: 3,
        maxLength: 40,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 0,
        max: 150,
        required: true,
    },
    description: {
        type: String,
        maxLength: 255,
    }
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = model("user", userSchema);