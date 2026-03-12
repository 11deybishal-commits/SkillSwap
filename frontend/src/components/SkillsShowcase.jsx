import { motion } from 'framer-motion';
import { HiCode, HiColorSwatch, HiCamera, HiMusicNote, HiPencil, HiCube, HiChartBar, HiGlobe, HiDesktopComputer, HiFilm, HiDatabase, HiShieldCheck } from 'react-icons/hi';

const skills = [
  { name: 'Web Development', icon: HiCode, color: 'from-blue-500 to-cyan-500' },
  { name: 'UI/UX Design', icon: HiColorSwatch, color: 'from-pink-500 to-rose-500' },
  { name: 'Photography', icon: HiCamera, color: 'from-amber-500 to-orange-500' },
  { name: 'Music Production', icon: HiMusicNote, color: 'from-purple-500 to-violet-500' },
  { name: 'Content Writing', icon: HiPencil, color: 'from-green-500 to-emerald-500' },
  { name: '3D Modeling', icon: HiCube, color: 'from-indigo-500 to-blue-500' },
  { name: 'Data Science', icon: HiChartBar, color: 'from-teal-500 to-cyan-500' },
  { name: 'Digital Marketing', icon: HiGlobe, color: 'from-red-500 to-pink-500' },
  { name: 'App Development', icon: HiDesktopComputer, color: 'from-sky-500 to-blue-500' },
  { name: 'Video Editing', icon: HiFilm, color: 'from-yellow-500 to-amber-500' },
  { name: 'Database Admin', icon: HiDatabase, color: 'from-emerald-500 to-green-500' },
  { name: 'Cybersecurity', icon: HiShieldCheck, color: 'from-slate-500 to-gray-700' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const SkillsShowcase = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent-500/5 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent-500/10 text-accent-600 dark:text-accent-400 text-sm font-medium mb-4">
            Popular Skills
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Discover <span className="gradient-text">What to Learn</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-dark-100 max-w-2xl mx-auto">
            Browse trending skills that people are exchanging on SkillSwap right now.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.03 }}
              className="glass-card p-6 rounded-2xl text-center group cursor-default"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.color} mx-auto mb-4 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300`}>
                <skill.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white">{skill.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsShowcase;
