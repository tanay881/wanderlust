const mongoose = require('mongoose');
const { Schema } = mongoose;

// create a schema for the listing
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    filename: {
      type: String
    },
    url: {
      type: String,
      set: (v) => v === " " ?  'https://as1.ftcdn.net/v2/jpg/09/61/19/22/1000_F_961192237_jZyPwdtITDhzhe5IEV3nQ1D8SqQWK3ww.jpg' : v,
      default: 'https://as1.ftcdn.net/v2/jpg/09/61/19/22/1000_F_961192237_jZyPwdtITDhzhe5IEV3nQ1D8SqQWK3ww.jpg'
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
  }
});

// create a model from the schema
const Listing = mongoose.model('Listing', listingSchema);

// export the model
module.exports = Listing;