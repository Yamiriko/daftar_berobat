/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AWN from 'awesome-notifications'
import 'awesome-notifications/src/styles/style.scss'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CForm,
  CFormLabel,
  CFormSelect,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import Fungsi from 'src/fungsi/Fungsi'
import swal from 'sweetalert'
import $ from 'jquery'
import { faNodeJs } from '@fortawesome/free-brands-svg-icons'
import 'flatpickr/dist/themes/material_green.css'
import Flatpickr from 'react-flatpickr'

const RawatJalan = () => {
  const [visible, setVisible] = useState(true)
  const [list, setList] = useState([])
  const notifier = new AWN({
    maxNotifications: 6,
  })

  let flatpickr = {
    enableTime: false,
    disableMobile: true,
    dateFormat: 'Y-m-d',
  }

  function tampilData() {
    let tglDaftar = $('#tgl_daftar').val()
    let jadwal_praktek = $('#jadwal_praktek').val()
    if (!tglDaftar) {
      notifier.alert('Pesan System : Tanggal Daftar Belum Dipilih !')
      $('#tgl_daftar').focus()
    } 
    else if (!jadwal_praktek) {
      notifier.alert('Pesan System : Jadwal Praktek Belum Dipilih !')
      $('#jadwal_praktek').focus()
    }
    else {
      let fd = 'act=data_registrasi_pasien_rawat_jalan'
      fd += '&usr_dokter=' + Fungsi.loadSession().pengguna
      fd += '&psw_dokter=' + Fungsi.loadSession().password
      fd += '&tgl_daftar=' + tglDaftar
      fd += '&kddokter=' + Fungsi.base64Decode(Fungsi.loadSession().kode_dokter)
      fd += '&jadwal_praktek=' + jadwal_praktek
      const optionku = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': Fungsi.kontentipe,
        },
        body: fd,
      }

      fetch(Fungsi.linkApi, optionku)
        .then((response) => response.json(), Fungsi.loadingSwal())
        .then((data_json) => {
          swal.close()
          let metadata = data_json.metadata
          let obj = []
          obj = data_json.data
          console.log(obj.length)
          $("#jumlah_pasien").html(obj.length).change()
          if (metadata.status) {
            setList(obj)
          } else {
            setList(obj)
            if (metadata.code === 202) {
              notifier.alert('Pesan System : ' + metadata.message)
            } else {
              notifier.info('Pesan System : ' + metadata.message)
            }
          }
        })
        .catch((error) => {
          swal.close()
          notifier.alert('Pesan Error System : ' + error)
        })
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  var judul = 'Data Registrasi Pasien Rawat Jalan'
  var lebarKolomAwal = '100px'

  return (
    <CRow className="mb-4">
      <CCol md={12}>
        <CCard>
          <CCardHeader>
            <CCardTitle>
              <CRow>
                <CCol className="text-start text-uppercase" md={12}>
                  {judul}
                </CCol>
              </CRow>
            </CCardTitle>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md={12}>
                <CRow>
                  <CCol md={12}>
                    <CAlert
                      color="info"
                      dismissible
                      visible={visible}
                      onClose={() => setVisible(false)}
                    >
                      <i className="text-muted text-uppercase">{judul}</i>
                    </CAlert>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md={3}>
                    <CForm id="form_cari">
                      <div className="form-group mb-3">
                        <CFormLabel>Tanggal Daftar</CFormLabel>
                        <Flatpickr
                          id="tgl_daftar"
                          name="tgl_daftar"
                          className="form-control"
                          options={flatpickr}
                          placeholder="Klik Untuk Buka Kalender"
                        />
                      </div>
                      <div className='form-group mb-3'>
                        <CFormLabel>Jadwal Praktek</CFormLabel>
                        <CFormSelect
                          id="jadwal_praktek"
                          name="jadwal_praktek"
                          aria-label="Default select example"
                          options={[
                            {label: '-Pilih-', value: ''},
                            {label: 'Praktek Pagi', value: 'PRAKTEK PAGI'},
                            {label: 'Praktek Sore', value: 'PRAKTEK SORE'},
                            {label: 'Praktek Malam', value: 'PRAKTEK MALAM'},
                          ]}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <CButton
                          type="button"
                          title="Terapkan Filter Tahun ?"
                          color="success"
                          onClick={() => tampilData()}
                        >
                          <FontAwesomeIcon icon={faNodeJs} /> Terapkan
                        </CButton>
                      </div>
                    </CForm>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md={3}>
                    <div className="table-responsive">
                      <CTable bordered responsive="lg">
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell colSpan={3} className='text-center'>Informasi Data</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow>
                            <CTableDataCell className='text-center'>Jumlah Pasien</CTableDataCell>
                            <CTableDataCell className='text-center'>:</CTableDataCell>
                            <CTableDataCell id="jumlah_pasien" className='text-center'>0</CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </div>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md={12}>
                    <div className="table-responsive" style={{ maxHeight:'500px' }}>
                      <CTable striped borderless responsive="lg">
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell
                              className="text-start"
                              style={{ minWidth: '50px', width: '50px', maxWidth: '100px' }}
                            >
                              #
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center">Pasien</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {list.length > 0 ? (
                            list.map((item, idx) => {
                              let tglKonfirm = Fungsi.KonversiTgl(item.tgljam_konfirm,'DD MMMM YYYY HH:mm:ss')
                              return (
                                <CTableRow key={idx}>
                                  <CTableDataCell>{idx + 1}</CTableDataCell>
                                  <CTableDataCell>                                    
                                    <CCard>
                                      <CCardBody>
                                        <table style={{ width:'100%' }}>
                                          <tbody>
                                            <tr>
                                              <td style={{ width:lebarKolomAwal }}>No Antri</td>
                                              <td>:</td>
                                              <td>{item.NO_ANTRI}</td>
                                            </tr>
                                            <tr>
                                              <td style={{ width:lebarKolomAwal }}>No MR</td>
                                              <td>:</td>
                                              <td>{item.no_mr}</td>
                                            </tr>
                                            <tr>
                                              <td style={{ width:lebarKolomAwal }}>Nama</td>
                                              <td>:</td>
                                              <td>{item.pas_inisial + ' ' + item.pas_nm}</td>
                                            </tr>
                                            <tr>
                                              <td style={{ width:lebarKolomAwal }}>J.Kelamin</td>
                                              <td>:</td>
                                              <td>{item.pas_jk}</td>
                                            </tr>
                                            <tr>
                                              <td style={{ width:lebarKolomAwal }}>Telp/Hp</td>
                                              <td>:</td>
                                              <td>{item.pas_telp}</td>
                                            </tr>
                                            <tr>
                                              <td style={{ width:lebarKolomAwal }}>Perusahaan</td>
                                              <td>:</td>
                                              <td>{item.nm_prs}</td>
                                            </tr>
                                            <tr>
                                              <td style={{ width:lebarKolomAwal }}>Fast</td>
                                              <td>:</td>
                                              <td>{item.fast_track}</td>
                                            </tr>
                                            <tr>
                                              <td style={{ width:lebarKolomAwal }}>Konfirm</td>
                                              <td>:</td>
                                              <td>{item.konfirm}</td>
                                            </tr>
                                            <tr>
                                              <td style={{ width:lebarKolomAwal }}>Tgl Konfirm</td>
                                              <td>:</td>
                                              <td>{tglKonfirm}</td>
                                            </tr>
                                          </tbody>
                                        </table>                                      
                                      </CCardBody>
                                    </CCard>
                                  </CTableDataCell>
                                </CTableRow>
                              )
                            })
                          ) : (
                            <CTableRow key={1}>
                              <CTableHeaderCell className="text-center" colSpan={2}>
                                <i className="text-info">Belum Ada Datanya.</i>
                              </CTableHeaderCell>
                            </CTableRow>
                          )}
                        </CTableBody>
                      </CTable>
                    </div>
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default RawatJalan
