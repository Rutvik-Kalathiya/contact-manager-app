//@desc Get all contacts
//@route GET /api/contacts
//@access Public
const getContacts = (req, res) => {
    res.status(200).json({message: "Get all Contacts"});
}

//@desc Create New contact
//@route POST /api/contact/
//@access Public
const createContacts = (req, res) => {
    res.status(201).json({message: "Create Contact"});
}

//@desc GET New contact
//@route GET /api/contacts/:id
//@access Public
const getContact = (req, res) => {
    res.status(200).json({message: `GET Contacts for ${req.params.id} `});
}

//@desc Update contact
//@route PUT /api/contacts/:id
//@access Public
const updateContact = (req, res) => {
    res.status(200).json({message: `Update Contacts for ${req.params.id} `});
}

//@desc Delete all contact
//@route DELETE /api/contacts/:id
//@access Public
const deleteContact = (req, res) => {
    res.status(200).json({message: `Delete Contacts for ${req.params.id} `});
}

module.exports = { getContacts , createContacts, getContact, updateContact, deleteContact};