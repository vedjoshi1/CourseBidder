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
const crypto = require('crypto');
const {cookie, query, body, validationResult, matchedData } = require('express-validator')

//------------modules used-------------//

const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(helmet());
// allow the app to use cookieparser
app.use(cookieparser());
// allow the express server to process POST request rendered by the ejs files 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ---------------------auth------------------//
async function getUserFromCookie(cookie) {
  try {
    await tryMongooseConnection();
  } catch (error) {
    console.log(error)
    reject("could not connect to mongodb")
  }
  return new Promise(async (resolve, reject) => {
    if (!cookie) {
      reject("null cookie")
    } else {
      try {
        let user = await userCollection.findOne({session: cookie})
        user ? resolve(user): reject("no user found");
      } catch (error) {
        console.log(error)
        reject("could not fetch user")
      }
    }
  })
}
async function markItemSold(email, objectId) {
  try {
      await tryMongooseConnection();
      if (!email) {
          throw new Error("Email cannot be null");
      }
      const user = await getUserByEmail(email);
      if (!user) {
          throw new Error("User not found");
      }
      // Find the listing with the specified objectId
      let foundListing = null;
      for (const listing of user.listings) {
          if (listing.departmentId === objectId) {
              foundListing = listing;
              break; // Stop iterating once a match is found
          }
      }
      if (!foundListing) {
          throw new Error("Listing not found");
      }
      foundListing.isSold = true;
      removeListingFromClass(email, objectId);
      // Save the updated user profile
      const updatedUser = await user.save();
      return updatedUser;
  } catch (error) {
      console.error(error.message);
      throw new Error("Error marking item as sold");
  }
}
async function getUserByEmail(email) {
  try {
      return await userCollection.findOne({ email: email });
  } catch (error) {
      console.error("Could not fetch user:", error);
      throw new Error("Error fetching user");
  }
}

async function removeListingFromClass(email, departmentId) {
  try {
    const specificClass = await classCollection.findOne({ departmentId: departmentId });
    let foundListing = null;

    for (const listing of specificClass.listings) {
      if (listing.email == email) {
        foundListing = listing;
        break;
      }
    }

    if (!foundListing) {
      throw new Error("Listing not found");
    }

    const updatedListings = specificClass.listings.filter(listing => listing._id.toString() !== foundListing._id.toString());

    // Update the document with the new listings array
    await classCollection.updateOne(
      { departmentId: departmentId },
      { $set: { listings: updatedListings } }
    );

  } catch (error) {
    console.error(error);
    throw new Error("Error deleting class");
  }
}



async function isItemSold(email, objectId) {
  try {
    await tryMongooseConnection();
    if (!email) {
      throw new Error("Email cannot be null");
    }
    const user = await getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    // Find the listing with the specified objectId
    let foundListing = null;
    for (const listing of user.listings) {
      if (listing.departmentId === objectId) {
        foundListing = listing;
        break; // Stop iterating once a match is found
      }
    }
    if (!foundListing) {
      throw new Error("Listing not found");
    }
    // Return the value of isSold without modifying the user
    return foundListing.isSold;
  } catch (error) {
    console.error(error.message);
    throw new Error("Error checking if item is sold");
  }
}




//-------------------mongodb-----------------//
const uri = "mongodb+srv://coursebidder:Generativeai1@coursebidder.gb7lsik.mongodb.net/CourseBidder?retryWrites=true&w=majority";

async function tryMongooseConnection() {
  return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true});
}

mongoose.connection.on('connected', () => {
    console.log("connected to mongodb");
})


const listingSchema = new mongoose.Schema({
  email: { type: String, required: true},
  departmentId: { type: String, required: true },
  price: {type: Number, requred: true}, 
  isSold: {type: Boolean, default: false},
  timePosted: {type: Date, default: Date.now},
})


const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: {type: String, required: true},
  listings: [listingSchema],
  session: {type: String, default: ""}
  //PFP as well
})
const userCollection = new mongoose.model("user", userSchema);
const classSchema = new mongoose.Schema({
  departmentId: String,
  name: String,
  listings: [listingSchema]
  // Add other fields as needed
});

