/* eslint-disable prettier/prettier */
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

//DATA REGISTRASI PASIEN RAWAT JALAN
const DataRegistrasiPasienRawatJalan = React.lazy(() => import('./views/data_pasien/DataRegPasienRwtJln'))

let routes = []
routes = [
  { path: '/', exact: true, name: 'Beranda' },
  { path: '/dashboard', name: 'Beranda', element: Dashboard, exact: true },
  { path: '/data_registrasi_pasien_rawat_jalan', name: 'Data Registrasi Pasien Rawat Jalan', element: DataRegistrasiPasienRawatJalan, exact: true },
]

export default routes