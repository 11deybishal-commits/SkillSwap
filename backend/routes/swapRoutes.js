const express = require('express');
const router = express.Router();
const { sendRequest, getRequests, updateRequestStatus } = require('../controllers/swapController');
const { protect } = require('../middleware/auth');

router.post('/', protect, sendRequest);
router.get('/', protect, getRequests);
router.put('/:id', protect, updateRequestStatus);

module.exports = router;
