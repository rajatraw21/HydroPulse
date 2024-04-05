import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const UserSidebardata = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Report',
    path: '/Report',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Report status',
    path: '/products',
    icon: <FaIcons.FaMap />,
    cName: 'nav-text'
  },
  {
    title: 'Map',
    path: '/map',
    icon: <FaIcons.FaMapMarked />,
    cName: 'nav-text'
  },
  {
    title: 'Community Forum',
    path: '/messages',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'Logout',
    path: '/Login',
    icon: <IoIcons.IoMdLogOut />,
    cName: 'nav-text'
  }
];