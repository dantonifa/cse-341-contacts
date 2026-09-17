const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

let _db;

const initDb = (callback) => {
  // Return the database instance immediately if it is already open
  if (_db) {
    console.log("Database is already initialized!");
    return callback(null, _db);
  }

  // Guard clause to ensure the connection string is present
  if (!process.env.MONGODB_URI) {
    return callback(
      new Error("MONGODB_URI is not defined in the environment variables."),
    );
  }

  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      // FORCE FIX: Hardcode the database name as a clean string to bypass URL parsing issues
      _db = client.db("cse-341-contacts");
      console.log(
        "Database initialized successfully pointing to: cse-341-contacts",
      );
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error("Database not initialized");
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};
