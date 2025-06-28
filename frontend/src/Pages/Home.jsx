import React from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/frontend_assets/assets';

const Home = () => {
  const column1 = [assets.m1, assets.w4];
  const column2 = [assets.k1, assets.w1, assets.m3];
  const column3 = [assets.k2, assets.m4];

  const motionProps = (direction, index) => ({
    initial: { opacity: 0, y: direction === 'down' ? -50 : 50 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: index * 0.5, duration: 0.9 },
    whileHover: { scale: 1.05 },
  });

  const imageClass = 'w-full h-full object-cover';

  return (
    <div className="flex justify-center gap-6 px-6 py-10">
      {/* Left Column */}
      <div className="flex flex-col justify-center gap-8 pt-[60px]">
        {column1.map((img, i) => (
          <motion.div
            key={`left-${i}`}
            className="w-44 h-64 rounded-2xl overflow-hidden bg-white shadow-bottom-blue"
            {...motionProps('down', i)}
          >
            <img src={img} alt={`left-${i}`} className={imageClass} />
          </motion.div>
        ))}
      </div>

      {/* Middle Column */}
      <div className="flex flex-col gap-6">
        {column2.map((img, i) => (
          <motion.div
            key={`middle-${i}`}
            className="w-44 h-64 rounded-2xl overflow-hidden bg-white shadow-bottom-blue"
            {...motionProps('up', i)}
          >
            <img src={img} alt={`middle-${i}`} className={imageClass} />
          </motion.div>
        ))}
      </div>

      {/* Right Column */}
      <div className="flex flex-col justify-center gap-8 pt-[60px]">
        {column3.map((img, i) => (
          <motion.div
            key={`right-${i}`}
            className="w-44 h-64 rounded-2xl overflow-hidden bg-white shadow-bottom-blue"
            {...motionProps('down', i)}
          >
            <img src={img} alt={`right-${i}`} className={imageClass} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;