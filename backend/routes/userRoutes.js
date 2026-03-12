const express = require('express');
const router = express.Router();
const { updateProfile, getUsers, getMatches, getUserById } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.put('/profile', protect, updateProfile);
router.get('/matches', protect, getMatches);
router.get('/:id', protect, getUserById);
router.get('/', protect, getUsers);

module.exports = router;
