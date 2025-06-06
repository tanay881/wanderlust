const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
require("dotenv").config();

// express configuration
const app = express();

// mongoDB connection
establishDatabaseConnection()
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));

async function establishDatabaseConnection() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("Database connection could not established");
  }
  await mongoose.connect(databaseUrl);
}

// view engine setup
app.set("view engine", "ejs");

// use ejs-mate as the view engine
app.engine("ejs", ejsMate);

// join the views directory
app.set("views", path.join(__dirname, "views"));

// middleware function
// join the public directory for sarvicing static files and styling
app.use(express.static(path.join(__dirname, "/public")));

// middleware function
// paarse urlencoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// middleware function
// method override
app.use(methodOverride("_method"));

// server configuration
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// root route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// testListing route
// app.get('/testListing', async (req, res) => {
//   const sampleListing = new Listing({
//     title: 'Sample Listing',
//     description: 'This is a sample listing',
//     price: 100,
//     location: 'Sample Location',
//     country: 'Sample Country'
//   });

//   await sampleListing.save()
//   console.log('sampleListing saved');
//   res.send('Sample Listing saved');
// });

// get all listings route / index.ejs
app.get("/listings", async (req, res) => {
  const pageNo = req.query.page ?? 1;

  // no of content per page to show
  const contentPerPage = 20;

  const totalNoOfRecordsInDB = await Listing.find({}).countDocuments().exec();
  const restOfTheData = totalNoOfRecordsInDB % contentPerPage

  let totalNoPage
  if (restOfTheData === 0) {
    totalNoPage =
      totalNoOfRecordsInDB / contentPerPage;
  } else {
    totalNoPage =
      (totalNoOfRecordsInDB / contentPerPage) + 1;
  }

  console.log(totalNoPage);

  // get the content to show from
  const startingIndex = (pageNo - 1) * contentPerPage;

  const allListings = await Listing.find({})
    .skip(startingIndex)
    .limit(contentPerPage);

  return res.render("./listings/index.ejs", { allListings, totalNoPage });
});

// new route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// create route
app.post("/listings", async (req, res) => {
  const listing = req.body.listing;
  const newListing = new Listing({
    title: listing.title,
    description: listing.description,
    price: listing.price,
    image: {
      url: listing.url,
    },
    location: listing.location,
    country: listing.country,
  });

  await newListing.save();
  res.redirect("/listings");
});

// edit route
app.get("/listings/:id/edit", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("./listings/edit.ejs", { listing });
});

// update route
app.put("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const listing = req.body.listing;
  const updatedListing = await Listing.findByIdAndUpdate(id, {
    title: listing.title,
    description: listing.description,
    price: listing.price,
    image: {
      url: listing.url,
    },
    location: listing.location,
    country: listing.country,
  });

  await updatedListing.save();

  res.redirect(`/listings/${id}`);
});

// delete route
app.delete("/listings/:id", async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});

// show route
app.get("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("./listings/show.ejs", { listing });
});
