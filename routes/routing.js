const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const Listings = require("../models/listing.js");
const isloggidingg = require("../middleware.js");
const {isOwner} = require("../middleware.js");
const {index, createNew, updateRoute, updateaddRoute, deleteRoute} = require("../controllers/listing.js");
const {newForm} = require("../controllers/listing.js")
const {Showroute} = require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage});

// Index route
router.get("/",wrapAsync(index));
// new form route
router.get("/new",isloggidingg,newForm);
// show route
router.get("/:id", wrapAsync(Showroute));
// create route 
router.post("/add",isloggidingg,upload.single("Listings[image]") ,wrapAsync(createNew));
// update route
router.get("/:id/update",isloggidingg, wrapAsync(updateRoute));

router.put("/:id/add",isloggidingg,isOwner,upload.single("Listings[newimage]") ,wrapAsync(updateaddRoute));
// delete route
router.delete("/:id/delete",isloggidingg, isOwner,wrapAsync(deleteRoute));

module.exports = router;