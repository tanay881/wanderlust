const mongoose = require('mongoose');
const { Schema } = mongoose;

// create a schema for the listing
const listingSchema = new Schema({
  id: {
    type: Number,
    unique: true,
  },
  title: {
    type: String,
    maxLength: 35,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    filename: {
      type: String,
      default: 'listingimage'
    },
    url: {
      type: [String],
      default: ['https://as1.ftcdn.net/v2/jpg/09/61/19/22/1000_F_961192237_jZyPwdtITDhzhe5IEV3nQ1D8SqQWK3ww.jpg'],
      set: (v) => v === "" ?  'https://as1.ftcdn.net/v2/jpg/09/61/19/22/1000_F_961192237_jZyPwdtITDhzhe5IEV3nQ1D8SqQWK3ww.jpg' : v,
    }
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: {
    type: Number,
    default: 0,
  }, 
  amenities : {
    type: [String],
    default: [],
  },
  isLiked: {
    type: Boolean,
    default: false,
  },
  isSaved: {
    type: Boolean,
    default: false,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
});

// create a model from the schema
const Listing = mongoose.model('Listing', listingSchema);

// export the model
module.exports = Listing;