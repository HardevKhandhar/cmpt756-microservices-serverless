const mongoose = require("mongoose");

mongoose.model("Room", {
  //roomNumber, floor, capacity, status
  roomNumber: {
    type: String,
    required: true,
  },
  floor: {
    type: String,
    required: true,
  },
  capacity: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});
