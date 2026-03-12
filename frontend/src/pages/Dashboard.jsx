import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import RequestCard from '../components/RequestCard';
import LoadingSpinner from '../components/LoadingSpinner';
import api from '../utils/api';
import { HiLightningBolt, HiInbox, HiCheckCircle, HiClock, HiTrendingUp } from 'react-icons/hi';

const Dashboard = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [reqRes, matchRes] = await Promise.all([
        api.get('/swaps'),
        api.get('/users/matches')
      ]);
      setRequests(reqRes.data);
      setMatches(matchRes.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id) => {
    setActionLoading(true);
    try {
      await api.put(`/swaps/${id}`, { status: 'accepted' });
      fetchData();
    } catch (error) {
      console.error('Failed to accept:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (id) => {
    setActionLoading(true);
    try {
      await api.put(`/swaps/${id}`, { status: 'rejected' });
      fetchData();
    } catch (error) {
      console.error('Failed to reject:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const stats = [
    { label: 'Matches', value: matches.length, icon: HiLightningBolt, color: 'from-blue-500 to-cyan-500' },
    { label: 'Pending', value: requests.filter(r => r.status === 'pending').length, icon: HiClock, color: 'from-amber-500 to-orange-500' },
    { label: 'Accepted', value: requests.filter(r => r.status === 'accepted').length, icon: HiCheckCircle, color: 'from-emerald-500 to-green-500' },
    { label: 'Total Requests', value: requests.length, icon: HiInbox, color: 'from-purple-500 to-pink-500' },
  ];

  if (loading) return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <LoadingSpinner size="lg" text="Loading dashboard..." />
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
            {/* Welcome */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0]}</span> 👋
              </h1>
              <p className="text-gray-500 dark:text-dark-200">Here's what's happening with your skill exchanges.</p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -3 }}
                  className="glass-card p-5 rounded-2xl"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 shadow-md`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-sm text-gray-500 dark:text-dark-200">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Recent Requests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <HiInbox className="w-5 h-5 text-primary-500" />
                  Recent Requests
                </h2>
              </div>

              {requests.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {requests.slice(0, 6).map((request) => (
                    <RequestCard
                      key={request._id}
                      request={request}
                      onAccept={handleAccept}
                      onReject={handleReject}
                      loading={actionLoading}
                    />
                  ))}
                </div>
              ) : (
                <div className="glass-card p-12 rounded-2xl text-center">
                  <div className="text-4xl mb-4">📭</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No requests yet</h3>
                  <p className="text-gray-500 dark:text-dark-200">Head to the Matches page to find people and send swap requests!</p>
                </div>
              )}
            </motion.div>
          </main>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
