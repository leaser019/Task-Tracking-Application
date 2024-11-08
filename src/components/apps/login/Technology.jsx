import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FaNodeJs, FaReact } from 'react-icons/fa'
import { SiTailwindcss, SiMongodb, SiFigma, SiVercel } from 'react-icons/si'

const technologies = [
  {
    Icon: FaReact,
    name: 'React',
    gradient: 'from-blue-400 to-blue-600',
    iconColor: '#61DAFB',
  },
  {
    Icon: FaNodeJs,
    name: 'Node.js',
    gradient: 'from-blue-500 to-blue-700',
    iconColor: '#68A063',
  },
  {
    Icon: SiMongodb,
    name: 'MongoDB',
    gradient: 'from-blue-400 to-blue-600',
    iconColor: '#00ED64',
  },
  {
    Icon: SiTailwindcss,
    name: 'Tailwind',
    gradient: 'from-blue-500 to-blue-700',
    iconColor: '#38BDF8',
  },
  {
    Icon: SiFigma,
    name: 'Figma',
    gradient: 'from-blue-400 to-blue-600',
    iconColor: '#F24E1E',
  },
  {
    Icon: SiVercel,
    name: 'Vercel',
    gradient: 'from-blue-500 to-blue-700',
    iconColor: '#FFFFFF',
  },
]

function Technologies() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [50, 0])

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  }

  return (
    <motion.section
      style={{ y }}
      className="py-12 bg-gradient-to-b from-[#f3f4f6] to-white"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-blue-700 mb-2">
            Powered by Modern Tech Stack
          </h2>
          <p className="text-gray-600">
            Built with cutting-edge technologies for the best experience
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
          {technologies.map(({ Icon, name, gradient, iconColor }, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              className="flex flex-col items-center"
            >
              <div
                className={`
                  w-16 h-16
                  rounded-full 
                  bg-gradient-to-br ${gradient}
                  p-4
                  flex items-center justify-center 
                  shadow-md
                  hover:shadow-lg 
                  transition-all duration-300
                `}
              >
                <Icon
                  className="w-8 h-8 transition-transform duration-300"
                  style={{ color: 'white' }}
                />
              </div>
              <span className="mt-2 text-sm font-medium text-gray-600">
                {name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  )
}

export default Technologies
