const { User } = require("../models");

exports.getAll = async (req, res, next) => {
    try {
       const allUsers = await User.find();

       res.json(allUsers);
    } catch (error) {
       next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { age, description } = req.body;

        if (age > 150) {
            res.status(400).send("Age must be under 150!");
            return;
        }

        if (id !== req.user._id.toString()) {
            res.status(400).send("No access!");
            return;
        }

        const updatedUser = await User.findByIdAndUpdate(id, {
            age,
            description,
        }, { new: true, });

        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
}