/* eslint-disable prettier/prettier */
import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardTitle,
  CCol,
  CRow,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCapsules,
  faUser, faUserInjured, faUsers,
} from '@fortawesome/free-solid-svg-icons'
import Fungsi from 'src/fungsi/Fungsi'

const Dashboard = () => {
  function TampilMenu() {
    return (
      <>
        <CButton className='btn btn-blue' variant="outline" onClick={() => Fungsi.BukaLink('/#/pengguna')}>
          <FontAwesomeIcon icon={faUser} /> Pengguna
        </CButton>

        <CButton className='btn btn-cyan' variant="outline" onClick={() => Fungsi.BukaLink('/#/staff')}>
          <FontAwesomeIcon icon={faUsers} /> Staff
        </CButton>

        <CButton className='btn btn-green' variant="outline" onClick={() => Fungsi.BukaLink('/#/pasien')}>
          <FontAwesomeIcon icon={faUserInjured} /> Pasien
        </CButton>

        <CButton className='btn btn-orange' variant="outline" onClick={() => Fungsi.BukaLink('/#/berobat')}>
          <FontAwesomeIcon icon={faCapsules} /> Berobat
        </CButton>
      </>
    )
  }

  return (
    <>
      <CRow className="mb-4">
        <CCol md={6}>
          <CCard>
            <CCardHeader>
              <CCardTitle>
                <CRow>
                  <CCol md={12}>
                    <h5>Menu</h5>
                  </CCol>
                </CRow>
              </CCardTitle>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol md={12}>
                  <div className="d-grid gap-2">{TampilMenu()}</div>
                </CCol>
              </CRow>
            </CCardBody>
            <CCardFooter>
              <CRow>
                <CCol md={12}>&nbsp;</CCol>
              </CRow>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
