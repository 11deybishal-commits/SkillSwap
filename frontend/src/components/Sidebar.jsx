import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiViewGrid, HiUser, HiLightningBolt, HiInbox, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { useState } from 'react';

const links = [
  { name: 'Dashboard', path: '/dashboard', icon: HiViewGrid },
  { name: 'Profile', path: '/profile', icon: HiUser },
  { name: 'Matches', path: '/matches', icon: HiLightningBolt },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`hidden lg:flex flex-col sticky top-20 h-[calc(100vh-5rem)] ${collapsed ? 'w-20' : 'w-64'} transition-all duration-300`}
      >
        <div className="glass-card rounded-2xl p-4 flex flex-col h-full">
          {/* Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="self-end p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-500 text-gray-400 dark:text-dark-200 mb-4 transition-colors"
          >
            {collapsed ? <HiChevronRight className="w-4 h-4" /> : <HiChevronLeft className="w-4 h-4" />}
          </button>

          {/* Nav Links */}
          <nav className="flex flex-col gap-1 flex-1">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={`sidebar-link ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-3' : ''}`}
                  title={collapsed ? link.name : ''}
                >
                  <link.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-primary-500' : ''}`} />
                  {!collapsed && <span>{link.name}</span>}
                </NavLink>
              );
            })}
          </nav>

          {/* Bottom info */}
          {!collapsed && (
            <div className="mt-auto pt-4 border-t border-gray-200/50 dark:border-dark-400/50">
              <div className="px-4 py-3 rounded-xl bg-primary-500/5 dark:bg-primary-500/10">
                <p className="text-xs text-gray-500 dark:text-dark-200">
                  💡 <span className="font-medium text-primary-600 dark:text-primary-400">Tip:</span> Add more skills to get better matches!
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.aside>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass border-t border-white/10 dark:border-dark-400/30">
        <div className="flex items-center justify-around py-2 px-4">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                  isActive ? 'text-primary-500' : 'text-gray-400 dark:text-dark-200'
                }`}
              >
                <link.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{link.name}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
