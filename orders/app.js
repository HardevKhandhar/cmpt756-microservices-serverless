const express = require("express");
const sls = require("serverless-http");

const app = express();
const mongoose = require("mongoose");
const axios = require("axios");
require("./order_Model");
const order_Model = mongoose.model("Order");
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

// create new order
app.post("/order", (req, res) => {
  var newOrder = {
    customerId: req.body.customerId,
    bookId: req.body.bookId,
    borrowDate: req.body.borrowDate,
    returnDate: req.body.returnDate,
  };

  var order = new order_Model(newOrder);

  order
    .save()
    .then(() => {
      console.log("Order created sucessufully");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });

  res.send("Customer saved to database");
});

// get a list of all the orders
app.get("/orders", (req, res) => {
  order_Model
    .find()
    .then((Orders) => {
      res.json(Orders);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

// delete an order

app.delete("/order/:id", (req, res) => {
  order_Model
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.send("Order returned sucessfully");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

// endpoint check for order service
app.get("/", (req, res) => {
  res.send("Order endpoint");
});

// port app is listining to
// app.listen("8080", ()=> {
//     console.log("up and running - order service")
// })

module.exports.server = sls(app);
