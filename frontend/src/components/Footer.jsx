import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaTwitter, FaLinkedin, FaHeart } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';

const footerLinks = {
  Product: [
    { name: 'Features', href: '/#features' },
    { name: 'How It Works', href: '/#about' },
    { name: 'Pricing', href: '/#' },
  ],
  Company: [
    { name: 'About Us', href: '/#' },
    { name: 'Blog', href: '/#' },
    { name: 'Careers', href: '/#' },
  ],
  Support: [
    { name: 'Help Center', href: '/#' },
    { name: 'Privacy', href: '/#' },
    { name: 'Terms', href: '/#' },
  ],
};

const socialLinks = [
  { icon: FaGithub, href: '#', label: 'GitHub' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
  { icon: HiMail, href: '#', label: 'Email' },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-gray-200/50 dark:border-dark-400/30">
      <div className="absolute inset-0 bg-gray-50/80 dark:bg-dark-800/80" />
      <div className="absolute top-0 left-1/4 w-[400px] h-[200px] bg-primary-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 via-purple-500 to-accent-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold gradient-text">SkillSwap</span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-dark-100 max-w-xs leading-relaxed mb-6">
              The community where knowledge is currency. Exchange skills, grow together, and build meaningful connections.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-dark-500 flex items-center justify-center text-gray-500 dark:text-dark-200 hover:bg-primary-500/10 hover:text-primary-500 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-sm text-gray-500 dark:text-dark-200 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-200/50 dark:border-dark-400/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-dark-200">
            © {new Date().getFullYear()} SkillSwap. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 dark:text-dark-200 flex items-center gap-1">
            Made with <FaHeart className="w-3 h-3 text-red-500" /> by the community
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
