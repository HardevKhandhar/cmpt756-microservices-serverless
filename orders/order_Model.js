const mongoose = require("mongoose");

mongoose.model("Order", {
  //customerId, bookId, borrowDate, returnDate
  customerId: {
    type: String,
    required: true,
  },
  bookId: {
    type: String,
    required: true,
  },
  borrowDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
    required: true,
  },
});
