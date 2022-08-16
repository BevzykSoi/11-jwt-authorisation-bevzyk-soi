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
    }
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = model("user", userSchema);