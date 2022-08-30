const passport = require("passport");

const jwtStrategy = require("./jwtStrategy");
const localStrategy = require("./localStrategy");
const { User } = require("../../models");

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
    try {
        const user = await User.findById(userId);

        done(null, user);
    } catch (error) {
        done(error);
    }
});

// passport.use(jwtStrategy);
passport.use(localStrategy);