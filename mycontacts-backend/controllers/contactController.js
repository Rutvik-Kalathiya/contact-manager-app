const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

//@desc Get all contacts
//@route GET /api/contacts
//@access Public
const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({ user: req.user._id});
    res.status(200).json(contacts);
});

//@desc Create New contact
//@route POST /api/contact/
//@access private
const createContacts = asyncHandler(async(req, res) => {
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are required");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user: req.user._id
    })
    res.status(201).json(contact);
});

//@desc GET New contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async(req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        res.status(200).json(contact);
    } catch(e) {
        res.status(404);
        throw new Error("Contact not found");
    }
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async(req, res) => {
    try{
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedContact);
    }
    catch(e){
        res.status(404);
        throw new Error("Contact not found");
    }
});

//@desc Delete all contact
//@route DELETE /api/contacts/:id
//@access Public
const deleteContact = asyncHandler(async(req, res) => {
    try{
        const contact = await Contact.findById(req.params.id);
        await Contact.deleteOne();
        res.status(200).json(contact);
    }
    catch(e){
        res.status(404);
        throw new Error("Contact not found");
    }
});

module.exports = { getContacts , createContacts, getContact, updateContact, deleteContact};