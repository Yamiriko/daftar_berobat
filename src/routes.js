/* eslint-disable prettier/prettier */
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

//Route File Menunya
const DataRegistrasiPasienRawatJalan = React.lazy(() => import('./views/data_pasien/DataRegPasienRwtJln'))
const Pengguna = React.lazy(() => import('./views/pengguna/Pengguna'))
const Pasien = React.lazy(() => import('./views/pasien/Pasien'))
const Staff = React.lazy(() => import('./views/staff/Staff'))
const Berobat = React.lazy(() => import('./views/berobat/Berobat'))

let routes = []
routes = [
  { path: '/', exact: true, name: 'Beranda' },
  { path: '/dashboard', name: 'Beranda', element: Dashboard, exact: true },
  { path: '/data_registrasi_pasien_rawat_jalan', name: 'Data Registrasi Pasien Rawat Jalan', element: DataRegistrasiPasienRawatJalan, exact: true },
  { path: '/pengguna', name: 'Data Pengguna', element: Pengguna, exact: true },
  { path: '/pasien', name: 'Data Pasien', element: Pasien, exact: true },
  { path: '/staff', name: 'Data Staff', element: Staff, exact: true },
  { path: '/berobat', name: 'Data Berobat', element: Berobat, exact: true },
]

export default routes