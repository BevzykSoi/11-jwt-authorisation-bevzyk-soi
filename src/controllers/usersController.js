const { User } = require("../models");

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { age, description } = req.body;

    if (id !== req.user._id.toString()) {
      res.status(400).send("No access");
      return;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        age,
        description,
      },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};
