/* eslint-disable prettier/prettier */
import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCapsules,
  faUser,
  faUserInjured,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'

var _nav = []
_nav = [
  {
    component: CNavItem,
    name: 'Beranda',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Menu',
  },
  {
    component: CNavItem,
    name: 'Pengguna',
    to: '/pengguna',
    icon: <FontAwesomeIcon icon={faUser} style={{ marginLeft: '10px', marginRight: '15px' }} />,
  },
  {
    component: CNavItem,
    name: 'Staff',
    to: '/staff',
    icon: <FontAwesomeIcon icon={faUsers} style={{ marginLeft: '10px', marginRight: '15px' }} />,
  },
  {
    component: CNavItem,
    name: 'Pasien',
    to: '/pasien',
    icon: <FontAwesomeIcon icon={faUserInjured} style={{ marginLeft: '10px', marginRight: '15px' }} />,
  },
  {
    component: CNavItem,
    name: 'Berobat',
    to: '/berobat',
    icon: <FontAwesomeIcon icon={faCapsules} style={{ marginLeft: '10px', marginRight: '15px' }} />,
  },
]

export default _nav
