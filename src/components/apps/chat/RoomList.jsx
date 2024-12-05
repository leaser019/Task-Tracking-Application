import React, { useState, useEffect } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemButton,
  Avatar,
} from '@mui/material'
import {
  Home,
  Work,
  School,
  SportsSoccer,
  LocalCafe,
} from '@mui/icons-material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import clsx from 'clsx'

const RoomList = () => {
  const [open, setOpen] = useState(false)
  const [shuffledIcons, setShuffledIcons] = useState([])

  const handleClick = () => {
    setOpen(!open)
  }

  const icons = [Home, Work, School, SportsSoccer, LocalCafe]

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  useEffect(() => {
    setShuffledIcons(shuffleArray([...icons]))
    setOpen(true)
  }, [])

  return (
    <List
      className="room-list bg-white  rounded-lg m-4 p-4"
      style={{ maxHeight: '460px', overflowY: 'auto' }}
    >
      {/* <ListItemButton
        onClick={handleClick}
        className="room-list-button flex justify-between items-center p-4 border-b border-gray-300 cursor-pointer transition-colors duration-300 hover:bg-gray-100"
      >
        <ListItemText
          primary="Chat Rooms"
          className={clsx(
            'text-2xl capitalize font-bold text-gray-800 hidden',
            'bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500'
          )}
        />
        {open ? (
          <ExpandLess className="text-blue-500" />
        ) : (
          <ExpandMore className="text-blue-500" />
        )}
      </ListItemButton> */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {Array.from({ length: 10 }, (_, i) => (
            <ListItem
              key={i}
              className="room-list-item pl-8 py-2  transition-colors duration-300 hover:bg-blue-50 flex items-center"
            >
              <Avatar
                className="mr-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                style={{ width: '48px', height: '48px', fontSize: '1.25rem' }}
              >
                {React.createElement(shuffledIcons[i % shuffledIcons.length])}
              </Avatar>
              <ListItemText
                primary={`Room ${i + 1}`}
                className="text-gray-800 font-medium"
              />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </List>
  )
}

export default RoomList
