const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { ref } = require('joi');
const Listingschema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        url: String,
        filename: String
    },
    price: {
        type: Number
    },
    location: {
        type: String,
    },
    Country: {
        type: String
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "review",
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry:{
        type: {
          type: String,
          enum: ['Point'], 
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }

});
// creating middleware when listing is deleted thein review associate with this will also deleted
Listingschema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
})
const Listings = mongoose.model("Listings", Listingschema);
module.exports = Listings;