import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsShowcase from '../components/SkillsShowcase';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <HeroSection />
      <AboutSection />
      <SkillsShowcase />
      <Footer />
    </motion.div>
  );
};

export default Home;
