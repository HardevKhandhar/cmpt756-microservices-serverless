const express = require("express");
const sls = require("serverless-http");

const app = express();
const mongoose = require("mongoose");

require("./room_Model");
const room_Model = mongoose.model("Room");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

// connection string
const uri =
  "mongodb+srv://Rithik:123456abc@cluster0.x7lwnt0.mongodb.net/?retryWrites=true&w=majority";

// Connect to MongoDB Atlas
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB Atlas", err);
  });

// create new room
app.post("/room", (req, res) => {
  var newRoom = {
    roomNumber: req.body.roomNumber,
    floor: req.body.floor,
    capacity: req.body.capacity,
    status: req.body.status,
  };

  var Room = new room_Model(newRoom);

  Room.save()
    .then(() => {
      console.log("Room created sucessufully");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });

  res.send("Room saved to database");
});

// get a list of all the rooms
app.get("/Rooms", (req, res) => {
  room_Model
    .find()
    .then((Rooms) => {
      res.json(Rooms);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

// delete a room

app.delete("/rooms/:id", (req, res) => {
  room_Model
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.send("Room deleted sucessfully");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.post("/roomsupdate/:id/:status", (req, res) => {
  room_Model
    .updateOne({ _id: req.params.id }, { status: req.params.status })
    .then(() => {
      res.send("Room status updates");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

//update a room
// endpoint check for order service
app.get("/", (req, res) => {
  res.send("Rooms endpoint");
});

// port app is listining to
// app.listen("7777", ()=> {
//     console.log("up and running - rooms service")
// })

module.exports.server = sls(app);
