const express = require("express");
const router = express.Router();

console.log("router loaded");
const quizController = require("../controller/quizController");

router.post("/create", quizController.create);
router.get("/get", quizController.getAll);
router.post("/check", quizController.check);

module.exports = router;
