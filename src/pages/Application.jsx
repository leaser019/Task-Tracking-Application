import React from 'react'
import { Element4 } from 'iconsax-react'
import { AlignRight } from 'iconsax-react'
import { Add } from 'iconsax-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../components/common/Loading'
import Title from '../components/common/Title'
import ButtonElement from '../components/common/ButtonElement'
import Tabs from '../components/apps/application/Tabs'
import TaskTitle from '../components/apps/application/TaskTitle'
import { tasks as applications } from '../assets/data'
import BoardView from '../components/apps/application/BoardView'
import ListView from '../components/apps/application/ListView'
import AddApplication from './../components/apps/modal/AddApplication'
const Application = () => {
  const Tab = [
    {
      title: 'Board View',
      icon: <Element4 size="20" color="#292d32" />,
      iconChoose: <Element4 size="20" color="#F5F5F0" />,
    },
    {
      title: 'List View',
      icon: <AlignRight size="20" color="#292d32" />,
      iconChoose: <AlignRight size="20" color="#F5F5F0" />,
    },
  ]
  const ApplicationType = {
    todo: 'bg-blue-600',
    implement: 'bg-yellow-600',
    qaqc: 'bg-purple-600',
    production: 'bg-green-600',
  }
  const params = useParams()
  const status = params?.status || ''
  const [selected, setSelected] = useState(0)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  return loading ? (
    <div className="flex text-center items-center py-[25%] px-[40%] ">
      <Loading />
    </div>
  ) : (
    <>
      <AddApplication open={open} setOpen={setOpen} />
      <div className="w-full">
        <div className="flex items-center justify-between mb-4">
          <Title title={status ? status + ' Application' : 'Application'} />
          {!status && (
            <ButtonElement
              onClick={() => setOpen(true)}
              label="Create Application"
              icon={<Add size="20" color="#FFFFFF" />}
              className="flex flex-row-reverse gap-1 items-start bg-[#2563eb] text-white rounded-xl px-2 py-3  2xl:py-2.5"
            />
          )}
        </div>
        <Tabs tabs={Tab} setSelected={setSelected}>
          {!status && (
            <div className="grid grid-cols-4 grid-rows-1 gap-4">
              <TaskTitle label="To Do" className={ApplicationType.todo} />
              <TaskTitle
                label="Implement"
                className={ApplicationType.implement}
              />
              <TaskTitle label="QA/QC" className={ApplicationType.qaqc} />
              <TaskTitle
                label="Production"
                className={ApplicationType.production}
              />
            </div>
          )}
          {selected === 0 ? (
            <div>
              <BoardView applications={applications} />
            </div>
          ) : (
            <div>
              <ListView applications={applications} />
            </div>
          )}
        </Tabs>
      </div>
    </>
  )
}

export default Application
