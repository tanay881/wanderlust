const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');

// mongoDB connection
main()
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

// seed the database
const initDB = async () => {
  // delete all listings
  await Listing.deleteMany({});
  console.log('All listings deleted');

  // create new listings
  await Listing.insertMany(initData.data);
  console.log('New listings created');
}

// call the initDB function
initDB()
  .then(() => {
    console.log('Database seeded');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error seeding database:', err);
    mongoose.connection.close();
  });