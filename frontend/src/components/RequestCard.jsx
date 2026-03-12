import { motion } from 'framer-motion';
import { HiCheck, HiX, HiClock, HiArrowRight } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';

const statusConfig = {
  pending: { color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: HiClock, label: 'Pending' },
  accepted: { color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: HiCheck, label: 'Accepted' },
  rejected: { color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20', icon: HiX, label: 'Rejected' },
};

const RequestCard = ({ request, onAccept, onReject, loading }) => {
  const { user } = useAuth();
  const isSender = request.sender?._id === user?._id;
  const otherUser = isSender ? request.receiver : request.sender;
  const config = statusConfig[request.status];
  const StatusIcon = config.icon;
  const initials = otherUser?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || '?';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      className="glass-card p-5 rounded-2xl"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold shadow-md">
            {initials}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">{otherUser?.name}</h4>
            <span className="text-xs text-gray-500 dark:text-dark-200">{isSender ? 'You sent' : 'Received'}</span>
          </div>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color} border ${config.border}`}>
          <StatusIcon className="w-3.5 h-3.5" />
          {config.label}
        </div>
      </div>

      {/* Skill exchange */}
      <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-dark-600 mb-4">
        <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
          {request.skillOffered}
        </span>
        <HiArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
        <span className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium">
          {request.skillRequested}
        </span>
      </div>

      {/* Actions */}
      {!isSender && request.status === 'pending' && (
        <div className="flex gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onAccept(request._id)}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <HiCheck className="w-4 h-4" />
            Accept
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onReject(request._id)}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-500 hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-600 dark:text-dark-100 hover:text-red-500 text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <HiX className="w-4 h-4" />
            Decline
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

export default RequestCard;
