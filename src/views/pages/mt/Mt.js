/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCardTitle, CCol, CContainer, CImage, CRow } from '@coreui/react'
import gbr from 'src/assets/gambar/under_constructio.png'
// import $ from 'jquery'
import 'src/riko.css'

const Mt = () => {
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={6}>
              <div className="clearfix">
                <CCard>
                  <CCardHeader>
                    <CCardTitle>Website Maintenance</CCardTitle>
                  </CCardHeader>
                  <CCardBody>
                    <CImage id="gbr_mt" alt="" 
                    src={gbr} rounded thumbnail 
                    className='bounce2'
                    style={{ width: '250px' }} />
                    <h1 className="float-start display-3 me-4">Maintenance</h1>
                    <h4 className="pt-3">Oops!, Website ini sedang Maintenance</h4>
                    <p className="text-medium-emphasis float-start">
                      Halaman tidak dapat ditampilkan karena sedang melakukan perbaikan / Maintenance
                    </p>
                  </CCardBody>
                </CCard>
              </div>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  )
}

export default Mt