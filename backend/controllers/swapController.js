const SwapRequest = require('../models/SwapRequest');

// @desc    Send a swap request
// @route   POST /api/swaps
// @access  Private
const sendRequest = async (req, res) => {
  try {
    const { receiver, skillOffered, skillRequested, message } = req.body;

    // Check if request already exists
    const existingRequest = await SwapRequest.findOne({
      sender: req.user._id,
      receiver,
      status: 'pending'
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'You already have a pending request to this user' });
    }

    const swapRequest = await SwapRequest.create({
      sender: req.user._id,
      receiver,
      skillOffered,
      skillRequested,
      message
    });

    const populatedRequest = await SwapRequest.findById(swapRequest._id)
      .populate('sender', 'name email avatar skillsHave')
      .populate('receiver', 'name email avatar skillsHave');

    res.status(201).json(populatedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all requests for current user (sent & received)
// @route   GET /api/swaps
// @access  Private
const getRequests = async (req, res) => {
  try {
    const requests = await SwapRequest.find({
      $or: [
        { sender: req.user._id },
        { receiver: req.user._id }
      ]
    })
      .populate('sender', 'name email avatar skillsHave')
      .populate('receiver', 'name email avatar skillsHave')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update request status (accept/reject)
// @route   PUT /api/swaps/:id
// @access  Private
const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const swapRequest = await SwapRequest.findById(req.params.id);

    if (!swapRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Only receiver can accept/reject
    if (swapRequest.receiver.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this request' });
    }

    swapRequest.status = status;
    const updatedRequest = await swapRequest.save();

    const populatedRequest = await SwapRequest.findById(updatedRequest._id)
      .populate('sender', 'name email avatar skillsHave')
      .populate('receiver', 'name email avatar skillsHave');

    res.json(populatedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { sendRequest, getRequests, updateRequestStatus };
