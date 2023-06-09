/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CImage,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import $ from 'jquery'
import AWN from 'awesome-notifications'
import 'awesome-notifications/src/styles/style.scss'
import swal from 'sweetalert'
import Fungsi, { loadingSwal } from 'src/fungsi/Fungsi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNodeJs } from '@fortawesome/free-brands-svg-icons'
import { faEye } from '@fortawesome/free-regular-svg-icons'
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import logo from 'src/assets/images/satu2.png'
import Token from 'src/fungsi/Token'

const Login = () => {
  Fungsi.disableF12()
  const [getIcon, setIcon] = useState(false)
  const notifier = new AWN({
    maxNotifications: 6,
  })

  function intipPassword() {
    let a = getIcon
    if (a) {
      return <FontAwesomeIcon icon={faEyeSlash} />
    } else {
      return <FontAwesomeIcon icon={faEye} />
    }
  }

  function loginApp() {
    let usr = $('#usr').val()
    let psw = $('#psw').val()
    if (!usr) {
      notifier.alert('Pesan System : Username Wajib Diisi !')
      $('#usr').focus()
    } else if (!psw) {
      notifier.alert('Pesan System : Password Wajib Diisi !')
      $('#psw').focus()
    } else {
      let fd = '&token=' + Token.TokenRahasia()
      fd += '&namapengguna=' + usr.trim()
      fd += '&sandipengguna=' + psw.trim()
      const optionku = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': Fungsi.kontentipe,
        },
        body: fd,
      }
      fetch(Fungsi.linkLogin, optionku)
        .then((response) => response.json(),loadingSwal())
        .then((data_json) => {
          swal.close()
          let status = data_json.status_tampil
          let pesan = data_json.pesan
          if (status) {            
            // console.clear()
            notifier.success('Pesan System : ' + pesan)
            const d_ses = {
              namapengguna: usr.trim(),
              sandipengguna: psw.trim(),
            }
            Fungsi.saveSession(d_ses)
            setTimeout(() => {
              Fungsi.BukaLink('/')
            }, 4000)
          } else {
            console.log('Pesan System : ' + pesan)
          }
        })
        .catch((error) => {
          swal.close()
          console.log('Pesan Error System : ' + error)
        })
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <p className="text-center">
                      <CImage alt="" className="img img-rounded" src={logo} width={150} />
                    </p>
                    <h2 className="text-center">
                      <b>Aplikasi</b>
                    </h2>
                    <h2 className="text-center">
                      <u>Pendaftaran Berobat Riko</u>
                    </h2>
                    <p className="text-medium-emphasis">Login Ke Akun Kamu</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        id="usr"
                        name="usr"
                        placeholder="Username"
                        title="Input username kamu disini"
                        autoComplete="off"
                        maxLength={50}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        id="psw"
                        name="psw"
                        type="password"
                        placeholder="Password"
                        title="Input password kamu disini"
                        autoComplete="off"
                        maxLength={50}
                      />
                      <CInputGroupText
                        id="icon_psw"
                        name="icon_psw"
                        title="Lihat Passwordnya ?"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          let a = Fungsi.LihatPassword('psw')
                          if (a) {
                            setIcon(true)
                          } else {
                            setIcon(false)
                          }
                        }}
                      >
                        {intipPassword()}
                      </CInputGroupText>
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          id="btn_login"
                          type="button"
                          color="primary"
                          className="px-4"
                          title="Login?"
                          onClick={() => loginApp()}
                        >
                          <FontAwesomeIcon icon={faNodeJs} /> Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
