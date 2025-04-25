const express = require('express');
const mongoose = require('mongoose');
const Listing = require('./models/listing');
const path = require('path');

// express configuration
const app = express();

// mongoDB connection
main()
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// server configuration
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// root route
app.get('/', (req, res) => {
  res.send('Hello World');
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
app.get('/listings', async (req, res) => {
  const allListings = await Listing.find({});
  res.render('./listings/index.ejs', { allListings });
});