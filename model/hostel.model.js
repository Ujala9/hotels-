const mongoose = require("mongoose")

const hotelSchema = new mongoose.Schema({
     name: {
        type: String,
        require: true 
    }, 
    category: {
        type: [String],
        enum: ['Budget', 'Mid-Range', 'Luxury', 'Boutique', 'Resort','Other'],
        require: true
      },  
    location: {
        type: String,
        require: true
      },   
    rating: {
        type: Number,
        require: true,
        default: 0
     },  
    reviews: [String],
    website: String,
    phoneNumber: {
        type: String,
        require: true
     }, 
    checkInTime: {
        type: String,
        require: true
    },
    checkOutTime : {
    type: String,
    require:true
}, 
  amenities:[String], 
  priceRange: ['$$ (11-30)', '$$$ (31-60)', '$$$$ (61+)','Other'],
  reservationsNeeded: {
    type:Boolean,
    default: false
},
isParkingAvailable: {
    type:Boolean,
    default:true
}, 
isWifiAvailable: {
    type:Boolean,
    default:true
}, 
isPoolAvailable:{
    type:Boolean,
    default:true
}, 
isSpaAvailable: {
    type:Boolean,
    default:true
}, 
isRestaurantAvailable:{
    type:Boolean,
    default:false
}, 
photos: [String],
},
 { timestamps: true } 
)

const Hotel = mongoose.model('Hotel', hotelSchema)

module.exports = Hotel;


