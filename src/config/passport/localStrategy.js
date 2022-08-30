const { Strategy } = require("passport-local");

const { User } = require("../../models");

module.exports = new Strategy({
    usernameField: "usernmae",
}, async (username, password, done) => {
    try {
        const user = User.findOne({
            username,
        });

        if (!user || !(await user.validatePassword(password))) {
            done(null, false);
            return;
        }

        done(null, user);
    } catch (error) {
        done(error);
    }
});