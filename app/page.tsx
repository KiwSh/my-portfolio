// File: app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown, FaCode, FaRocket, FaHeart } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useRef } from 'react';
import dynamic from 'next/dynamic';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15,
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

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };

    const AnimatedBackground = dynamic(() => import('@/components/AnimatedBackground'), {
    ssr: false,
    loading: () => <div className="fixed inset-0" />
  });


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />
      
      {/* Floating cursor effect */}
      <motion.div
        className="fixed w-6 h-6 bg-purple-500/30 rounded-full pointer-events-none z-40 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 500 }}
      />

      {/* Background animated shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-xl"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="min-h-screen flex items-center justify-center pt-20 px-4"
        style={{ y, opacity }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          {/* Profile Image with floating effect */}
          <motion.div
            variants={itemVariants}
            animate={floatingAnimation}
            className="mb-8 inline-block"
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-75"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              <Image
                src="/ripkiw.jpg"
                alt="Muhammad Rifqi Dwi Putra"
                width={200}
                height={200}
                className="relative rounded-full border-4 border-white dark:border-gray-800 shadow-2xl"
                priority
              />
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.div variants={itemVariants} className="mb-6">
            <motion.h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="block text-gray-800 dark:text-white">Halo, Saya</span>
              <motion.span
                className="block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0%', '100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                Rifqi Dwi Putra
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Subtitle with typewriter effect */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Frontend Developer yang passionate menciptakan{' '}
            <motion.span
              className="text-purple-600 dark:text-purple-400 font-semibold"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              pengalaman digital
            </motion.span>{' '}
            yang menakjubkan
          </motion.p>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-6 mb-12"
          >
            {[
              { href: "https://github.com/", icon: FaGithub, label: "GitHub", color: "hover:text-gray-800" },
              { href: "https://linkedin.com/", icon: FaLinkedin, label: "LinkedIn", color: "hover:text-blue-600" },
              { href: "mailto:rifqi@example.com", icon: FaEnvelope, label: "Email", color: "hover:text-red-500" }
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg transition-all duration-300 ${social.color}`}
                whileHover={{ 
                  scale: 1.2, 
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link href="/projects">
              <motion.button
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-lg shadow-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                />
                <span className="relative flex items-center gap-2">
                  <FaRocket />
                  Lihat Proyek Saya
                </span>
              </motion.button>
            </Link>

            <Link href="/contact">
              <motion.button
                className="px-8 py-4 border-2 border-purple-600 text-purple-600 dark:text-purple-400 rounded-full font-semibold text-lg hover:bg-purple-600 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Hubungi Saya
              </motion.button>
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center text-gray-500 dark:text-gray-400"
            >
              <span className="text-sm mb-2">Scroll down</span>
              <FaArrowDown />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Quick Stats Section */}
      <motion.section
        className="py-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: FaCode, number: "50+", label: "Projects Completed", color: "text-blue-500" },
              { icon: FaHeart, number: "100+", label: "Happy Clients", color: "text-red-500" },
              { icon: FaRocket, number: "3+", label: "Years Experience", color: "text-green-500" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center p-8 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg"
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.1)"
                }}
              >
                <motion.div
                  className={`text-4xl mb-4 ${stat.color}`}
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                >
                  <stat.icon className="mx-auto" />
                </motion.div>
                <motion.h3
                  className="text-3xl font-bold text-gray-800 dark:text-white mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1, type: 'spring' }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.h3>
                <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Footer CTA */}
      <motion.section
        className="py-20 px-4 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-3xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Mari Berkolaborasi!
          </motion.h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Punya proyek menarik atau hanya ingin ngobrol tentang teknologi?
          </p>
          <Link href="/contact">
            <motion.button
              className="px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-xl shadow-xl"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Talk! 🚀
            </motion.button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}