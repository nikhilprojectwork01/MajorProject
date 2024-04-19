const Listings = require("../models/listing.js");
// requirement for the geocoding map box
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapTopken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapTopken });

module.exports.index = async (req, res) => {
    let data = await Listings.find();
    res.render("index.ejs", { data });
}

module.exports.newForm = (req, res) => {
    res.render("form.ejs");
}
module.exports.Showroute = async (req, res) => {
    let { id } = req.params;
    let data = await Listings.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if (!data) {
        req.flash("error", "Sorry! item Does not exist");
        res.redirect("/Listings");
    }
    res.render("show.ejs", { data });
}
module.exports.createNew = async (req, res, next) => {
    // for geocoding

   let responce = await geocodingClient.forwardGeocode({
        query: req.body.newlocation,
        limit: 1
    }).send();
    let imgurl = req.file.path;
    let newfilename = req.file.filename;
    let { newtitle, newdescription, newprice, newlocation, newcountry } = req.body;
    let user1 = new Listings({
        title: newtitle,
        description: newdescription,
        image: {
            url: imgurl,
            filename: newfilename
        },
        price: newprice,
        location: newlocation,
        geometry:responce.body.features[0].geometry,
        Country: newcountry,
        owner: req.user.id
        // here this are passed to know the listing who is h is
    });
    await user1.save();
    req.flash("success", "New item Added Successfully");
    res.redirect("/Listings");
}
module.exports.updateRoute = async (req, res) => {
    let { id } = req.params;
    let data = await Listings.findById(id);
    if (!data) {
        req.flash("error", "Sorry! item Does not exist");
        res.redirect("/Listings")
    }
    let orginal = data.image.url;
    orginal = orginal.replace("/upload", "/upload/h_300,w_250");
    // this is done to reduce the pixel size image of the original url to resuce the time consumption
    res.render("editfrom.ejs", { data, orginal });
}

module.exports.updateaddRoute = async (req, res) => {
    let { id } = req.params;
    let { newtitle, newdescription, newprice, newlocation, newcountry } = req.body;
    let listing = await Listings.findByIdAndUpdate(id, {
        title: newtitle,
        description: newdescription,
        price: newprice,
        location: newlocation,
        Country: newcountry
    });
    if (req.file !== "undefined") {
        let imgurl = req.file.path;
        let newfilename = req.file.filename;
        listing.image = {
            url: imgurl,
            filename: newfilename
        }
        await listing.save();
    }

    req.flash("success", "Item Updated");
    res.redirect("/Listings");
}

module.exports.deleteRoute = async (req, res) => {
    let { id } = req.params;
    let data = await Listings.findByIdAndDelete(id);
    req.flash("success", "Item Deleted Successfully");
    res.redirect("/Listings");
} 