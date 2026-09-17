const mongodb = require("../config/connect"); // Make sure this path points correctly to your database file
const ObjectId = require("mongodb").ObjectId;

// GET all contacts
const getAll = async (req, res) => {
  try {
    // getDb() returns the database instance directly, so .db() is no longer needed
    const result = await mongodb.getDb().collection("contacts").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET a single contact by ID
const getSingle = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    // query the database directly using the verified object ID
    const result = await mongodb
      .getDb()
      .collection("contacts")
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]); // Returns only the specific object instead of an array
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
};
