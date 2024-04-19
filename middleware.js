
const Listings = require("./models/listing.js");
const review = require("./models/review.js");

module.exports = islogidin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // redidirect url
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "Pls login before adding hotel");
        return res.redirect("/login");
    }
    next();
}


module.exports.saveAndRedirect = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}


module.exports.isOwner = async(req, res, next) => {
    let { id } = req.params;
    let listing = await Listings.findById(id);
    if (!listing.owner._id.equals(res.locals.curruser._id)) {
        req.flash("error", "You cannot edit");
        return res.redirect("/Listings")
    }
    next();
}


module.exports.isDeleted = async(req,res , next)=>{
    let {id,reviewid} = req.params;
    let Review = await review.findById(reviewid);
    if (!Review.author.equals(res.locals.curruser._id)) {
        req.flash("error", "You cannot Delete it");
        return res.redirect(`/Listings/${id}`)
    }
    next();
}