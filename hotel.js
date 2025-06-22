const express = require("express")
const app = express()
const cors = require("cors")
app.use(express.json()) // enables your server to read and use JSON data sent in the body of HTTP requests.

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions))

const {initializeDatabase} = require("./db/db.connect")

const Hotel = require("./model/hostel.model")

initializeDatabase()

//BE4.2_HW2
async function createHotel(newHotel){
    try{
      const hotel = new Hotel(newHotel)
      const savedHotel = await hotel.save()
      return savedHotel
    } catch (error){
      throw error
    }
}

app.post("/hotel", async (req,res) => {
   try{
    const savedHotel = await createHotel(req.body)
    res.status(201).json({
        message: "Hotel added Successfully",
        hotel: savedHotel,
    })
   }catch (error){
    console.error("Error in POST /hotels:", error.message);
        res.status(400).json({error: error.message})
   }
})

async function readAllHotel(){
    try{
      const allHotel = await Hotel.find()
      return allHotel
    }catch (error){
        throw error
    }
}

app.get("/hotels", async(req,res) => {
    try{
     const hotel = await readAllHotel()
        if(hotel.length != 0){
            res.json(hotel)
        } else {
            res.status(404).json({error: "No hotel found."})
        }
    }catch (error){
        res.status(400).json({error: "Failed to fetch hotel."})
    }
})

async function readHotelByName(hotelName){
    try {
       const hotelByName = await Hotel.findOne({name: hotelName})
       return hotelByName
    } catch (error){
        console.log(error)
    }
}


app.get("/hotel/:hotelName", async(req,res) => {
    try{
      const hotel = await readHotelByName(req.params.hotelName)
       if(hotel){
            res.json(hotel)
        } else {
            res.status(404).json({error: "No hotel found."})
        }
    }catch (error){
        res.status(500).json({error: "Failed to fetch hotel."})
    }
})



// async function restaurantByPhone(phone){
//     try{
//       const restaurantsByPhone = await Restaurant.find({phoneNumber: phone})
//       return restaurantsByPhone
//     }catch (error){
//         console.log(error)
//     }
// }

// app.get("/restaurants/directory/:phoneNumber", async(req,res) => {
//     try{
//       const restaurant = await restaurantByPhone(req.params.phone)
//       if(restaurant.length != 0){
//         res.json(restaurant)
//         } else {
//             res.status(404).json({error: "No restaurant found."})
//         }
//     } catch(error){
//        res.status(500).json({error: "Failed to fetch restaurant."})
//     }

// })

// //4. Create an API with route "/restaurants/cuisine/:cuisineName" to read all restaurants by cuisine. Test your API with Postman.

// async function readRestaurantByCuisine(selectedCuisine){
//     try {
//      const restaurantsByCuisine = await Restaurant.find({cuisine: selectedCuisine})
//       return restaurantsByCuisine
//     } catch(error){
//         res.status(500).json({error: "Failed to fetch restaurant."})
//     }
// }

// app.get("/restaurants/cuisine/:cuisineName", async(req,res) => {
//     try{
//       const restaurant = await readRestaurantByCuisine(req.params.cuisineName)
//       if(restaurant.length != 0){
//         res.json(restaurant)
//         } else {
//             res.status(404).json({error: "No restaurant found."})
//         }
//     } catch(error){
//        res.status(500).json({error: "Failed to fetch restaurant."})
//     }

// })



async function readHotelByCategory(selectedCategory){
    try {
     const hotelsByCategory = await Hotel.find({ category: selectedCategory })
      return hotelsByCategory
    } catch(error){
        res.status(500).json({error: "Failed to fetch Hotel."})
    }
}

app.get("/hotels/category/:hotelCategory", async(req,res) => {
    try{
      const hotel = await readHotelByCategory(req.params.hotelCategory)
      if(hotel.length != 0){
            res.json(hotel)
        } else {
            res.status(404).json({error: "No hotel found."})
        }
    }catch (error){
        res.status(500).json({error: "Failed to fetch hotel."})
    }

})

//4.3_HW2

async function deleteHotel(hotelId){
    try{
     const deletedHotel = await Hotel.findByIdAndDelete(hotelId)
     return deletedHotel
    }catch (error){
        console.log(error)
    }
}

app.delete("/hotels/:hotelId", async (req,res) => {
    try {
     const deletedHotel = await deleteHotel(req.params.hotelId)
     if(deletedHotel){
        res.status(200).json({error: "Hotel Deleted Successfully"})
     }
     return deletedHotel
    }catch (error){
        res.status(500).json({error: "Failed to delete Hotel"})
    }
})

//BE4.4_ HW2

async function updateHotel(hotelId,dataToUpdate ){
    try{
    const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, dataToUpdate,{
        new: true
    })
    return updatedHotel
    }catch (error){
       console.log(error)
    }
}

app.post("/hotel/:hotelId", async(req,res) => {
    try{
     const updatedHotel = await updateHotel(req.params.hotelId, req.body)
     if(updatedHotel){
        res.status(200).json({ message: "Hotel updated successfully." });
     }else {
         res.status(500).json({ error: "Failed to Update Hotel" });
     }
    } catch (error){
        res.status(500).json({error: "Failed to Update Hotel"})
    }
})


// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});