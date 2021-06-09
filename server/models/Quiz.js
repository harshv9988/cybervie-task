const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  question: {
    type: String,
  },
  answer: {
    type: String,
  },
  correct: {
    type: Boolean,
    default: false,
  },
  submitted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Quiz", quizSchema);
