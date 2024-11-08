import React from 'react'
import { motion } from 'framer-motion'
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa'

const teamMembers = [
  {
    name: 'Nguyen Hoang Gia An',
    title: 'Product Manager, Back-end Deverloper, Tester',
    email: 'jane.smith@example.com',
    image: './assets/images/member/Nguyen-Hoang-Gia-An.jpg',
    linkedin: '#',
    twitter: '#',
    github: '#',
  },
  {
    name: 'Vo Minh Khang',
    title: 'Front-end Developer, UI/UX Designer',
    email: 'admin@gmail.com',
    image: './assets/images/member/Vo-Minh-Khang.png',
    linkedin: '#',
    twitter: '#',
    github: '#',
  },
  {
    name: 'Tran Vu Khanh Hung',
    title: 'Back-end Developer',
    email: 'alex.johnson@example.com',
    image: './assets/images/member/Tran-Vu-Khanh-Hung.jpg',
    linkedin: '#',
    twitter: '#',
    github: '#',
  },
]

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto py-20 px-8">
        <motion.h1
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Us
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          We are a dedicated team of professionals committed to delivering the
          best experience for our users. Our mission is to create innovative
          solutions that streamline workflows and enhance productivity.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
              />
              <motion.h3
                className="text-2xl font-bold text-center mb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
              >
                {member.name}
              </motion.h3>
              <motion.p
                className="text-gray-600 text-center mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.6 }}
              >
                {member.title}
              </motion.p>
              <div className="flex justify-center space-x-4">
                <motion.a
                  href={member.linkedin}
                  className="text-blue-600 hover:text-blue-800"
                  whileHover={{ scale: 1.2 }}
                >
                  <FaLinkedin size="24" />
                </motion.a>
                <motion.a
                  href={member.twitter}
                  className="text-blue-400 hover:text-blue-600"
                  whileHover={{ scale: 1.2 }}
                >
                  <FaTwitter size="24" />
                </motion.a>
                <motion.a
                  href={member.github}
                  className="text-gray-800 hover:text-gray-600"
                  whileHover={{ scale: 1.2 }}
                >
                  <FaGithub size="24" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AboutUs
