const express = require('express');
const router = express.Router();
const {
  createContact,
  getContacts,
  updateContact,
  deleteContact,
} = require('../controllers/contact.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.use(verifyToken);

router.post('/', createContact);
router.get('/', getContacts);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

module.exports = router;