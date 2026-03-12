import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiSparkles } from 'react-icons/hi';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(92,124,250,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(92,124,250,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-600 dark:text-primary-400 text-sm font-medium mb-6"
            >
              <HiSparkles className="w-4 h-4" />
              <span>The future of learning is here</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] text-gray-900 dark:text-white mb-6"
            >
              Swap Skills,{' '}
              <span className="gradient-text">Grow Together</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg sm:text-xl text-gray-600 dark:text-dark-100 mb-8 max-w-lg leading-relaxed"
            >
              Connect with passionate people, exchange your expertise, and learn 
              new skills — all for free. Your knowledge is your currency.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(92,124,250,0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="gradient-btn text-lg px-8 py-4 flex items-center gap-2"
                >
                  Get Started Free
                  <HiArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl text-lg font-semibold border-2 border-gray-200 dark:border-dark-400 text-gray-700 dark:text-dark-50 hover:border-primary-500 dark:hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300"
                >
                  Sign In
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex gap-8 mt-12 pt-8 border-t border-gray-200/50 dark:border-dark-400/50"
            >
              {[
                { value: '10K+', label: 'Active Users' },
                { value: '500+', label: 'Skills Listed' },
                { value: '2K+', label: 'Swaps Made' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-gray-500 dark:text-dark-200">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="glass-card p-8 rounded-3xl"
              >
                <div className="space-y-6">
                  {/* User exchange illustration */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-center flex-1">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold shadow-lg">A</div>
                      <div className="text-sm font-semibold text-gray-800 dark:text-white">Alex</div>
                      <div className="text-xs text-gray-500 dark:text-dark-200">Knows React</div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-2xl"
                      >⇄</motion.div>
                      <span className="text-xs font-medium text-primary-500">Swap!</span>
                    </div>
                    <div className="text-center flex-1">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400 to-pink-600 mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold shadow-lg">B</div>
                      <div className="text-sm font-semibold text-gray-800 dark:text-white">Beth</div>
                      <div className="text-xs text-gray-500 dark:text-dark-200">Knows Design</div>
                    </div>
                  </div>
                  
                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['React', 'Python', 'UI/UX', 'Node.js', 'Figma', 'DevOps'].map((skill) => (
                      <span key={skill} className="px-3 py-1.5 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Floating cards */}
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-6 glass-card p-4 rounded-2xl"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <div className="text-xs font-semibold text-gray-800 dark:text-white">New Match!</div>
                    <div className="text-[10px] text-gray-500 dark:text-dark-200">3 skills matched</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0], rotate: [0, -2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -left-6 glass-card p-4 rounded-2xl"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✅</span>
                  <div>
                    <div className="text-xs font-semibold text-gray-800 dark:text-white">Swap Complete</div>
                    <div className="text-[10px] text-gray-500 dark:text-dark-200">React ↔ Photoshop</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
