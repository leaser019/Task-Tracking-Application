import { Tab } from '@headlessui/react'
import { FiGrid, FiList } from 'react-icons/fi'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Tabs = ({ tabs, setSelected, children }) => {
  return (
    <div className="w-full px-1 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex justify-center space-x-6 p-1 w-full">
          {tabs.map((tab, index) => (
            <Tab
              key={tab.title}
              onClick={() => setSelected(index)}
              className={({ selected }) =>
                classNames(
                  'flex items-center justify-center outline-none gap-2 px-3 py-2.5 text-base font-medium leading-5 rounded-lg',
                  'transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform hover:scale-105 active:scale-95', // Enhanced animation
                  'focus:ring-2 focus:ring-offset-2', // Focus styles
                  selected
                    ? 'text-blue-700 bg-blue-100 border-b-2 border-blue-600 shadow-md translate-y-[-2px]'
                    : 'text-gray-800 hover:text-blue-700 hover:bg-gray-200 hover:shadow-sm'
                )
              }
            >
              {tab.title === 'Board View' ? <FiGrid /> : <FiList />}
              <span className="text-lg">{tab.title}</span>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="w-full mt-2 bg-white p-4 rounded-lg shadow-md">
          {children}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default Tabs
