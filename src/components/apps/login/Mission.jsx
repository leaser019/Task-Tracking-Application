import React from 'react'
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

const Mission = React.memo(() => {
  const missionPoints = [
    {
      text: 'Track applications efficiently',
      icon: <TaskSquare size="24" color="#4b79e4" variant="Bulk" />,
      description:
        'Use our tools to keep track of all your applications in one place.',
    },
    {
      text: 'Collaborate with team members',
      icon: <People size="24" color="#4b79e4" variant="Bulk" />,
      description: 'Work together with your team seamlessly and efficiently.',
    },
    {
      text: 'Monitor project progress',
      icon: <Chart2 size="24" color="#4b79e4" variant="Bulk" />,
      description:
        'Keep an eye on the progress of your projects with our monitoring tools.',
    },
    {
      text: 'Streamline workflow management',
      icon: <Timer1 size="24" color="#4b79e4" variant="Bulk" />,
      description:
        'Manage your workflows more effectively with our streamlined tools.',
    },
    {
      text: 'Communicate effectively',
      icon: <Message size="24" color="#4b79e4" variant="Bulk" />,
      description: 'Ensure clear and effective communication within your team.',
    },
    {
      text: 'Manage project assets',
      icon: <AttachSquare size="24" color="#4b79e4" variant="Bulk" />,
      description:
        'Keep all your project assets organized and easily accessible.',
    },
    {
      text: 'Analyze performance metrics',
      icon: <Chart size="24" color="#4b79e4" variant="Bulk" />,
      description:
        'Analyze key performance metrics to improve your project outcomes.',
    },
    {
      text: 'Schedule and plan tasks',
      icon: <Calendar size="24" color="#4b79e4" variant="Bulk" />,
      description:
        'Plan and schedule tasks efficiently to meet your project deadlines.',
    },
    {
      text: 'Maintain documentation',
      icon: <ClipboardText size="24" color="#4b79e4" variant="Bulk" />,
      description:
        'Keep all your project documentation up-to-date and well-organized.',
    },
    {
      text: 'Ensure data security',
      icon: <ShieldTick size="24" color="#4b79e4" variant="Bulk" />,
      description: 'Protect your data with our robust security measures.',
    },
  ]

  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 animate-gradient">
        Our Mission
      </h2>

      <div className="max-w-xs mx-auto mb-8">
        <img
          src="./assets/images/mission/mission.jpg"
          alt="Mission Illustration"
          className="w-full h-auto rounded-lg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {missionPoints.map((point, index) => (
          <div
            key={index}
            className="flex flex-row p-2 bg-gray-100 rounded-lg shadow-sm"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 mt-[2%]">
              {point.icon}
            </div>
            <div className="flex flex-col ml-4 mt-2">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {point.text}
              </h3>
              <p className="text-sm text-gray-600">{point.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})

export default Mission
