const express = require("express");
const router = express.Router();

// Root route that serves the HTML interface directly
router.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>My Contacts Directory</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; background-color: #f4f4f9; color: #333; }
        h1 { color: #4a4a8a; }
        .btn { display: inline-block; padding: 10px 20px; background-color: #4a4a8a; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; }
        .btn:hover { background-color: #38386a; }
      </style>
    </head>
    <body>
      <h1>Welcome to the Contacts API</h1>
      <p>This webpage is generated directly by Node.js without using a physical HTML file.</p>
      <br>
      <a href="/contacts" class="btn">View All Contacts (JSON)</a>
    </body>
    </html>
  `);
});

// Route that targets the contacts controller logic
router.use("/contacts", require("./contacts"));
module.exports = router;