const classCollection = new mongoose.model("classes", classSchema);
// const Listing = new mongoose.model("Listing", listingSchema);
//-------------------mongodb-----------------//

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.post("/register", body('email').trim().isEmail().escape(), body('password').isLength({min: 6}), body('fullName').escape(), async (req,res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    try {
      await tryMongooseConnection();
    } catch (error) {
      res.status(500).json({errors: ["could not connect to mongodb"]}).send()
      console.log(error)
      return;
    }

    const {email, password, fullName} = matchedData(req);

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      let old_user = await userCollection.findOne({email: email});
      if (old_user) {
        res.status(400).json({errors: [`user with email ${email} already exists`]}).send()
        return;
      }

      const newUser = await userCollection.create({
        email: email,
        password: hashedPassword,
        fullName: fullName,
        listings: []
      });
      res.status(201).json({messages: [`user with email ${email} created successfully`]}).send();
    } catch (error) {
      res.status(500).json({errors: [`could not add new user with email ${email}`]}).send();
      console.log(error)
    }

  } else {
    res.status(422).json({errors: result.array() }).send();
    console.log("inputs failed validation")
  }
})


app.post("/login", body('email').trim().isEmail().escape(),  body('password').isLength({min: 6}), async (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    try {
      await tryMongooseConnection();
    } catch (error) {
      res.status(500).json({errors: ["could not connect to mongodb"]}).send()
      console.log(error)
      return;
    }

    const {email, password} = matchedData(req);

  
    console.log(email);
    try {
      let user = await userCollection.findOne({email: email}).lean();
      if (!user) {
        res.status(400).json({errors: [`user with email ${email} does not exist`]}).send()
        return;
      }

     


      let validatePassword = await bcrypt.compare(password, user.password)
      if(!validatePassword) {
        res.status(401).json({messages: [`incorrect password for user with email ${email}`]}).send()
      } else {
        let cookie = crypto.randomBytes(16).toString('hex');
        try {
          await userCollection.updateOne({email: email}, {$set: {session: cookie}}) 
          res.cookie("session", cookie, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            secure: true,
            httpOnly: true,
            sameSite: 'lax',
            path: '/'
          });
          res.status(201).json({messages: [`user with email ${email} logged in successfully`]}).send()

        } catch (error) {
          res.status(500).json({errors: [`could not update session cookie for user with email ${email}`]}).send()
          console.log(error)
        }
      }

    } catch (error) {
      res.status(500).json({errors: [`could not query for user with email ${email}`]}).send();
      console.log(error)
    }

  } else {
    res.status(422).json({errors: result.array() });
    res.send();
    console.log("inputs failed validation")
  }
})

app.post("/logout", body('email').trim().isEmail().escape(), async (req, res) => {

    const result = validationResult(req);
    if(result.isEmpty()) {
      // clear all cookies
      Object.keys(req.cookies).forEach(cookieName => {
        res.clearCookie(cookieName);
      });
      try {
        await tryMongooseConnection();
      } catch (error) {
        res.status(500).json({errors: ["could not connect to mongodb"]}).send()
        console.log(error)
        return;
      }
      const {email} = matchedData(req);

      try {
        await userCollection.updateOne({email: email}, {$set: {session: ""}}) 
        res.status(201).json({messages: [`user with email ${email} logged out successfully`]})
      } catch (error) {
        res.status(500).json({errors: [`could not log out session for user with email ${email}`]}).send()
        console.log(error)
      }

    } else {
      res.status(422).json({errors: result.array()}).send();
      console.log("inputs failed validation")
    }
  
   
});


// TODO: clean up
app.post("/makeListing", body('departmentId'), body('price').isFloat({min: 0}), async (req,res) => {
    
  const result = validationResult(req);
  if(result.isEmpty()) {
    try {
      await tryMongooseConnection();
    } catch (error) {
      res.status(500).json({errors: ["could not connect to mongodb"]}).send()
      console.log(error)
      return;
    }
    const {departmentId, price} = matchedData(req);
    try {
      const user = await getUserFromCookie(req?.cookies?.session)
      const email = user.email
      const newListing = {
        email: email,
        price: price,
        departmentId: departmentId,
        _id: mongoose.Types.ObjectId()
      }
      try {
        let course = await classCollection.findOne({departmentId: departmentId});
        if(course.listings.filter((listing) => listing.email == email).length > 0) {
          res.status(400).json({errors: [`user with email ${email} already has a listing for course ${departmentId}`]}).send()
          console.log(`user with email ${email} already has a listing for course ${departmentId}`);
        } else {
          try {
            await classCollection.updateOne({departmentId: departmentId}, {$push: {listings: newListing}})
            await userCollection.updateOne(
              { email: email },{$push: {listings: newListing}});
            res.status(201).json({messages: ["successfully created listing"]});
          } catch (error) {
            res.status(500).json({errors: ['could not update listings for user or class']})
          }
        }
      } catch (error) {
        res.status(500).json({errors: [`could not get class with department id ${departmentId}`]}).send();
        console.log(error);
      }

    } catch (error) {
      res.status(400).send({errors: ['could not get user email from cookie!']}) 
      console.log(error);
    }
  } else {
    res.status(422).json({errors: result.array()}).send();
    console.log("inputs failed validation") 
  }
})

