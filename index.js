require("dotenv").config(); // <-- ADD THIS AS LINE 1

const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./config/connect");
const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  // Load the Swagger configuration file
const swaggerDocument = require("./swagger-output.json");

// Force Swagger to use the production host regardless of the JSON file configuration
swaggerDocument.host = 'cse-341-contacts-457w.onrender.com';
swaggerDocument.schemes = ['https'];

// Serve the interactive documentation interface
app.use(
  "/api-docs",
  require("swagger-ui-express").serve,
  require("swagger-ui-express").setup(swaggerDocument)
);

  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", require("./routes"));

// Initialize the database connection first, then unlock the server port
mongodb.initDb((err) => {
  if (err) {
    console.log("Database initialization failed:", err);
  } else {
    console.log(
      "Database initialized successfully pointing to: cse-341-contacts",
    );
    // Open the server port strictly after the database handshake is active
    app.listen(port, () => {
      console.log(`Connected to DB and listening on port ${port}`);
    });
  }
});
