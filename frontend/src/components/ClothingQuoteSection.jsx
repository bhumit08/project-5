import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { assets } from '../assets/frontend_assets/assets';

const quote = "Clothes aren’t going to change the world, but the people who wear them will.";

const quoteVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const ClothingQuoteSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className="min-h-screen bg-black text-white px-4 py-8 flex items-center justify-center relative overflow-hidden"
    >
      {/* Left Image */}
      <motion.img
        src={assets.le1}
        alt="Model"
        className="hidden lg:block absolute left-8 top-1/2 w-48 h-72 object-cover rounded-xl shadow-lg transform -translate-y-1/2"
        initial={{ opacity: 0, x: -50 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 1 }}
      />

      {/* Right Image */}
      <motion.img
        // src={assets.le2} 
        src='https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?cs=srgb&dl=pexels-vika-glitter-392079-1620760.jpg&fm=jpg'
        alt="Fashion item"
        className="hidden lg:block absolute right-8 top-1/2 w-48 h-72 object-cover rounded-xl shadow-lg transform -translate-y-1/2"
        initial={{ opacity: 0, x: 50 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
        transition={{ duration: 1 }}
      />

      {/* Center image + quote */}
      <motion.div
        className="relative max-w-4xl w-full"
        initial={{ opacity: 0, x: -200 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -200 }}
        transition={{ duration: 1 }}
      >
        <img
          src="https://themewagon.github.io/kaira/images/video-image.jpg"
          alt="Clothing"
          className="w-full h-auto rounded-lg shadow-2xl"
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center px-6"
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: '2.5rem',
            textShadow: '3px 3px 12px rgba(0,0,0,0.7)',
            lineHeight: '1.4',
          }}
          variants={quoteVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {quote.split('').map((char, index) => (
            <motion.span key={index} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ClothingQuoteSection;
