/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AWN from 'awesome-notifications'
import 'awesome-notifications/src/styles/style.scss'
import {
  CAlert,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
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
import Token from 'src/fungsi/Token'
import { faPlus, faRecycle } from '@fortawesome/free-solid-svg-icons'

const Diagnosa = () => {
  const [visible, setVisible] = useState(true)
  const [list, setList] = useState([])
  const notifier = new AWN({
    maxNotifications: 6,
  })

  function resetForm() {
    $('#form_input').trigger('reset')
    $('#kdberobat').focus()
    $("#btn_simpan").removeAttr('disabled')
  }

  function tambahData() {
    let kdberobat = $('#kdberobat').val()
    let diagnosa = $('#diagnosa').val()
    let namaobat = $('#namaobat').val()
    let jumlahobat = $('#jumlahobat').val()
    let makanobat = $('#makanobat').val()
    if (!kdberobat) {
      //notif masih kurang
      notifier.alert('Pesan System : Nomor Medical Record Tidak Boleh Kosong.')
      $('#kdberobat').focus()
    }
    else if (!diagnosa) {
      //notif masih kurang
      notifier.alert('Pesan System : Diagnosa Tidak Boleh Kosong.')
      $('#diagnosa').focus()
    }
    else if (!namaobat) {
      //notif masih kurang
      notifier.alert('Pesan System : Nama Obatnya Tidak Boleh Kosong.')
      $('#namaobat').focus()
    }
    else if (!jumlahobat) {
      //notif masih kurang
      notifier.alert('Pesan System : Jumlah Obatnya Tidak Boleh Kosong.')
      $('#jumlahobat').focus()
    }
    else if (!makanobat) {
      //notif masih kurang
      notifier.alert('Pesan System : Keterangan Untuk Makan Obatnya Tidak Boleh Kosong.')
      $('#makanobat').focus()
    }
    else {
      //simpan
      let fd = 'token=' + Token.TokenRahasia()
      fd += '&kdberobat=' + kdberobat.trim()
      fd += '&diagnosa=' + diagnosa.trim()
      fd += '&namaobat=' + namaobat.trim()
      fd += '&jumlahobat=' + jumlahobat
      fd += '&makanobat=' + makanobat.trim()
      fd += '&namapengguna=' + Fungsi.loadSession().namapengguna
      const optionku = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': Fungsi.kontentipe,
        },
        body: fd,
      }

      fetch(Fungsi.linkAddDiagnosa, optionku)
        .then((response) => response.json(), Fungsi.loadingSwal())
        .then((data_json) => {
          swal.close()
          let status = data_json.status_tambah
          let pesan = data_json.pesan
          if (status) {
            notifier.success('Pesan System : ' + pesan)
            tampilData()
            resetForm()
          } else {
            notifier.warning('Pesan System : ' + pesan)
          }
        })
        .catch((error) => {
          swal.close()
          notifier.alert('Pesan Error System : ' + error)
        })
    }
  }

  function tampilData() {
    let fd = 'token=' + Token.TokenRahasia()
    const optionku = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': Fungsi.kontentipe,
      },
      body: fd,
    }

    fetch(Fungsi.linkBerobat, optionku)
      .then((response) => response.json(), Fungsi.loadingSwal())
      .then((data_json) => {
        swal.close()
        let status = data_json.status_tampil
        let pesan = data_json.pesan
        var obj = []
        obj = data_json.data
        console.log(obj.length)
        $('#jumlah_data').html(obj.length).change()
        if (status) {
          setList(obj)
        } else {
          setList(obj)
          notifier.warning('Pesan System : ' + pesan)
        }
      })
      .catch((error) => {
        swal.close()
        notifier.alert('Pesan Error Tampil Data : ' + error)
      })
  }

  function loadInput(kdberobat) {
    $("#kdberobat").val(kdberobat).change()
    $("#kdberobat").focus()
  }

  useEffect(() => {
    tampilData()
  }, [])

  var judul = 'Data Diagnosa'

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
                      <i className="text-muted text-uppercase">List {judul}</i>
                    </CAlert>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md={3}>
                    <div className="table-responsive">
                      <CTable bordered responsive="lg">
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell colSpan={3} className="text-center">
                              Informasi Data
                            </CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow>
                            <CTableDataCell className="text-center">Jumlah Data</CTableDataCell>
                            <CTableDataCell className="text-center">:</CTableDataCell>
                            <CTableDataCell id="jumlah_data" className="text-center">
                              0
                            </CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </div>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md={12}>
                  <div className="table-responsive" style={{ maxHeight: '500px' }}>
                      <CTable striped borderless responsive="lg">
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell
                              className="text-start"
                              style={{ minWidth: '50px', width: '50px', maxWidth: '100px' }}
                            >
                              #
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center">Aksi</CTableHeaderCell>
                            <CTableHeaderCell className="text-center">Pasien</CTableHeaderCell>
                            <CTableHeaderCell className="text-center">
                              Berobat
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center">
                              Diagnosa Dokter
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center">
                              Petugas
                            </CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {list.length > 0 ? (
                            list.map((item, idx) => {
                              let tglberobat = Fungsi.KonversiTgl(item.tglberobat, 'DD MMMM YYYY HH:mm:ss') + ' wib'
                              let tgllahir = Fungsi.KonversiTgl(item.tgllahir, 'DD MMMM YYYY')
                              return (
                                <CTableRow key={idx}>
                                  <CTableDataCell>{idx + 1}</CTableDataCell>
                                  <CTableDataCell>
                                    <CButtonGroup role="group" aria-label="Basic example">
                                      <CButton
                                        type="button"
                                        title="Input Diagnosa Pasien Ini ?"
                                        color="success"
                                        size="sm"
                                        onClick={() => loadInput(item.kdberobat)}
                                      >
                                        <FontAwesomeIcon icon={faPlus} />
                                      </CButton>
                                    </CButtonGroup>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <CTable borderless>
                                      <CTableBody>
                                        <CTableRow key={0}>
                                          <CTableDataCell>No MR</CTableDataCell>
                                          <CTableDataCell className="text-center">:</CTableDataCell>
                                          <CTableDataCell>{item.nomr}</CTableDataCell>
                                        </CTableRow>
                                        <CTableRow key={1}>
                                          <CTableDataCell>Nama</CTableDataCell>
                                          <CTableDataCell className="text-center">:</CTableDataCell>
                                          <CTableDataCell>{item.namapasien}</CTableDataCell>
                                        </CTableRow>
                                        <CTableRow key={2}>
                                          <CTableDataCell>Jenis Kelamin</CTableDataCell>
                                          <CTableDataCell className="text-center">:</CTableDataCell>
                                          <CTableDataCell>{item.jeniskelamin}</CTableDataCell>
                                        </CTableRow>
                                        <CTableRow key={3}>
                                          <CTableDataCell>Tanggal Lahir</CTableDataCell>
                                          <CTableDataCell className="text-center">:</CTableDataCell>
                                          <CTableDataCell>{tgllahir}</CTableDataCell>
                                        </CTableRow>
                                        <CTableRow key={4}>
                                          <CTableDataCell>Alamat</CTableDataCell>
                                          <CTableDataCell className="text-center">:</CTableDataCell>
                                          <CTableDataCell>{item.alamat}</CTableDataCell>
                                        </CTableRow>
                                        <CTableRow key={5}>
                                          <CTableDataCell>Nomor HP</CTableDataCell>
                                          <CTableDataCell className="text-center">:</CTableDataCell>
                                          <CTableDataCell>{item.nohp}</CTableDataCell>
                                        </CTableRow>
                                      </CTableBody>
                                    </CTable>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <CTable borderless>
                                      <CTableBody>
                                        <CTableRow key={0}>
                                          <CTableDataCell>Tanggal Berobat</CTableDataCell>
                                          <CTableDataCell className="text-center">:</CTableDataCell>
                                          <CTableDataCell>{tglberobat}</CTableDataCell>
                                        </CTableRow>
                                        <CTableRow key={1}>
                                          <CTableDataCell>Status Berobat</CTableDataCell>
                                          <CTableDataCell className="text-center">:</CTableDataCell>
                                          <CTableDataCell>{item.statusberobat}</CTableDataCell>
                                        </CTableRow>
                                        <CTableRow key={2}>
                                          <CTableDataCell>Tensi</CTableDataCell>
                                          <CTableDataCell className="text-center">:</CTableDataCell>
                                          <CTableDataCell>{item.tensi}</CTableDataCell>
                                        </CTableRow>
                                        <CTableRow key={3}>
                                          <CTableDataCell>Berat Badan</CTableDataCell>
                                          <CTableDataCell className="text-center">:</CTableDataCell>
                                          <CTableDataCell>{item.beratbadan} Kg</CTableDataCell>
                                        </CTableRow>
                                        <CTableRow key={4}>
                                          <CTableDataCell>Tinggi Badan</CTableDataCell>
                                          <CTableDataCell className="text-center">:</CTableDataCell>
                                          <CTableDataCell>{item.tinggibadan} cm</CTableDataCell>
                                        </CTableRow>
                                      </CTableBody>
                                    </CTable>
                                  </CTableDataCell>
                                  <CTableDataCell></CTableDataCell>
                                  <CTableDataCell>{item.namapengguna}</CTableDataCell>
                                </CTableRow>
                              )
                            })
                          ) : (
                            <CTableRow key={1}>
                              <CTableHeaderCell className="text-center" colSpan={6}>
                                <i className="text-info">Belum Ada Datanya.</i>
                              </CTableHeaderCell>
                            </CTableRow>
                          )}
                        </CTableBody>
                      </CTable>
                    </div>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md={12}>
                    <CAlert
                      color="info"
                      dismissible
                      visible={visible}
                      onClose={() => setVisible(false)}
                    >
                      <i className="text-muted text-uppercase">Form {judul}</i>
                    </CAlert>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md={6}>
                    <CForm id="form_input">
                      <div>
                        <div className="form-group mb-3">
                          <CFormLabel>Kode Berobat</CFormLabel>
                          <CFormInput
                            type="text"
                            id="kdberobat"
                            name="kdberobat"
                            autoComplete="Off"
                            placeholder="Otomatis terisi saat klik dan pilih dari tabel"
                            disabled
                          />
                        </div>
                        <div className="form-group mb-3">
                          <CFormLabel>Diagnosa</CFormLabel>
                          <CFormTextarea
                            type="text"
                            id="diagnosa"
                            name="diagnosa"
                            rows={3}
                            placeholder="Diagnosa"
                            maxLength={300}
                          ></CFormTextarea>
                        </div>
                        <div className="form-group mb-3">
                          <CFormLabel>Nama Obat</CFormLabel>
                          <CFormInput
                            type="text"
                            id="namaobat"
                            name="namaobat"
                            autoComplete="Off"
                            placeholder="Nama Obat"
                            maxLength={150}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <CFormLabel>Jumlah Obat</CFormLabel>
                          <CFormInput
                            type="number"
                            id="jumlahobat"
                            name="jumlahobat"
                            autoComplete="Off"
                            placeholder="Jumlah Obat"
                            min={0}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <CFormLabel>Makan Obat</CFormLabel>
                          <CFormInput
                            type="text"
                            id="makanobat"
                            name="makanobat"
                            autoComplete="Off"
                            placeholder="Makan Obat"
                            maxLength={100}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <CButton
                            id='btn_simpan'
                            name='btn_simpan'
                            type="button"
                            title="Simpan Data ?"
                            color="success"
                            onClick={() => tambahData()}
                          >
                            <FontAwesomeIcon icon={faPlus} /> Simpan
                          </CButton>
                          &nbsp;
                          <CButton
                            id='btn_hapus'
                            name='btn_hapus'
                            type="button"
                            title="Reset Form ?"
                            color="secondary"
                            onClick={() => resetForm()}
                          >
                            <FontAwesomeIcon icon={faRecycle} /> Reset
                          </CButton>
                        </div>
                      </div>
                    </CForm>
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

export default Diagnosa
