const User = require('../models/User');

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { name, bio, location, skillsHave, skillsWant, avatar } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.bio = bio !== undefined ? bio : user.bio;
    user.location = location !== undefined ? location : user.location;
    user.skillsHave = skillsHave || user.skillsHave;
    user.skillsWant = skillsWant || user.skillsWant;
    user.avatar = avatar || user.avatar;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all users (excluding current user)
// @route   GET /api/users
// @access  Private
const getUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get matched users (users whose skillsHave match current user's skillsWant)
// @route   GET /api/users/matches
// @access  Private
const getMatches = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    
    if (!currentUser.skillsWant || currentUser.skillsWant.length === 0) {
      return res.json([]);
    }

    // Find users who have skills that the current user wants
    const matches = await User.find({
      _id: { $ne: req.user._id },
      skillsHave: { $in: currentUser.skillsWant.map(s => new RegExp(s, 'i')) }
    });

    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateProfile, getUsers, getMatches, getUserById };
