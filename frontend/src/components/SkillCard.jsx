import { motion } from 'framer-motion';
import { HiX } from 'react-icons/hi';

const SkillCard = ({ skill, type, onRemove, onAdd }) => {
  const isHave = type === 'have';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
        isHave
          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
          : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
      }`}
    >
      <span>{skill}</span>
      {onRemove && (
        <button
          onClick={() => onRemove(skill)}
          className={`p-0.5 rounded-md hover:bg-white/50 dark:hover:bg-dark-500/50 transition-colors ${
            isHave ? 'hover:text-emerald-700' : 'hover:text-blue-700'
          }`}
        >
          <HiX className="w-3.5 h-3.5" />
        </button>
      )}
    </motion.div>
  );
};

export default SkillCard;
