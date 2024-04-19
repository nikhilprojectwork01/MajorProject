const express = require("express");
// merger parasm done because the :id that are used to find the listing are not cone into the chiled route to protect form these we use merge paras 
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Listings = require("../models/listing.js");
const review = require("../models/review.js");
const ExpressError = require("../utils/expressError.js");
const islogidin = require("../middleware.js");
const {isDeleted} = require("../middleware.js");
const {createReview, distroyreview} = require("../controllers/review.js");
router.post("/",islogidin, wrapAsync(createReview));
router.delete("/:reviewid" ,islogidin,isDeleted, wrapAsync(distroyreview));
module.exports = router;