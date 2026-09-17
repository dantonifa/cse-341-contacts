const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contacts");

// Route to get all contacts
router.get("/", contactsController.getAll);

// Route to get a single contact by ID
router.get("/:id", contactsController.getSingle);

// Route to create a new contact
router.post("/", contactsController.createContact);

// Route to update a contact by ID
router.put("/:id", contactsController.updateContact);

// Route to delete a contact by ID
router.delete("/:id", contactsController.deleteContact);

module.exports = router;