app.get("/getListingsFromUser", query(), async (req, res) => {
  const result = validationResult(req);
  if(result.isEmpty()) {
    try {
      await tryMongooseConnection();
    } catch (error) {
      res.status(501).json({errors: ["could not connect to mongodb"]}).send()
      console.log(error)
      return;
    }

    try {
      const user = await getUserFromCookie(req?.cookies?.session)
      const email = user.email
      
      res.status(201).send(JSON.stringify({data: user.listings}));
      

    } catch (error) {
      res.status(400).send({errors: ['could not get user email from cookie!']}) 
      console.log(error);
    }
    
   

  } else {
    res.status(422).json({errors: result.array()}).send();
    console.log("inputs failed validation")
  }

});

app.get("/getListings", query('departmentId'), async (req, res) => {

  
    const result = validationResult(req);
    if(result.isEmpty()) {
      try {
        await tryMongooseConnection();
      } catch (error) {
        res.status(501).json({errors: ["could not connect to mongodb"]}).send()
        console.log(error)
        return;
      }
      const { departmentId } = matchedData(req);
      console.log('Extracted departmentId:', departmentId);

      
      try {
        const classes = await classCollection.findOne({departmentId: departmentId}).lean()
      //  console.log(classes);
        string_classes = classes.listings.slice(0, Math.min(classes.listings.length, 1000)).map((course) => {
          return {
            email: course.email,
            departmentId: course.departmentId,
            price: course.price,
            isSold: course.isSold,
            timePosted: course.timePosted.toString(),
            id: course._id.toString()
          };
        })
        console.log(string_classes)
        res.send(JSON.stringify({data: string_classes}))
      } catch (error) {
        res.status(500).json({errors: [`could not fetch listings for class with id ${departmentId}`]}).send();
        console.log(error);
      }

    } else {
      res.status(422).json({errors: result.array()}).send();
      console.log("inputs failed validation")
    }
  
});


app.get("/", (req, res) => {
    // check if user is logged in, by checking cookie
    let username = req.cookies.username;
    if(username){
        return res.render("mainpage", {
            username,
        });
    }else{
        res.redirect("/login");
    }

});
app.get("/mainpage", (req, res) => {
    // check if user is logged in, by checking cookie
    let username = req.cookies.username;
    if(username){
        return res.render("mainpage", {
            username,
        });
    }else{
        res.redirect("/login");
    }

});


app.post("/removeListings" , async (req, res) => {
  const result = validationResult(req);
  if(result.isEmpty()) {
    try {
      await tryMongooseConnection();
    } catch (error) {
      res.status(500).json({errors: ["could not connect to mongodb"]}).send()
      console.log(error)
      return;
    }
  }
  try {
    const user = await getUserFromCookie(req?.cookies?.session)
    user.listings = []
    await user.save();
    res.status(201).json({messages: ["successfully removed listing"]});
  }catch (error) {
    res.status(400).send({errors: ['could not get user email from cookie!']}) 
    console.log(error);
  }

})


app.post("/removeListing" , async (req, res) => {
  const result = validationResult(req);
  if(result.isEmpty()) {
    try {
      await tryMongooseConnection();
    } catch (error) {
      res.status(500).json({errors: ["could not connect to mongodb"]}).send()
      console.log(error)
      return;
    }
  }

  const listingId = (req.body.listingId);
  try {
    const user = await getUserFromCookie(req?.cookies?.session)
      
     
     // console.log(user.listings);
      const foundListing = user.listings.find(listing => listing._id.toString() === listingId);


      if (!foundListing) {
        res.status(404).json({ error: 'Listing not found' });
        return;
      }
      const classes = await classCollection.findOne({departmentId: foundListing.departmentId})
      
      
      const updatedListings = classes.listings.filter(listing => listing._id.toString() !== listingId);
      
      await classCollection.updateOne({ departmentId: foundListing.departmentId }, { $set: { listings: updatedListings } });
      const updatedListings1 = user.listings.filter(listing => listing._id.toString() !== listingId);

    // Assuming user.listings is an array
      user.listings = updatedListings1;

    // Save the updated user to the database
      await user.save();
      res.status(201).json({messages: ["successfully removed listing"]});
  } catch (error) {
    res.status(400).send({errors: ['could not get user email from cookie!']}) 
    console.log(error);
  }

});

