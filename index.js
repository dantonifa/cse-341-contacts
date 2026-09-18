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

// Initialize the database connection first, then unlock the port
mongodb.initDb((err) => {
  if (err) {
    console.log("Database initialization failed:", err);
  } else {
    console.log("Database initialized successfully pointing to: cse-341-contacts");
    // Open the server port strictly after the database handshake is active
    app.listen(port, () => {
      console.log(`Connected to DB and listening on port ${port}`);
    });
  }
});

