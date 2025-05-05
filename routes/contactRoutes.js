const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/', contactController.createContacts)
router.get('/', contactController.getAllContacts)
router.put('/:id', contactController.updateContact)
router.delete('/:id', contactController.deleteContacts)

module.exports = router;
