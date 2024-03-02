const express = require("express");
const mongoose = require("mongoose");
const app = express();
const user = require("./models/user")
const reviewlist = require("./models/reviewlist")

const uri = "mongodb+srv://darkparasite:12345@movie.hgj9ehc.mongodb.net/MovieReview?retryWrites=true&w=majority";
var ConPort = 4000; 


async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

connect();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/'))
app.set("view engine", "ejs")

app.get("/", (request, response) => 
{
    response.render("login")
})

app.post("/signup", async(request, response) =>
{
  const AllData = user.find()
  const DataCount = (await AllData).length

  const data = {
    ID: DataCount + 1,
    name: request.body.name,
    email : request.body.email,
    passwd : request.body.passwd
  }

  const check = await user.findOne({email : request.body.email})

  try
  {
      if(check == null)
      {
        await user.insertMany([data])
        response.render("login", {signupfail : "Account successfully created!, please login."})
      }
      else
      {
        response.render("login", {signupfail : "You already have an account, please login!"})
      }
  }
  catch(e)
  {
      response.render("login", {signupfail : "Something went wrong, please try again!"})
  }
}
) 

app.post("/login", async(request, response) => 
{
    try
    {
        const check = await user.findOne({email : request.body.email})

        if(check.passwd === request.body.passwd)
        {
            const EncodedDetails = encodeURIComponent(JSON.stringify(check))
            var address = '/home?UserDetails=' + EncodedDetails
            response.redirect(address)
        }
        else
        {
            response.render("login", {loginfail: "Email/Password is wrong, Please try again!"})
        }
    }
    catch(e)
    {
        response.render("login", {loginfail: "Email/Password is wrong, Please try again!"})
    }
})

app.get("/home", async(request, response) =>
{
  const ParsedUserDetails = JSON.parse(decodeURIComponent(request.query.UserDetails))

  response.render("home", {UserDetails : ParsedUserDetails})
})


app.get("/reviewlist" , async(request, response) =>
{
    const UserDetails = JSON.parse(decodeURIComponent(request.query.UserDetails));
    const movieName = request.query.movieName
    const check = await reviewlist.find({moviename : movieName})

    if(check == null)
    {
      console.log("Movie not found")
    }
    else
    {
      //Review data is found
      response.render("reviews" , {reviewlistdata : check, reviewcounter : 1, UserDetails : UserDetails})
    }
})

app.post("/writereview", async(request, response) =>
{
  const UserDetails = JSON.parse(decodeURIComponent(request.query.UserDetails))
  const reviewlistdata = JSON.parse(decodeURIComponent(request.query.reviewlistdata))
  
  const NewReview = {
    ID : reviewlistdata[0].ID,
    username : UserDetails.name,
    moviename : reviewlistdata[0].moviename,
    reviewdata : request.body.reviewarea
  }

  const check = await reviewlist.findOne({username : UserDetails.name, moviename : reviewlistdata[0].moviename})
  if(check == null)
  {
      //Review doesnt exist, can write new review
      await reviewlist.insertMany([NewReview])
      const newreviewlistdata = await reviewlist.find({moviename : reviewlistdata[0].moviename})
      response.render("reviews", {DispMsg : "Your review has been posted successfully!", reviewlistdata : newreviewlistdata, reviewcounter : 1, UserDetails : UserDetails})
  }
  else
  {
      const newreviewlistdata = await reviewlist.find({moviename : reviewlistdata[0].moviename})
      response.render("reviews", {DispMsg : "You already have a review posted, you cannot write another review!", reviewlistdata : newreviewlistdata, reviewcounter : 1, UserDetails : UserDetails})
  }

})


app.listen(ConPort, () => {
  console.log("Server started on port " + ConPort);
});