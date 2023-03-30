const { removeContact } = require('../models/contacts');

const deleteContact = async (req, res, next) => {
    const { contactId } = req.params;
    const data = await removeContact(contactId);
    return data
    ? res.status(200).json(`Contact by ID ${contactId}: deleted`)
    : res.status(404).json({ message: `${contactId} not found` });
};

module.exports = {
deleteContact,
};