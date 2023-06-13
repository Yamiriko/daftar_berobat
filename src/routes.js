/* eslint-disable prettier/prettier */
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

//Route File Menunya
const Pengguna = React.lazy(() => import('./views/pengguna/Pengguna'))
const Pasien = React.lazy(() => import('./views/pasien/Pasien'))
const Staff = React.lazy(() => import('./views/staff/Staff'))
const Berobat = React.lazy(() => import('./views/berobat/Berobat'))
const Diagnosa = React.lazy(() => import('./views/diagnosa/Diagnosa'))

let routes = []
routes = [
  { path: '/', exact: true, name: 'Beranda' },
  { path: '/dashboard', name: 'Beranda', element: Dashboard, exact: true },
  { path: '/pengguna', name: 'Data Pengguna', element: Pengguna, exact: true },
  { path: '/pasien', name: 'Data Pasien', element: Pasien, exact: true },
  { path: '/staff', name: 'Data Staff', element: Staff, exact: true },
  { path: '/berobat', name: 'Data Berobat', element: Berobat, exact: true },
  { path: '/diagnosa', name: 'Data Diagnosa', element: Diagnosa, exact: true },
]

export default routes