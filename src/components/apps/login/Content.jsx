import React from 'react'
import { motion } from 'framer-motion'
import { FaRocket, FaLightbulb, FaChartLine, FaUsers } from 'react-icons/fa'
import Technologies from './Technology'
import Mission from './Mission'
import { useInView } from 'react-intersection-observer'
import TerminalCard from '../../common/TerminalCard'
import AboutUs from './AboutUs'
import Feature from './Feature'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Content = () => {
  const { ref: missionRef, inView: missionInView } = useInView({
    triggerOnce: true,
  })
  const { ref: featureRef, inView: featureInView } = useInView({
    triggerOnce: true,
  })
  const { ref: aboutUsRef, inView: aboutUsInView } = useInView({
    triggerOnce: true,
  })
  const MissionContent = React.useCallback(() => (
    <>
      <Mission />
    </>
  ))
  const navigate = useNavigate()
  const StyledWrapper = styled.div`
    @media (max-width: 990px) {
      .call-action-info {
        display: none;
      }
    }
  `
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const features = [
    {
      icon: <FaRocket className="text-4xl text-blue-500" />,
      title: 'Quick Start',
      description: 'Launch your projects faster than ever before',
    },
    {
      icon: <FaLightbulb className="text-4xl text-blue-500" />,
      title: 'Smart Solutions',
      description: 'Intelligent tools for modern development',
    },
    {
      icon: <FaChartLine className="text-4xl text-blue-500" />,
      title: 'Performance',
      description: 'Optimized for the best user experience',
    },
    {
      icon: <FaUsers className="text-4xl text-blue-500" />,
      title: 'Collaboration',
      description: 'Work together seamlessly with your team',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <section id="getting-started">
        {/* Hero Section */}
        <motion.section
          className="h-screen flex items-center justify-center relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="absolute w-96 h-96 bg-blue-200 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />

          <div className="text-center z-10">
            <motion.h1
              className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-6"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Transform Your Workflow
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 mb-8"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Experience the next generation of development tools
            </motion.p>
          </div>
        </motion.section>
      </section>

      {/* Features Grid */}

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 sm:px-6 lg:px-8 py-12 items-center">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 sm:p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
          >
            <div className="mb-6 text-primary-600 transform transition-transform duration-300 text-4xl">
              {feature.icon}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 tracking-tight">
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      <section id="mission" ref={missionRef}>
        {missionInView && <MissionContent />}
      </section>
      <section id="features" ref={featureRef}>
        {featureInView && <Feature />}
      </section>
      <section id="about-us" ref={aboutUsRef}>
        {aboutUsInView && <AboutUs />}
      </section>
      {/* Testimonials Section */}
      <motion.section
        className="py-20 bg-gradient-to-r from-blue-500 to-blue-700 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "I can't imagine going back to the old methods. This app has everything we need and more.",
                name: 'Jane Doe',
                title: 'Project Manager',
              },
              {
                quote:
                  "Our team's productivity has skyrocketed since we started using this tool. Highly recommend!",
                name: 'John Smith',
                title: 'Lead Developer',
              },
              {
                quote:
                  "This tool has revolutionized the way we work. It's fast, efficient, and incredibly user-friendly.",
                name: 'Alice Johnson',
                title: 'Designer',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white text-blue-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                style={{ maxWidth: '100%', margin: '0 auto' }}
              >
                <p className="italic mb-4">"{testimonial.quote}"</p>
                <h4 className="font-bold">{testimonial.name}</h4>
                <p className="text-sm text-blue-200">{testimonial.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <Technologies />
      <StyledWrapper>
        {/* Call to Action */}
        <section id="contact-section">
          <motion.section
            className="py-20 text-center"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="px-40 flex flex-col justify-between content-center call-action-info"
              style={{ flexDirection: 'column', alignItems: 'center' }}
            >
              <div className="w-full h-auto">
                <h2 className="text-4xl font-bold mb-8 items-start content-center mt-12">
                  Ready to Get Started?
                </h2>
              </div>
              <div className="w-[50%] h-[10%]">
                <TerminalCard />
              </div>
            </div>
            <div className="flex justify-center content-center pt-8">
              <motion.button
                className="bg-blue-600 text-white px-8 py-4 rounded-xl text-xl font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/contact')}
              >
                Join Kepler Now
              </motion.button>
            </div>
          </motion.section>
        </section>
      </StyledWrapper>
    </div>
  )
}

export default Content
