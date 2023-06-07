/* eslint-disable prettier/prettier */
import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
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
    name: 'Reg Pasien Rwt Jalan',
    to: '/data_registrasi_pasien_rawat_jalan',
    icon: <FontAwesomeIcon icon={faUser} style={{ marginLeft: '10px', marginRight: '15px' }} />,
  },
]

export default _nav
