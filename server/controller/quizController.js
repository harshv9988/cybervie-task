const Quiz = require("../models/Quiz");

module.exports.create = async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);

    return res.status(200).json({
      success: true,
      message: "Post Created",
      data: quiz,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
};

module.exports.getAll = async (req, res) => {
  try {
    const quiz = await Quiz.find({});

    return res.status(200).json({
      success: true,
      data: quiz,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
};

module.exports.check = async (req, res) => {
  try {
    const { id, answer } = req.body;

    const quiz = await Quiz.findById(id);

    if (quiz.answer === answer) {
      return res.status(200).json({
        success: true,
      });
    } else {
      return res.status(200).json({
        success: false,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
};
