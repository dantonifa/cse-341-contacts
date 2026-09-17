const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

let _db;

const initDb = (callback) => {
  // 1. Return the database instance immediately if it is already open
  if (_db) {
    console.log("Database is already initialized!");
    return callback(null, _db);
  }

  // 2. Guard clause to ensure the connection string is present
  if (!process.env.MONGODB_URI) {
    return callback(
      new Error("MONGODB_URI is not defined in the environment variables."),
    );
  }

  // 3. Establish connection to MongoDB Atlas with structural scope containment
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
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
