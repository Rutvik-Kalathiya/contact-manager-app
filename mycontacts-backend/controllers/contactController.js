const asyncHandler = require('express-async-handler');

//@desc Get all contacts
//@route GET /api/contacts
//@access Public
const getContacts = asyncHandler(async(req, res) => {
    res.status(200).json({message: "Get all Contacts"});
});

//@desc Create New contact
//@route POST /api/contact/
//@access Public
const createContacts = asyncHandler(async(req, res) => {
    console.log("The request body is :",req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are required");
    }
    res.status(201).json({message: "Create Contact"});
});

//@desc GET New contact
//@route GET /api/contacts/:id
//@access Public
const getContact = asyncHandler(async(req, res) => {
    res.status(200).json({message: `GET Contacts for ${req.params.id} `});
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access Public
const updateContact = asyncHandler(async(req, res) => {
    res.status(200).json({message: `Update Contacts for ${req.params.id} `});
});

//@desc Delete all contact
//@route DELETE /api/contacts/:id
//@access Public
const deleteContact = asyncHandler(async(req, res) => {
    res.status(200).json({message: `Delete Contacts for ${req.params.id} `});
});

module.exports = { getContacts , createContacts, getContact, updateContact, deleteContact};