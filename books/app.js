//load express
const express = require("express");
const sls = require("serverless-http");

const app = express();
const mongoose = require("mongoose");
require("./book_model");
const book_Model = mongoose.model("Book");

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
  res.send("Books endpoint");
});

app.post("/book", (req, res) => {
  // create book function

  var newBook = {
    title: req.body.title,
    author: req.body.author,
    numberPage: req.body.numberPage,
    publisher: req.body.publisher,
  };
  // create a new book
  var book = new book_Model(newBook);

  book
    .save()
    .then(() => {
      console.log("New Book Created");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });

  console.log(req.body);
  res.send("Book saved to database");
});

app.get("/books", (req, res) => {
  book_Model
    .find()
    .then((books) => {
      console.log(books);
      res.json(books);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

// delete a book

app.delete("/book/:id", (req, res) => {
  book_Model
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.send("Book Deleted sucessfully");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

//list one single book

app.get("/book/:id", (req, res) => {
  book_Model
    .findById(req.params.id)
    .then((book) => {
      if (book) {
        //return book data
        res.send(book);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

// app.listen(4545, () => {
//     console.log("up and running! -- The books service")
// })

module.exports.server = sls(app);
