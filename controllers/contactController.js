const Contact = require('../models/Contact');


exports.createContacts = async (req, res) => {
    console.log(req.body);
    try {
        const contact = await new Contact({
            name: req.body.name, 
            phone: req.body.phone, 
            email: req.body.email, 
            category: req.body.category
        });
        contact.save();
        res.status(201).json(contact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllContacts = async (req, res) => {
    try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const contacts = await Contact.find().skip(skip).limit(limit);
    const total = await Contact.countDocuments();

    res.status(200).json({
        total,
        page,
        limit,
        totalPage: Math.ceil(total / limit),
        contacts
    });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateContact = async (req, res) => {
    try {
        const { name, phone, email, category } = req.body;
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { name, phone, email, category },
            { new: true }
        );
        if (!contact) return res.status(404).json({ message: 'Contact not found' });
        res.status(200).json(contact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteContacts = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) return res.status(404).json({ message: 'Contact not found' });
        res.status(200).json({ message: 'Contact deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
