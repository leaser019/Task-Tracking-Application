import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import {
  Chart2,
  TaskSquare,
  People,
  Timer1,
  Message,
  AttachSquare,
  Chart,
  Calendar,
  ClipboardText,
  ShieldTick,
} from 'iconsax-react'

const StyledMission = styled.div`
  .mission-container {
    padding: 2rem;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 1rem;
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    margin: 2rem 0;
    transition: transform 0.3s ease;
    &:hover {
      transform: translateY(-10px);
    }
  }

  .mission-title {
    background: linear-gradient(90deg, #0084ff, #4b79e4, #0084ff);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradient 3s ease infinite;
  }

  .mission-image {
    max-width: 300px;
    margin: 2rem auto;
    border-radius: 1rem;
  }

  .icon-wrapper {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(75, 121, 228, 0.1);
    margin-right: 1rem;
    transition: background 0.3s ease, transform 0.3s ease;
    &:hover {
      background: rgba(75, 121, 228, 0.2);
      transform: scale(1.1);
    }
  }

  .mission-point {
    transition: transform 0.3s ease;
    &:hover {
      transform: translateX(10px);
    }
  }

  .mission-points {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 1380px) {
    .mission-container {
      padding: 1rem;
    }

    .mission-title {
      font-size: 1.5rem;
    }

    .mission-image {
      max-width: 200px;
    }

    .mission-points {
      grid-template-columns: 1fr;
      padding: 0 1rem;
    }

    .mission-point {
      margin-left: 0;
      padding: 0 1rem;
    }
  }

  @media (max-width: 480px) {
    .mission-title {
      font-size: 1.25rem;
    }

    .mission-image {
      max-width: 150px;
    }

    .mission-point {
      flex-direction: column;
      align-items: flex-start;
    }

    .icon-wrapper {
      margin-bottom: 0.5rem;
    }
  }
`

const Mission = React.memo(() => {
  const missionPoints = [
    {
      text: 'Track applications efficiently',
      icon: <TaskSquare size="24" color="#4b79e4" variant="Bulk" />,
    },
    {
      text: 'Collaborate with team members',
      icon: <People size="24" color="#4b79e4" variant="Bulk" />,
    },
    {
      text: 'Monitor project progress',
      icon: <Chart2 size="24" color="#4b79e4" variant="Bulk" />,
    },
    {
      text: 'Streamline workflow management',
      icon: <Timer1 size="24" color="#4b79e4" variant="Bulk" />,
    },
    {
      text: 'Communicate effectively',
      icon: <Message size="24" color="#4b79e4" variant="Bulk" />,
    },
    {
      text: 'Manage project assets',
      icon: <AttachSquare size="24" color="#4b79e4" variant="Bulk" />,
    },
    {
      text: 'Analyze performance metrics',
      icon: <Chart size="24" color="#4b79e4" variant="Bulk" />,
    },
    {
      text: 'Schedule and plan tasks',
      icon: <Calendar size="24" color="#4b79e4" variant="Bulk" />,
    },
    {
      text: 'Maintain documentation',
      icon: <ClipboardText size="24" color="#4b79e4" variant="Bulk" />,
    },
    {
      text: 'Ensure data security',
      icon: <ShieldTick size="24" color="#4b79e4" variant="Bulk" />,
    },
  ]

  return (
    <StyledMission>
      <div className="mission-container">
        <h2 className="mission-title text-3xl font-bold text-center mb-8">
          Our Mission
        </h2>

        <div className="mission-image">
          <img
            src="./assets/images/mission/mission.jpg"
            alt="Mission Illustration"
            className="w-full h-auto"
          />
        </div>
        <div>
          <div className="mission-points px-20">
            {missionPoints.map((point, index) => (
              <motion.div
                key={index}
                className="mission-point flex items-center text-gray-600 ml-6 px-28"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <motion.div
                  className="icon-wrapper"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {point.icon}
                </motion.div>
                <span className="text-lg">{point.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </StyledMission>
  )
})

export default Mission
