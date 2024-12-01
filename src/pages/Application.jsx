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
import BoardView from '../components/apps/application/BoardView'
import ListView from '../components/apps/application/ListView'
import AddApplication from './../components/apps/modal/AddApplication'
import {
  useGetAllApplicationQuery,
  useGetAllTodoQuery,
  useGetAllImplementQuery,
  useGetAllTestingQuery,
  useGetAllProductionQuery,
} from '../redux/slices/api/applicationApiSlice'
import Error from '../components/common/Error'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
  clearSearchResults,
  getAllResults,
} from '../redux/slices/applicationSlice'

const Application = ({ status: appStatus = '' }) => {
  const priority = useSelector((state) => state.application)
  const searchResults = useSelector((state) => state.application.searchResults)
  const [prevAppStatus, setPrevAppStatus] = useState(appStatus)
  const dispatch = useDispatch()
  const stage = appStatus || ''
  const queryGetAllTodo = useGetAllTodoQuery()
  const queryGetAllImplement = useGetAllImplementQuery()
  const queryGetAllTesting = useGetAllTestingQuery()
  const queryGetAllProduction = useGetAllProductionQuery()
  const queryGetAllApplication = useGetAllApplicationQuery()

  let queryGetAll, nameTitle
  switch (stage) {
    case 'todo':
      queryGetAll = queryGetAllTodo
      nameTitle = 'To Do'
      break
    case 'implement':
      queryGetAll = queryGetAllImplement
      nameTitle = 'Implement'
      break
    case 'testing':
      queryGetAll = queryGetAllTesting
      nameTitle = 'QA/QC'
      break
    case 'production':
      queryGetAll = queryGetAllProduction
      nameTitle = 'Production'
      break
    default:
      queryGetAll = queryGetAllApplication
  }

  const { data: applications, isLoading, isError, refetch } = queryGetAll
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

  const getCount = (index) => {
    let countdata = JSON.parse(localStorage.getItem('statusData'))
    return countdata?.untrashedStatistic?.[0]?.detail?.[index]?.count
  }
  const displayedApplications =
    searchResults.length > 0
      ? searchResults
      : applications?.applications || applications
  console.log(displayedApplications)

  React.useEffect(() => {
    if (prevAppStatus !== appStatus) {
      setPrevAppStatus(appStatus)
      //   queryGetAll.refetch()
    }
  }, [appStatus, prevAppStatus, queryGetAll])

  React.useEffect(() => {
    if (appStatus !== prevAppStatus) {
      dispatch(clearSearchResults())
      dispatch(getAllResults())
    }
  }, [appStatus, prevAppStatus, dispatch])
  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <Loading />
    </div>
  ) : isError ? (
    <>
      <Error />
    </>
  ) : (
    <>
      <AddApplication open={open} setOpen={setOpen} />
      <div className="w-full p-4">
        <div className="flex items-center justify-between mb-4">
          <Title
            title={nameTitle ? `${nameTitle} Application` : 'Application'}
          />
          {(stage === '' || stage === 'todo') && (
            <ButtonElement
              onClick={() => setOpen(true)}
              label="Create Application"
              icon={<Add size="20" color="#FFFFFF" />}
              className="flex items-center gap-2 bg-blue-600 text-white rounded-xl px-4 py-2"
            />
          )}
        </div>
        <Tabs tabs={Tab} setSelected={setSelected}>
          {!status && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <TaskTitle
                label="To Do"
                className={ApplicationType.todo}
                number={getCount(1)}
              />
              <TaskTitle
                label="Implement"
                className={ApplicationType.implement}
                number={getCount(2)}
              />
              <TaskTitle
                label="QA/QC"
                className={ApplicationType.qaqc}
                number={getCount(3)}
              />
              <TaskTitle
                label="Production"
                className={ApplicationType.production}
                number={getCount(0)}
              />
            </div>
          )}
          {selected === 0 ? (
            <div>
              <BoardView applications={displayedApplications} refetch={refetch} />
            </div>
          ) : (
            <div>
              <ListView applications={displayedApplications} />
            </div>
          )}
        </Tabs>
      </div>
    </>
  )
}

export default Application
