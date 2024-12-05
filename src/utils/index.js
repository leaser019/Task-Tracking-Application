import { MdKeyboardArrowDown } from 'react-icons/md'
import { MdKeyboardArrowUp } from 'react-icons/md'
import { MdKeyboardDoubleArrowUp } from 'react-icons/md'

export { tailwindToHex } from './tailwindToHex'

export function getInitials(fullName) {
  const names = fullName.split(' ')
  const initials = names.slice(0, 2).map((name) => name[0].toUpperCase())
  const init = initials.join(' ')
  return init
}

export const PRIORITY_STYLES = {
  High: 'text-red-600',
  Medium: 'text-yellow-600',
  Low: 'text-blue-600',
  high: 'text-red-600',
  medium: 'text-yellow-600',
  low: 'text-blue-600',
}

export const BGS = [
  'bg-blue-600',
  'bg-yellow-600',
  'bg-red-600',
  'bg-green-600',
]

export const formatDate = (date) => {
  const month = date.toLocaleString('en-US', { month: 'short' })
  const day = date.getDate()
  const year = date.getFullYear()

  const formattedDate = `${day}-${month}-${year}`

  return formattedDate
}

export function dateFormatter(dateString) {
  const inputDate = new Date(dateString)

  if (isNaN(inputDate)) {
    return 'Invalid Date'
  }

  const year = inputDate.getFullYear()
  const month = String(inputDate.getMonth() + 1).padStart(2, '0')
  const day = String(inputDate.getDate()).padStart(2, '0')

  const formattedDate = `${year}-${month}-${day}`
  return formattedDate
}

export const TASK_TYPE = {
  todo: 'bg-blue-600',
  implement: 'bg-yellow-600',
  testing: 'bg-purple-600',
  production: 'bg-green-600',
  Todo: 'bg-blue-600',
  Implement: 'bg-yellow-600',
  Testing: 'bg-purple-600',
  Production: 'bg-green-600',
  'To Do': 'bg-blue-600',
  'To do': 'bg-blue-600',
  'to do': 'bg-blue-600',
}

export const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
  High: <MdKeyboardDoubleArrowUp />,
  Medium: <MdKeyboardArrowUp />,
  Low: <MdKeyboardArrowDown />,
}

export const scrollToSection = (elementId) => {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}
export function getInitialsUsername(fullName) {
  if (!fullName) return ''

  return fullName
    .split(' ')
    .map((name) => name[0])
    .join('')
    .toUpperCase()
}
