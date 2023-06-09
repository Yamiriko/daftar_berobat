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
import Token from 'src/fungsi/Token'
import { faPencil, faPlus, faRecycle, faTrash } from '@fortawesome/free-solid-svg-icons'

const Pengguna = () => {
  const [visible, setVisible] = useState(true)
  const [list, setList] = useState([])
  const notifier = new AWN({
    maxNotifications: 6,
  })

  function resetForm() {
    $('#form_input').trigger('reset')
    $('#namapengguna').focus()
    $("#btn_simpan").removeAttr('disabled')
    $("#btn_ubah").attr('disabled',true)
  }

  function tambahData() {
    let namapengguna = $('#namapengguna').val()
    let sandipengguna = $('#sandipengguna').val()
    let level_akses = $('#level_akses').val()
    let status_akun = $('#status_akun').val()
    if (!namapengguna) {
      //notif masih kurang
      notifier.alert('Pesan System : Nama Pengguna Tidak Boleh Kosong.')
      $('#namapengguna').focus()
    }
    else if (!sandipengguna) {
      //notif masih kurang
      notifier.alert('Pesan System : Sandi Pengguna Tidak Boleh Kosong.')
      $('#sandipengguna').focus()
    }
    else if (!level_akses) {
      //notif masih kurang
      notifier.alert('Pesan System : Level Akses Belum Dipilih.')
      $('#level_akses').focus()
    }
    else if (!status_akun) {
      //notif masih kurang
      notifier.alert('Pesan System : Status Akun Belum Dipilih.')
      $('#status_akun').focus()
    }
    else {
      //simpan
      let fd = 'token=' + Token.TokenRahasia()
      fd += '&namapengguna=' + namapengguna.trim()
      fd += '&sandipengguna=' + sandipengguna.trim()
      fd += '&level_akses=' + level_akses
      fd += '&status_akun=' + status_akun
      const optionku = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': Fungsi.kontentipe,
        },
        body: fd,
      }

      fetch(Fungsi.linkAddPengguna, optionku)
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

  function ubahData() {
    let namapengguna = $('#namapengguna').val()
    let sandipengguna = $('#sandipengguna').val()
    let level_akses = $('#level_akses').val()
    let status_akun = $('#status_akun').val()
    if (!namapengguna) {
      //notif masih kurang
      notifier.alert('Pesan System : Nama Pengguna Tidak Boleh Kosong.')
      $('#namapengguna').focus()
    }
    else if (!sandipengguna) {
      //notif masih kurang
      notifier.alert('Pesan System : Sandi Pengguna Tidak Boleh Kosong.')
      $('#sandipengguna').focus()
    }
    else if (!level_akses) {
      //notif masih kurang
      notifier.alert('Pesan System : Level Akses Belum Dipilih.')
      $('#level_akses').focus()
    }
    else if (!status_akun) {
      //notif masih kurang
      notifier.alert('Pesan System : Status Akun Belum Dipilih.')
      $('#status_akun').focus()
    }
    else {
      //simpan
      let fd = 'token=' + Token.TokenRahasia()
      fd += '&namapengguna=' + namapengguna.trim()
      fd += '&sandipengguna=' + sandipengguna.trim()
      fd += '&level_akses=' + level_akses
      fd += '&status_akun=' + status_akun
      const optionku = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': Fungsi.kontentipe,
        },
        body: fd,
      }

      fetch(Fungsi.linkEditPengguna, optionku)
        .then((response) => response.json(), Fungsi.loadingSwal())
        .then((data_json) => {
          swal.close()
          let status = data_json.status_ubah
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

  function hapusData(params) {
    if (!params){
      notifier.alert('Pesan System : Nama Pengguna masihlah kosong !')
    }
    else{
      swal({
        title: 'Yakin Hapus Data ini ?',
        text: '',
        icon: 'info',
        closeOnClickOutside: false,
        closeOnEsc: false,
        buttons: {
          batal: {
            text: 'Tidak Jadi',
            value: 'batal',
            className: 'btn btn-secondary',
          },
          acc: {
            text: 'Ya',
            value: 'ya',
            className: 'btn btn-danger',
          },
        },
      }).then((value) => {
        if (value === 'ya') {
          let fd = 'token=' + Token.TokenRahasia()
          fd += '&namapengguna=' + params
          const optionku = {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': Fungsi.kontentipe,
            },
            body: fd,
          }

          fetch(Fungsi.linkDelPengguna, optionku)
            .then((response) => response.json(), Fungsi.loadingSwal())
            .then((data_json) => {
              swal.close()
              let status = data_json.status_hapus
              let pesan = data_json.pesan
              if (status) {
                notifier.success('Pesan System : ' + pesan)
                tampilData()
              } else {
                notifier.warning('Pesan System : ' + pesan)
              }
            })
            .catch((error) => {
              swal.close()
              notifier.alert('Pesan Error System : ' + error)
            })
        }
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

    fetch(Fungsi.linkPengguna, optionku)
      .then((response) => response.json(), Fungsi.loadingSwal())
      .then((data_json) => {
        swal.close()
        let status = data_json.status_tampil
        let pesan = data_json.pesan
        let obj = []
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
        notifier.alert('Pesan Error System : ' + error)
      })
  }

  function loadUbah(usr,psw,lvl,sts) {
    $("#namapengguna").val(usr).change()
    $("#sandipengguna").val(psw).change()
    $("#level_akses").val(lvl).change()
    $("#status_akun").val(sts).change()
    $("#namapengguna").focus()
    $("#btn_simpan").attr('disabled',true)
    $("#btn_ubah").removeAttr('disabled')
  }

  $("#btn_ubah").attr('disabled',true)

  useEffect(() => {
    tampilData()
  }, [])

  var judul = 'Data Pengguna'

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
                      <i className="text-muted text-uppercase">Form {judul}</i>
                    </CAlert>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md={6}>
                    <CForm id="form_input">
                      <div className="form-group mb-3">
                        <CFormLabel>Nama Pengguna</CFormLabel>
                        <CFormInput
                          type="text"
                          id="namapengguna"
                          name="namapengguna"
                          maxLength={50}
                          autoFocus
                          autoComplete="Off"
                          placeholder="Nama Pengguna"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <CFormLabel>Sandi Pengguna</CFormLabel>
                        <CFormInput
                          type="password"
                          id="sandipengguna"
                          name="sandipengguna"
                          maxLength={50}
                          autoComplete="Off"
                          placeholder="Sandi Pengguna"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <CFormLabel>Level Akses</CFormLabel>
                        <CFormSelect
                          id="level_akses"
                          name="level_akses"
                          aria-label="Default select example"
                          options={[
                            { label: '-Pilih-', value: '' },
                            { label: 'Admin', value: 'Admin' },
                            { label: 'Perawat', value: 'Perawat' },
                            { label: 'Dokter', value: 'Apotek' },
                          ]}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <CFormLabel>Status Akun</CFormLabel>
                        <CFormSelect
                          id="status_akun"
                          name="status_akun"
                          aria-label="Default select example"
                          options={[
                            { label: '-Pilih-', value: '' },
                            { label: 'Aktif', value: 'Aktif' },
                            { label: 'Tidak Aktif', value: 'Tidak Aktif' },
                            { label: 'Suspend', value: 'Suspend' },
                          ]}
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
                          id="btn_ubah"
                          name='btn_ubah'
                          type="button"
                          title="Ubah Data ?"
                          color="warning"
                          onClick={() => ubahData()}
                        >
                          <FontAwesomeIcon icon={faPencil} /> Ubah
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
                    </CForm>
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
                            <CTableHeaderCell className="text-center">
                              Nama Pengguna
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center">Password</CTableHeaderCell>
                            <CTableHeaderCell className="text-center">Level Akses</CTableHeaderCell>
                            <CTableHeaderCell className="text-center">Status Akun</CTableHeaderCell>
                            <CTableHeaderCell className="text-center">Tgl Buat</CTableHeaderCell>
                            <CTableHeaderCell className="text-center">Tgl Ubah</CTableHeaderCell>
                            <CTableHeaderCell className="text-center">
                              Terakhir Login
                            </CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {list.length > 0 ? (
                            list.map((item, idx) => {
                              let tgl_create = Fungsi.KonversiTgl(
                                item.tgl_create,
                                'DD MMMM YYYY HH:mm:ss',
                              )
                              let tgl_ubah = Fungsi.KonversiTgl(
                                item.tgl_ubah,
                                'DD MMMM YYYY HH:mm:ss',
                              )
                              let terakhir_login = Fungsi.KonversiTgl(
                                item.terakhir_login,
                                'DD MMMM YYYY HH:mm:ss',
                              )
                              return (
                                <CTableRow key={idx}>
                                  <CTableDataCell>{idx + 1}</CTableDataCell>
                                  <CTableDataCell>
                                    <CButtonGroup role="group" aria-label="Basic example">
                                      <CButton 
                                        type='button' 
                                        title='Ubah data ini ?' 
                                        color='warning' size="sm" 
                                        onClick={() => loadUbah(item.namapengguna,item.sandipengguna,item.level_akses,item.status_akun)}
                                        >
                                        <FontAwesomeIcon icon={faPencil} />
                                      </CButton>
                                      <CButton 
                                        type='button' 
                                        title='Hapus data ini ?' 
                                        color='danger' size="sm" 
                                        onClick={() => hapusData(item.namapengguna)}
                                        >
                                        <FontAwesomeIcon icon={faTrash} />
                                      </CButton>
                                    </CButtonGroup>
                                  </CTableDataCell>
                                  <CTableDataCell>{item.namapengguna}</CTableDataCell>
                                  <CTableDataCell>{item.sandipengguna}</CTableDataCell>
                                  <CTableDataCell>{item.level_akses}</CTableDataCell>
                                  <CTableDataCell>{item.status_akun}</CTableDataCell>
                                  <CTableDataCell>{tgl_create}</CTableDataCell>
                                  <CTableDataCell>{tgl_ubah}</CTableDataCell>
                                  <CTableDataCell>{terakhir_login}</CTableDataCell>
                                </CTableRow>
                              )
                            })
                          ) : (
                            <CTableRow key={1}>
                              <CTableHeaderCell className="text-center" colSpan={9}>
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

export default Pengguna
