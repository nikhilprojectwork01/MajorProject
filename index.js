if(process.env.NODE_ENV != "production"){
    require('dotenv').config(); 
}   

const express = require("express");
let app = express();
let port = 8080;

// authentication
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");



const path = require("path");
const mongoose = require('mongoose');
const Listings = require("./models/listing.js");
const review = require("./models/review.js");
const reviews = require("./routes/review.js");
// const mongo_url = "mongodb://127.0.0.1:27017/airbnb";
const dburl = process.env.ATLASDB_URL;
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/expressError.js");
// requiring ejs for common templliting
const ejsMate = require("ejs-mate");
// seeting the template fro ejs mate
app.engine("ejs", ejsMate);
// setting plugins 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
const routing = require("./routes/routing.js");
const router = require("./routes/review.js");
const userroute = require("./routes/user.js");
// requiring express session 
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const store = MongoStore.create({ 
    mongoUrl: dburl,
    crypto:{
        secret:process.env.SECRET, 
    },
    touchAfter:24*36000 //this are a session related information
 })

 store.on("error" , ()=>{
    console.log("Error in session Store" , err);
 })
const sessionOption = {
    store, 
    secret:process.env.SECRET,
    resave:false ,
    saveUninitialized:true,
    // login info are save in the form of cookies on the browser
    cookie:{
        expires:Date.now() + 7 * 24 * 60 * 60 *1000 ,
        maxAge: 7 * 24 * 60 * 60 *1000 ,
        httpOnly:true
    } 
}

// flash are always use before the routes 


main().then(res => {
    console.log("connection establish with Database of airbnb");
}).catch(err => console.log(err));
async function main() {
    await mongoose.connect(dburl);
}
app.listen(port, (req, res) => {
    console.log("Connection Establish with the server");
});
app.get("/", (req, res) => {
    res.redirect("/Listings")
})
app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res , next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.curruser = req.user;
    next();
})
app.use("/Listings" , routing);
app.use("/Listings/:id/review" , reviews);
app.use("/" , userroute)
// middleware these are iddleware 
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "page Not Found"));
})
app.use((err, req, res, next) => {
    let { status = 500, message = "page not Found" } = err;
    // res.status(status).send(message);
    res.status(status).render("error.ejs", { message });
})