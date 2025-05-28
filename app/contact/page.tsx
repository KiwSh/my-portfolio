// File: app/contact/page.tsx
'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import Navbar from '@/components/Navbar';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef(null);
  const isFormInView = useInView(formRef, { once: true });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitted(true);
    setIsLoading(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
      },
    },
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: 'Email',
      info: 'rifqi@example.com',
      link: 'mailto:rifqi@example.com',
      color: 'text-red-500'
    },
    {
      icon: FaPhone,
      title: 'Phone',
      info: '+62 812-3456-7890',
      link: 'tel:+6281234567890',
      color: 'text-green-500'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Location',
      info: 'Jakarta, Indonesia',
      link: 'https://maps.google.com',
      color: 'text-blue-500'
    }
  ];

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/', color: 'hover:text-gray-800' },
    { icon: FaLinkedin, href: 'https://linkedin.com/', color: 'hover:text-blue-600' },
    { icon: FaTwitter, href: 'https://twitter.com/', color: 'hover:text-blue-400' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 overflow-x-hidden">
      <Navbar />

      {/* Background animated shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-xl"
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <motion.section
        className="pt-32 pb-16 px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', bounce: 0.4 }}
          >
            <span className="text-gray-800 dark:text-white">Let's </span>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Connect
            </span>
          </motion.h1>
          
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Punya ide project menarik atau ingin berkolaborasi? Saya siap mendengar dan membantu mewujudkan visi digital Anda!
          </motion.p>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            ref={formRef}
            variants={containerVariants}
            initial="hidden"
            animate={isFormInView ? "visible" : "hidden"}
            className="relative"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-purple-200/50 dark:border-purple-800/50"
            >
              <motion.h2
                variants={itemVariants}
                className="text-3xl font-bold text-gray-800 dark:text-white mb-6"
              >
                Send Message 📨
              </motion.h2>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nama Lengkap
                    </label>
                    <motion.input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                      placeholder="Masukkan nama lengkap Anda"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <motion.input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                      placeholder="your.email@example.com"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject
                    </label>
                    <motion.input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                      placeholder="Topik pesan Anda"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <motion.textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Ceritakan tentang project atau ide Anda..."
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    variants={itemVariants}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <FaPaperPlane />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                    className="text-6xl text-green-500 mb-4"
                  >
                    <FaCheckCircle className="mx-auto" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    Message Sent! 🎉
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Terima kasih! Saya akan segera merespons pesan Anda.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isFormInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {/* Contact Information Cards */}
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Get In Touch 🤝
              </h2>
              <div className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <motion.a
                    key={index}
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={itemVariants}
                    className="block p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 group"
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        className={`p-3 rounded-full bg-gray-100 dark:bg-gray-700 ${contact.color} group-hover:scale-110 transition-transform`}
                        whileHover={{ rotate: 10 }}
                      >
                        <contact.icon size={24} />
                      </motion.div>
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white">
                          {contact.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {contact.info}
                        </p>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Follow Me 🌟
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 text-gray-600 dark:text-gray-300 ${social.color} transition-all duration-300`}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon size={24} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability Status */}
            <motion.div
              variants={itemVariants}
              className="p-6 bg-gradient-to-r from-green-400/20 to-blue-400/20 dark:from-green-600/20 dark:to-blue-600/20 backdrop-blur-sm rounded-2xl border border-green-200/50 dark:border-green-800/50"
            >
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 bg-green-500 rounded-full"
                />
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  Available for Projects
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Saat ini saya terbuka untuk project freelance dan kolaborasi menarik!
              </p>
            </motion.div>

            {/* Response Time */}
            <motion.div
              variants={itemVariants}
              className="p-6 bg-gradient-to-r from-purple-400/20 to-pink-400/20 dark:from-purple-600/20 dark:to-pink-600/20 backdrop-blur-sm rounded-2xl border border-purple-200/50 dark:border-purple-800/50"
            >
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                ⚡ Quick Response
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Biasanya saya merespons dalam 24 jam. Untuk urusan mendesak, hubungi via WhatsApp!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}