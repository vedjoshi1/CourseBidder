const app = require('express')();
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/myapp", {useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("connected to DB");
})

const UserSchema = new mongoose.Schema({
    username: {
      type: String, 
      required: true
    },
    hashedPw:{
      type:String, 
      required:true
    }
});

const User = mongoose.model("User", UserSchema);

app.listen(3000, ()=>{
   console.log("server running on port 3000"); 
});