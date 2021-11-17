import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'py-4 px-4 ml-4 select-none text-2xl'
  },
  {
    path: '/reports',
    icon: <IoIcons.IoIosPaper />,
    cName: 'py-4 px-4 ml-4 select-none text-2xl'
  },
  {
    path: '/products',
    icon: <FaIcons.FaCartPlus />,
    cName: 'py-4 px-4 ml-4 select-none text-2xl'
  },
  {
    path: '/team',
    icon: <IoIcons.IoMdPeople />,
    cName: 'py-4 px-4 ml-4 select-none text-2xl'
  },
  {
    path: '/messages',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'py-4 px-4 ml-4 select-none text-2xl'
  },
  {
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'py-4 px-4 ml-4 select-none text-2xl'
  }
];
