require("dotenv").config(); // <-- ADD THIS AS LINE 1

const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./config/connect");

const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", require("./routes"));

// Open the server port directly to guarantee Render can find it
app.listen(port, () => {
  console.log(`Connected and listening on port ${port}`);
});

// Initialize the database connection in parallel
mongodb.initDb((err) => {
  if (err) {
    console.log("Database connection warning:", err);
  } else {
    console.log("Database successfully integrated.");
  }
});

