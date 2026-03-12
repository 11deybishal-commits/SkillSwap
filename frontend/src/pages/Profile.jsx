import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import SkillCard from '../components/SkillCard';
import api from '../utils/api';
import { HiPlus, HiSave, HiLocationMarker, HiPencil, HiCheckCircle } from 'react-icons/hi';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [location, setLocation] = useState(user?.location || '');
  const [skillsHave, setSkillsHave] = useState(user?.skillsHave || []);
  const [skillsWant, setSkillsWant] = useState(user?.skillsWant || []);
  const [newSkillHave, setNewSkillHave] = useState('');
  const [newSkillWant, setNewSkillWant] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const addSkill = (type) => {
    if (type === 'have' && newSkillHave.trim()) {
      if (!skillsHave.includes(newSkillHave.trim())) {
        setSkillsHave([...skillsHave, newSkillHave.trim()]);
      }
      setNewSkillHave('');
    } else if (type === 'want' && newSkillWant.trim()) {
      if (!skillsWant.includes(newSkillWant.trim())) {
        setSkillsWant([...skillsWant, newSkillWant.trim()]);
      }
      setNewSkillWant('');
    }
  };

  const removeSkill = (type, skill) => {
    if (type === 'have') {
      setSkillsHave(skillsHave.filter(s => s !== skill));
    } else {
      setSkillsWant(skillsWant.filter(s => s !== skill));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await api.put('/users/profile', { name, bio, location, skillsHave, skillsWant });
      updateUser(res.data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Failed to save:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleKeyPress = (e, type) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(type);
    }
  };

  const initials = name?.split(' ').map(n => n[0]).join('').toUpperCase() || '?';

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

          <main className="flex-1 min-w-0 max-w-3xl">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <HiPencil className="w-7 h-7 text-primary-500" />
                Edit Profile
              </h1>
              <p className="text-gray-500 dark:text-dark-200">Update your profile and skills to get better matches.</p>
            </motion.div>

            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6 sm:p-8 rounded-3xl mb-6"
            >
              {/* Avatar + Basic Info */}
              <div className="flex items-center gap-5 mb-8">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 via-purple-500 to-accent-500 flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                  {initials}
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field text-lg font-semibold mb-2"
                    placeholder="Your name"
                  />
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-dark-200">
                    <HiLocationMarker className="w-4 h-4" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="bg-transparent border-none outline-none text-gray-600 dark:text-dark-100 placeholder-gray-400"
                      placeholder="Your city or country"
                    />
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 dark:text-dark-50 mb-2">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="input-field resize-none"
                  placeholder="Tell others about yourself and what you're passionate about..."
                  maxLength={500}
                />
                <div className="text-right text-xs text-gray-400 mt-1">{bio.length}/500</div>
              </div>

              {/* Skills I Have */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-3 uppercase tracking-wider">
                  Skills I Can Teach
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  <AnimatePresence>
                    {skillsHave.map((skill) => (
                      <SkillCard key={skill} skill={skill} type="have" onRemove={(s) => removeSkill('have', s)} />
                    ))}
                  </AnimatePresence>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkillHave}
                    onChange={(e) => setNewSkillHave(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, 'have')}
                    placeholder="e.g. React, Python, Guitar..."
                    className="input-field flex-1"
                  />
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addSkill('have')}
                    className="p-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white transition-colors shadow-md"
                  >
                    <HiPlus className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Skills I Want */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3 uppercase tracking-wider">
                  Skills I Want to Learn
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  <AnimatePresence>
                    {skillsWant.map((skill) => (
                      <SkillCard key={skill} skill={skill} type="want" onRemove={(s) => removeSkill('want', s)} />
                    ))}
                  </AnimatePresence>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkillWant}
                    onChange={(e) => setNewSkillWant(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, 'want')}
                    placeholder="e.g. UI/UX Design, Photography..."
                    className="input-field flex-1"
                  />
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addSkill('want')}
                    className="p-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition-colors shadow-md"
                  >
                    <HiPlus className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Save Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                disabled={saving}
                className="w-full gradient-btn flex items-center justify-center gap-2 !py-3.5 text-base disabled:opacity-50"
              >
                {saving ? (
                  <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : saved ? (
                  <>
                    <HiCheckCircle className="w-5 h-5" />
                    Saved Successfully!
                  </>
                ) : (
                  <>
                    <HiSave className="w-5 h-5" />
                    Save Profile
                  </>
                )}
              </motion.button>
            </motion.div>
          </main>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