app.post("/getuser", async (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    try {
        await tryMongooseConnection();
      } catch (error) {
        res.status(500).json({errors: ["could not connect to mongodb"]}).send()
        console.log(error)
        return;
      }
      try {
        const user = await getUserFromCookie(req?.cookies?.session)
        const { fullname, email, password } = req.body;
        if (fullname) user.fullName = fullname;
        if (email) user.email = email;
        if (password) {
          const hashedPassword = await bcrypt.hash(password, 10);
          user.hashedPassword = hashedPassword;
       }
    // Save the updated user profile
        const updatedUser = await user.save();
        res.status(201).json({ message: 'User profile updated successfully', user: updatedUser });

      } catch (error) {
        res.status(400).send({errors: ['could not get user email from cookie!']}) 
        console.log(error);
      }
  }else{

    res.status(422).json({errors: result.array() }).send();
    console.log("inputs failed validation")

  }
});

app.post("/markitemsold", async (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
      try {
          await tryMongooseConnection();
          const { email, id } = req.body;
          // Mark the item as sold and update user profile
          const updatedUser = await markItemSold(email, id,);
          res.status(201).json({ message: 'User profile and item marked as sold successfully', user: updatedUser });
      } catch (error) {
          if (error.message === 'Listing not found') {
              res.status(404).json({ errors: [error.message] });
          } else {
              res.status(400).json({ errors: ['Could not get/update user by email'] });
          }
          console.log(error);
      }
  } else {
      res.status(422).json({ errors: result.array() }).send();
      console.log("Inputs failed validation");
  }
});

app.post("/isitemsold", async (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
      try {
          await tryMongooseConnection();
          const { email, id } = req.body;
          // Check if the item is sold
          const itemIsSold = await isItemSold(email, id);

          res.status(200).json({ isSold: itemIsSold });
      } catch (error) {
          if (error.message === 'Listing not found') {
              res.status(404).json({ errors: [error.message] });
          } else {
              res.status(400).json({ errors: ['Could not get user by email'] });
          }
          console.log(error);
      }
  } else {
      res.status(422).json({ errors: result.array() }).send();
      console.log("Inputs failed validation");
  }
});




app.get("/numListings", async (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    try {
        await tryMongooseConnection();
      } catch (error) {
        res.status(500).json({errors: ["could not connect to mongodb"]}).send()
        console.log(error)
        return;
      }
      try {
        const user = await getUserFromCookie(req?.cookies?.session)
        res.status(201).json({num: user.listings.length});

      } catch (error) {
        res.status(400).send({errors: ['could not get user email from cookie!']}) 
        console.log(error);
      }
  }else{

    res.status(422).json({errors: result.array() }).send();
    console.log("Issue with numListings")

  }
});


app.post("/checkpassword", async (req, res) => {
  let { email, password } = req.body;
  const user = await getUserFromCookie(req?.cookies?.session)

  if (!user) {
    res.status(404).send({message: "No  User Found"})
  } else {

    var validatePassword = await bcrypt.compare(password, user.password)

    if (!validatePassword) {
      res.status(400).send({message: "Invalid Password", correct: false})
    } else {
   
    res.status(201).json({ message: 'Password is correct.', correct: true});

    }
  }
});







app.get('/getClasses', async (req, res) => {
  //let { name, description } = req.body;
  try {
    
    const documents = await Class.find({}).exec();

    // Convert the documents array to a JSON string
    const jsonString = JSON.stringify(documents, null, 2);

    // Write JSON string to a file named 'classes.json'
    fs.writeFileSync('classes.json', jsonString);

    res.status(201).json(jsonString);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



const PORT = '3001' //Find an open port to run backend on
app.listen(PORT, () => console.log(`server started on port ${PORT}`));