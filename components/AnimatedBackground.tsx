// components/AnimatedBackground.tsx
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AnimatedBackground() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Jangan render animasi sampai component di-mount di client
  if (!isMounted) {
    return <div className="fixed inset-0" />; // Placeholder kosong
  }

  // Sekarang baru render animasi setelah client-side mount
  return (
    <div className="fixed inset-0">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div
            className="absolute bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full"
            style={{
              width: 200 + i * 50,  // Nilai tetap, bukan random
              height: 200 + i * 50,
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}