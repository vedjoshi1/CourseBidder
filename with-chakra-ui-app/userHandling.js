//------------modules used-------------//
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cookieparser = require("cookie-parser");
const mongoose = require("mongoose");
//------------modules used-------------//

const app = express();
app.use(helmet());
// allow the app to use cookieparser
app.use(cookieparser());
// allow the express server to process POST request rendered by the ejs files 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//-------------------mongodb-----------------//
mongoose.connect("mongodb+srv://coursebidder:Generativeai1@coursebidder.gb7lsik.mongodb.net/CourseBidder", { useNewUrlParser: true });
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    pass: { type: String, required: true },
})
const User = new mongoose.model("User", userSchema);
//-------------------mongodb-----------------//

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

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



app.post("/login", (req, res) => {
    // get the data
    let { username, password } = req.body;

    User.find({email: username},(err)=>{
        if(err){
            res.redirect("/");
        }else{
            res.cookie("username", username, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                secure: true,
                httpOnly: true,
                sameSite: 'lax'
            });
            res.redirect("/mainpage");
        }
    })

    // fake test data
    // let userdetails = {
    //     username: "Bob",
    //     password: "123456",
    // };

    // // basic check
    // if (
    //     username === userdetails["username"] &&
    //     password === userdetails["password"]
    // ) {
    //     // saving the data to the cookies
    //     res.cookie("username", username, {
    //         maxAge: 30 * 24 * 60 * 60 * 1000,
    //         secure: true,
    //         httpOnly: true,
    //         sameSite: 'lax'
    //     });
    //     // redirect

    //     return res.redirect("/");

    // } else {
    //     // redirect with a fail msg
    //     return res.redirect("/login?msg=fail");
    // }
});

app.post("/register", async (req,res)=>{
  try {
    const { eml, pwd } = req.body;

    // Use User.create to create a new user and save it to the database
    const newUser = await User.create({
      email: eml,
      pass: pwd,
    });

    console.log('User created:', newUser);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);

    // Handle error response
    res.status(500).json({ error: 'Internal Server Error' });
  }
    
    
/*
    res.cookie("username", given_username, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    });
    */
   
})

app.get("/logout", (req, res) => {
    // clear the cookie
    res.clearCookie("username");
    // redirect to login
    return res.redirect("/login");
});



app.listen('3000', () => console.log(`server started`));
