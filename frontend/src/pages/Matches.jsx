import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import UserProfileCard from '../components/UserProfileCard';
import LoadingSpinner from '../components/LoadingSpinner';
import api from '../utils/api';
import { HiLightningBolt, HiSearch, HiExclamationCircle } from 'react-icons/hi';

const Matches = () => {
  const { user } = useAuth();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sendingTo, setSendingTo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [skillOffered, setSkillOffered] = useState('');
  const [skillRequested, setSkillRequested] = useState('');
  const [sendError, setSendError] = useState('');
  const [sendSuccess, setSendSuccess] = useState('');

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const res = await api.get('/users/matches');
      setMatches(res.data);
    } catch (error) {
      console.error('Failed to fetch matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const openSwapModal = (matchUser) => {
    setSelectedUser(matchUser);
    setSkillOffered('');
    setSkillRequested('');
    setSendError('');
    setSendSuccess('');
    setShowModal(true);
  };

  const handleSendRequest = async () => {
    if (!skillOffered || !skillRequested) {
      setSendError('Please select both skills');
      return;
    }

    setSendingTo(selectedUser._id);
    setSendError('');
    try {
      await api.post('/swaps', {
        receiver: selectedUser._id,
        skillOffered,
        skillRequested
      });
      setSendSuccess('Swap request sent!');
      setTimeout(() => {
        setShowModal(false);
        setSendSuccess('');
      }, 1500);
    } catch (error) {
      setSendError(error.response?.data?.message || 'Failed to send request');
    } finally {
      setSendingTo(null);
    }
  };

  const filteredMatches = matches.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.skillsHave?.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <LoadingSpinner size="lg" text="Finding your matches..." />
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 pb-24 lg:pb-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          <Sidebar />

          <main className="flex-1 min-w-0">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <HiLightningBolt className="w-7 h-7 text-primary-500" />
                Your Matches
              </h1>
              <p className="text-gray-500 dark:text-dark-200">
                People who have skills you want. Send them a swap request!
              </p>
            </motion.div>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              <div className="relative">
                <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or skill..."
                  className="input-field !pl-12"
                />
              </div>
            </motion.div>

            {/* Matches Grid */}
            {filteredMatches.length > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredMatches.map((match, index) => (
                  <motion.div
                    key={match._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <UserProfileCard
                      user={match}
                      onConnect={openSwapModal}
                      loading={sendingTo === match._id}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="glass-card p-12 rounded-2xl text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {searchQuery ? 'No matching users found' : 'No matches yet'}
                </h3>
                <p className="text-gray-500 dark:text-dark-200">
                  {searchQuery
                    ? 'Try a different search term'
                    : 'Add more skills to your profile to find matches!'}
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Swap Request Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md glass-card p-6 rounded-3xl"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Send Swap Request</h3>
              <p className="text-sm text-gray-500 dark:text-dark-200 mb-6">
                to <span className="font-semibold text-primary-500">{selectedUser?.name}</span>
              </p>

              {sendError && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm mb-4">
                  <HiExclamationCircle className="w-4 h-4" />
                  {sendError}
                </div>
              )}

              {sendSuccess && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm mb-4">
                  ✅ {sendSuccess}
                </div>
              )}

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-50 mb-1.5">I'll teach</label>
                  <select
                    value={skillOffered}
                    onChange={(e) => setSkillOffered(e.target.value)}
                    className="input-field"
                  >
                    <option value="">Select a skill you can offer...</option>
                    {user?.skillsHave?.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-50 mb-1.5">I want to learn</label>
                  <select
                    value={skillRequested}
                    onChange={(e) => setSkillRequested(e.target.value)}
                    className="input-field"
                  >
                    <option value="">Select a skill you want...</option>
                    {selectedUser?.skillsHave?.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-dark-400 text-gray-600 dark:text-dark-100 font-semibold hover:bg-gray-50 dark:hover:bg-dark-500 transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendRequest}
                  disabled={sendingTo}
                  className="flex-1 gradient-btn !py-3 disabled:opacity-50"
                >
                  {sendingTo ? 'Sending...' : 'Send Request'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Matches;
