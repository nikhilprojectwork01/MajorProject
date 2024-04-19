const User = require("../models/user.js");

module.exports.renderSignup = (req, res) => {
    res.render("signup.ejs")
}
module.exports.SignupFun = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeruser = await User.register(newUser, password);
        req.login(registeruser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "user register successfully");
            res.redirect("/Listings");
        })
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/user");
    }
}
module.exports.renderLogin = (req, res) => {
    res.render("login.ejs");
}


module.exports.LoginFun = async (req, res) => {
    req.flash("success", "welcome to Nikhil Infotech you are logidIn");
    let urlsredirect = res.locals.redirectUrl || "/Listings";
    res.redirect(urlsredirect);
}

module.exports.Logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err);
        }
        req.flash("success", "LogOut Successfully");
        res.redirect("/Listings");
    })
}