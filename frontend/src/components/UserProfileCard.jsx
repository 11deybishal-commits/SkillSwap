import { motion } from 'framer-motion';
import { HiLocationMarker, HiChat } from 'react-icons/hi';

const UserProfileCard = ({ user, onConnect, loading }) => {
  const initials = user.name?.split(' ').map(n => n[0]).join('').toUpperCase() || '?';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="glass-card p-6 rounded-2xl group"
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 via-purple-500 to-accent-500 flex items-center justify-center text-white text-xl font-bold shadow-lg flex-shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">{user.name}</h3>
          {user.location && (
            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-dark-200">
              <HiLocationMarker className="w-4 h-4" />
              <span>{user.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Bio */}
      {user.bio && (
        <p className="text-sm text-gray-600 dark:text-dark-100 mb-4 line-clamp-2">{user.bio}</p>
      )}

      {/* Skills Have */}
      {user.skillsHave?.length > 0 && (
        <div className="mb-3">
          <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">Can Teach</div>
          <div className="flex flex-wrap gap-1.5">
            {user.skillsHave.slice(0, 4).map((skill) => (
              <span key={skill} className="px-2.5 py-1 text-xs rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                {skill}
              </span>
            ))}
            {user.skillsHave.length > 4 && (
              <span className="px-2.5 py-1 text-xs rounded-lg bg-gray-100 dark:bg-dark-500 text-gray-500 dark:text-dark-200 font-medium">
                +{user.skillsHave.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Skills Want */}
      {user.skillsWant?.length > 0 && (
        <div className="mb-4">
          <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Wants to Learn</div>
          <div className="flex flex-wrap gap-1.5">
            {user.skillsWant.slice(0, 4).map((skill) => (
              <span key={skill} className="px-2.5 py-1 text-xs rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium">
                {skill}
              </span>
            ))}
            {user.skillsWant.length > 4 && (
              <span className="px-2.5 py-1 text-xs rounded-lg bg-gray-100 dark:bg-dark-500 text-gray-500 dark:text-dark-200 font-medium">
                +{user.skillsWant.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Connect Button */}
      {onConnect && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onConnect(user)}
          disabled={loading}
          className="w-full gradient-btn flex items-center justify-center gap-2 !py-2.5 text-sm disabled:opacity-50"
        >
          <HiChat className="w-4 h-4" />
          <span>{loading ? 'Sending...' : 'Send Swap Request'}</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default UserProfileCard;
