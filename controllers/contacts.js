const mongodb = require("../config/connect"); // Make sure this path points correctly to your database file
const { ObjectId } = require("mongodb");

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
    const userId = ObjectId.createFromHexString(req.params.id);
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
// POST a new contact
const createContact = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };
    const response = await mongodb
      .getDb()
      .collection("contacts")
      .insertOne(contact);
    if (response.acknowledged) {
      res.status(201).json({ id: response.insertedId });
    } else {
      res
        .status(500)
        .json({ message: "Some error occurred while creating the contact." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT (update) an existing contact
const updateContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };
    const response = await mongodb
      .getDb()
      .collection("contacts")
      .replaceOne({ _id: userId }, contact);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json({ message: "Some error occurred while updating the contact." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE a contact
const deleteContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .collection("contacts")
      .deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json({ message: "Some error occurred while deleting the contact." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DON'T FORGET to add them to your module.exports at the bottom:
module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};
