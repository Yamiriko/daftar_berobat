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
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import Fungsi from 'src/fungsi/Fungsi'

const Dashboard = () => {
  function TampilMenu() {
    return (
      <>
        <CButton className='btn btn-blue' variant="outline" onClick={() => Fungsi.BukaLink('/#/data_registrasi_pasien_rawat_jalan')}>
          <FontAwesomeIcon icon={faUser} /> Registrasi Pasien Rawat Jalan
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
