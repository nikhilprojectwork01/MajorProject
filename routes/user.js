const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveAndRedirect } = require("../middleware.js");
const {renderSignup, SignupFun, renderLogin, LoginFun, Logout} = require("../controllers/user.js")
router.get("/user", renderSignup)
router.post("/signup",SignupFun )
// authentication of the user which are alredy  sign in the database 
router.get("/login", renderLogin );
router.post("/login",saveAndRedirect, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),LoginFun );

router.get("/logout", Logout)

module.exports = router;