const mongoose = require('mongoose');
const Listings = require("../models/listing.js");
const initdata = require("./data.js");
const mongo_url = "mongodb://127.0.0.1:27017/airbnb";
main().then(res => {
    console.log("connection establish with Database of airbnb");
}).catch(err => console.log(err));
async function main() {
    await mongoose.connect(mongo_url);
}

const initdb = async()=>{
    await Listings.deleteMany({});
    initdata.data = initdata.data.map((obj)=>({...obj , owner:"661c21231143e49dd416ca75"}));
    // this map function is used to add the new field name owner to the database using the map function
    await Listings.insertMany(initdata.data);
    console.log("data was saved successsfully")
}
initdb();