import { motion } from 'framer-motion';
import { HiUserAdd, HiLightningBolt, HiAcademicCap } from 'react-icons/hi';

const steps = [
  {
    icon: HiUserAdd,
    title: 'List Your Skills',
    description: 'Sign up and add skills you know and skills you want to learn. It takes less than 2 minutes.',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: HiLightningBolt,
    title: 'Get Matched',
    description: 'Our smart matching finds people with complementary skills. Someone out there wants what you know!',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    icon: HiAcademicCap,
    title: 'Exchange & Grow',
    description: 'Connect, learn from each other, and grow together. Knowledge shared is knowledge multiplied.',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/10',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const AboutSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gray-50/50 dark:bg-dark-800/50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Three Simple <span className="gradient-text">Steps</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-dark-100 max-w-2xl mx-auto">
            Start exchanging skills in minutes. No money involved, just pure knowledge trading.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-3 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="glass-card p-8 rounded-3xl text-center group cursor-default"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-sm font-bold text-primary-500 mb-2">Step {index + 1}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
              <p className="text-gray-600 dark:text-dark-100 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
