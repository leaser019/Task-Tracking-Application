import React from 'react'
import { motion } from 'framer-motion'
import { useSpring, animated } from 'react-spring'
import styled from 'styled-components'
import { TickCircle, Chart, Code, Command } from 'iconsax-react'

const StyledFeature = styled.div`
  .feature-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
    padding: 2rem;
    overflow: hidden;
  }

  .feature-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255, 255, 255, 0.95);
    padding: 3rem;
    border-radius: 2rem;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1),
      0 0 0 1px rgba(255, 255, 255, 0.5) inset;
    backdrop-filter: blur(10px);
    max-width: 800px;
    width: 100%;
    position: relative;
    z-index: 1;
  }

  .feature-title {
    font-size: 3rem;
    font-weight: 800;
    background: linear-gradient(90deg, #2563eb, #4b79e4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .feature-description {
    font-size: 1.25rem;
    color: #4b5563;
    text-align: center;
    margin-bottom: 3rem;
    max-width: 600px;
    line-height: 1.6;
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    width: 100%;
  }

  .feature-card {
    background: white;
    padding: 1.5rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .icon-wrapper {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    margin-bottom: 1rem;
  }

  .feature-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    z-index: 0;
    opacity: 0.6;
  }

  .blob-1 {
    width: 300px;
    height: 300px;
    background: #60a5fa;
    top: -100px;
    left: -100px;
  }

  .blob-2 {
    width: 250px;
    height: 250px;
    background: #818cf8;
    bottom: -50px;
    right: -50px;
  }

  @media (max-width: 768px) {
    .feature-grid {
      grid-template-columns: 1fr;
    }

    .feature-title {
      font-size: 2rem;
    }
  }
`

const Feature = () => {
  const springProps = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 200, friction: 20 },
  })

  const features = [
    {
      icon: <TickCircle size={32} color="white" variant="Bold" />,
      title: 'Easy Integration',
      description: 'Seamlessly integrate with your existing workflow',
    },
    {
      icon: <Chart size={32} color="white" variant="Bold" />,
      title: 'Advanced Analytics',
      description: 'Get detailed insights and performance metrics',
    },
    {
      icon: <Code size={32} color="white" variant="Bold" />,
      title: 'Clean Code',
      description: 'Built with modern and maintainable code',
    },
    {
      icon: <Command size={32} color="white" variant="Bold" />,
      title: 'Powerful Tools',
      description: 'Access a suite of powerful development tools',
    },
  ]

  return (
    <StyledFeature>
      <div className="feature-container">
        <div className="feature-blob blob-1" />
        <div className="feature-blob blob-2" />
        <div
          className="feature-content"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div style={springProps}>
            <h2 className="feature-title">Powerful Features</h2>
            <p className="feature-description">
              Enhance your development workflow with our cutting-edge features
              designed for modern developers.
            </p>
          </div>

          <div className="feature-grid">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div
                  className="icon-wrapper"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StyledFeature>
  )
}

export default Feature
