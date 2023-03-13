const express = require("express");
const sls = require("serverless-http");

const app = express();
const mongoose = require("mongoose");

require("./customer_Model");
const customer_Model = mongoose.model("Customer");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

// Replace the connection string with your own
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

app.get("/", (req, res) => {
  res.send("Customer endpoint");
});

app.post("/customer", (req, res) => {
  // create customer function

  var newCustomer = {
    name: req.body.name,
    age: req.body.age,
    address: req.body.address,
  };
  // create a new customer
  var customer = new customer_Model(newCustomer);

  customer
    .save()
    .then(() => {
      console.log("New Customer Created");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });

  console.log(req.body);
  res.send("Customer saved to database");
});

// get all customers
app.get("/customers", (req, res) => {
  customer_Model
    .find()
    .then((Customer) => {
      console.log(Customer);
      res.json(Customer);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

// delete all customers

app.delete("/customer/:id", (req, res) => {
  customer_Model
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.send("Customer Deleted sucessfully");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

// app.listen("5555", () =>{
//     console.log("up and running! -- The customer service")
// })

module.exports.server = sls(app);
