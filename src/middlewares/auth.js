const passport = require("passport");

module.exports = (req, res, next) => {
    passport.authenticate("jwt", {
        session: false,
    }, (error, user) => {
        if (error || !user) {
            res.status(401).send("Unathorized!");
        }

        req.user = user;
        next();
    })(req, res, next);
}