const Listings = require("../models/listing.js");
const review = require("../models/review.js");

module.exports.createReview = async (req, res) => {
    let { id } = req.params;
    let { comment, rating } = req.body;
    let data = await Listings.findById(id);
    let rev1 = new review({
        comment: comment,
        rating: rating ,
        author:req.user._id
    });
    data.reviews.push(rev1);
    await rev1.save();
    await data.save();
    req.flash("success" , "New Review Created");
    res.redirect(`/Listings/${id}`)
}



module.exports.distroyreview = async(req,res)=>{
    let{id , reviewid} = req.params;
    // pull request are done to delete the id id from the listing when the review is deleted form the order collections 
    await Listings.findByIdAndUpdate(id , {$pull:{reviews:reviewid}});
   let data = await review.findByIdAndDelete(reviewid);
   req.flash("success" , "Review Deleted");
   res.redirect(`/Listings/${id}`);
}