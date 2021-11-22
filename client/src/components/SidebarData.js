import React from 'react'
import * as FaIcons from 'react-icons/fa'

export const SidebarData = [
  {
    path: '/profile',
    icon: <FaIcons.FaHome />,
    cName: 'py-4 px-4 ml-4 select-none text-2xl'
  },
  {
    path: '/posts',
    icon: <FaIcons.FaListAlt />,
    cName: 'py-4 px-4 ml-4 select-none text-2xl'
  },
  {
    path: '/',
    icon: <FaIcons.FaPowerOff />,
    cName: 'py-4 px-4 ml-4 select-none text-2xl'
  }
];
