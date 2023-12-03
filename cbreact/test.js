
//------------modules used-------------//

const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cookieparser = require("cookie-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const cors = require('cors');
const fs = require('fs');
const { ObjectId } = require("mongodb");
//------------modules used-------------//

const app = express();
app.use(cors());
app.use(helmet());
// allow the app to use cookieparser
app.use(cookieparser());
// allow the express server to process POST request rendered by the ejs files 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//-------------------mongodb-----------------//
const uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.2";

async function tryMongooseConnection() {
  return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true});
}

mongoose.connection.on('connected', () => {
    console.log("connected");
})


const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    pass: { type: String, required: true },
    name: {type: String, required: true},
    listings: [ObjectId]
    //PFP as well
})
const userCollection = new mongoose.model("User", userSchema);

const listingSchema = new mongoose.Schema({
  email: { type: String, required: true},
  id: { type: String, required: true },
  price: {type: Number, required: true}, 
  sold: {type: Boolean, default: false},
  time : {type: Date, default: Date.now},
})

const classSchema = new mongoose.Schema({
  departmentId: String,
  name: String,
  listings: [listingSchema]
  // Add other fields as needed
});



const classCollection = new mongoose.model("class", classSchema);






// const Listing = new mongoose.model("Listing", listingSchema);



//-------------------mongodb-----------------//

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// aasync function rmListing(req) {
//   // Extract data from the request body
//   tryMongooseConnection().then(async () => {
//     try {
//       cons{classid, username
//         }
//       });

//     } catch (error) {
//       console.log(error)
//     }
//   })

  // try {
  //   const { classid, prc} = req.body;
  //   let username = "atij";
  //   //Check to see if user is loggd in
  //   // Use User.create to create a new user and save it to the database
  //   const newListing = {
  //     email: username,
  //     price: prc,
  //     id: classid
  //   }
  //   try{
  //     let course = await classCollection.find({departmentId: classid}).lean();
  //     console.log(course)
  //     // await classCollection.findOneAndUpdate({departmentId: classid}, {$push: {listings: newListing}});
  //     // console.log(`added class ${classid}`)

  //   } catch (error) {
  //     console.log(error)
  //   }


  //   // res.status(201).json({ message: 'Listing created successfully' });
  // } catch (error) {
  //   console.error("Error:", error);
  //   // res.status(500).json({ message: 'Internal Server Error' });
  // }

}

post 
let req = {
  body: {
      classid: "COM SCI 32",
      prc: 20
    }
}
makeListing(req)




