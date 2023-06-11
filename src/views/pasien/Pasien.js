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
import { faPencil, faPlus, faRecycle, faSync, faTrash } from '@fortawesome/free-solid-svg-icons'
import 'flatpickr/dist/themes/material_green.css'
import Flatpickr from 'react-flatpickr'

const Pasien = () => {
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

  function resetForm() {
    $('#form_input').trigger('reset')
    $('#nomr').focus()
    $("#btn_simpan").removeAttr('disabled')
    $("#btn_ubah").attr('disabled',true)
  }

  function tambahData() {
    let nomr = $('#nomr').val()
    let namapasien = $('#namapasien').val()
    let jeniskelamin = $('#jeniskelamin').val()
    let tgllahir = $('#tgllahir').val()
    let alamat = $('#alamat').val()
    let nohp = $('#nohp').val()
    if (!nomr) {
      //notif masih kurang
      notifier.alert('Pesan System : Nomor Medical Record Tidak Boleh Kosong.')
      $('#nomr').focus()
    }
    else if (!namapasien) {
      //notif masih kurang
      notifier.alert('Pesan System : Nama Pasien Tidak Boleh Kosong.')
      $('#namapasien').focus()
    }
    else if (!jeniskelamin) {
      //notif masih kurang
      notifier.alert('Pesan System : Jenis Kelamin Belum Dipilih.')
      $('#jeniskelamin').focus()
    }
    else if (!tgllahir) {
      //notif masih kurang
      notifier.alert('Pesan System : Tanggal Lahir Belum Dipilih.')
      $('#tgllahir').focus()
    }
    else {
      //simpan
      let fd = 'token=' + Token.TokenRahasia()
      fd += '&nomr=' + nomr.trim()
      fd += '&namapasien=' + namapasien.trim()
      fd += '&jeniskelamin=' + jeniskelamin
      fd += '&tgllahir=' + tgllahir
      fd += '&alamat=' + alamat
      fd += '&nohp=' + nohp
      const optionku = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': Fungsi.kontentipe,
        },
        body: fd,
      }

      fetch(Fungsi.linkAddPasien, optionku)
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
    let nomr = $('#nomr').val()
    let namapasien = $('#namapasien').val()
    let jeniskelamin = $('#jeniskelamin').val()
    let tgllahir = $('#tgllahir').val()
    let alamat = $('#alamat').val()
    let nohp = $('#nohp').val()
    if (!nomr) {
      //notif masih kurang
      notifier.alert('Pesan System : Nomor Medical Record Tidak Boleh Kosong.')
      $('#nomr').focus()
    }
    else if (!namapasien) {
      //notif masih kurang
      notifier.alert('Pesan System : Nama Pasien Tidak Boleh Kosong.')
      $('#namapasien').focus()
    }
    else if (!jeniskelamin) {
      //notif masih kurang
      notifier.alert('Pesan System : Jenis Kelamin Belum Dipilih.')
      $('#jeniskelamin').focus()
    }
    else if (!tgllahir) {
      //notif masih kurang
      notifier.alert('Pesan System : Tanggal Lahir Belum Dipilih.')
      $('#tgllahir').focus()
    }
    else {
      //ubah
      let fd = 'token=' + Token.TokenRahasia()
      fd += '&nomr=' + nomr.trim()
      fd += '&namapasien=' + namapasien.trim()
      fd += '&jeniskelamin=' + jeniskelamin
      fd += '&tgllahir=' + tgllahir
      fd += '&alamat=' + alamat
      fd += '&nohp=' + nohp
      const optionku = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': Fungsi.kontentipe,
        },
        body: fd,
      }

      fetch(Fungsi.linkEditPasien, optionku)
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
      notifier.alert('Pesan System : Nomor Medical Record masihlah kosong !')
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
          fd += '&nomr=' + params
          const optionku = {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': Fungsi.kontentipe,
            },
            body: fd,
          }

          fetch(Fungsi.linkDelPasien, optionku)
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

    fetch(Fungsi.linkPasien, optionku)
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

  function loadUbah(nomr,namapasien,jeniskelamin,tgllahir,alamat,nohp) {
    $("#nomr").val(nomr).change()
    $("#namapasien").val(namapasien).change()
    $("#jeniskelamin").val(jeniskelamin).change()
    let vtgllahir = Fungsi.KonversiTgl(
      tgllahir,
      'YYYY-MM-DD',
    )
    $("#tgllahir").val(vtgllahir).change()
    $("#alamat").val(alamat).change()
    $("#nohp").val(nohp).change()
    $("#nomr").focus()
    $("#btn_simpan").attr('disabled',true)
    $("#btn_ubah").removeAttr('disabled')
  }

  $("#btn_ubah").attr('disabled',true)

  useEffect(() => {
    tampilData()
  }, [])

  var judul = 'Data Pasien'

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
                        <CFormLabel>No Medical Record</CFormLabel>
                        <CFormInput
                          type="text"
                          id="nomr"
                          name="nomr"
                          maxLength={15}
                          autoFocus
                          autoComplete="Off"
                          placeholder="No Medical Record"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <CFormLabel>Nama Pasien</CFormLabel>
                        <CFormInput
                          type="text"
                          id="namapasien"
                          name="namapasien"
                          maxLength={50}
                          autoComplete="Off"
                          placeholder="Nama Pasien"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <CFormLabel>Jenis Kelamin</CFormLabel>
                        <CFormSelect
                          id="jeniskelamin"
                          name="jeniskelamin"
                          aria-label="Default select example"
                          options={[
                            { label: '-Pilih-', value: '' },
                            { label: 'Laki-Laki', value: 'Laki-Laki' },
                            { label: 'Perempuan', value: 'Perempuan' },
                          ]}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <CFormLabel>Tanggal Lahir</CFormLabel>
                        <Flatpickr
                          id="tgllahir"
                          name="tgllahir"
                          className="form-control"
                          options={flatpickr}
                          placeholder="Klik Untuk Buka Kalender"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <CFormLabel>Alamat Pasien</CFormLabel>
                        <CFormTextarea 
                          type="text"
                          id="alamat"
                          name="alamat"
                          maxLength={300}
                          rows={3}
                          placeholder="Alamat Pasien"
                        ></CFormTextarea>
                      </div>
                      <div className="form-group mb-3">
                        <CFormLabel>Nomor HP</CFormLabel>
                        <CFormInput
                          type="text"
                          id="nohp"
                          name="nohp"
                          maxLength={50}
                          autoComplete="Off"
                          placeholder="Nomor HP"
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
                  <CCol md={9} className="text-end">
                    <CButton
                      id="btn_refresh"
                      name="btn_refresh"
                      type="button"
                      title="Refresh Data ?"
                      color="cyan"
                      onClick={() => tampilData()}
                    >
                      <FontAwesomeIcon icon={faSync} /> Refresh
                    </CButton>
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
                            <CTableHeaderCell className="text-center">NoMR</CTableHeaderCell>
                            <CTableHeaderCell className="text-center">Nama Pasien</CTableHeaderCell>
                            <CTableHeaderCell className="text-center">Jenis Kelamin</CTableHeaderCell>
                            <CTableHeaderCell className="text-center">Tgl Lahir</CTableHeaderCell>
                            <CTableHeaderCell className="text-center">Alamat</CTableHeaderCell>
                            <CTableHeaderCell className="text-center">Nomor HP</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {list.length > 0 ? (
                            list.map((item, idx) => {
                              let tgllahir = Fungsi.KonversiTgl(
                                item.tgllahir,
                                'DD MMMM YYYY',
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
                                        onClick={() => loadUbah(item.nomr,item.namapasien,item.jeniskelamin,item.tgllahir,item.alamat,item.nohp)}
                                        >
                                        <FontAwesomeIcon icon={faPencil} />
                                      </CButton>
                                      <CButton 
                                        type='button' 
                                        title='Hapus data ini ?' 
                                        color='danger' size="sm" 
                                        onClick={() => hapusData(item.nomr)}
                                        >
                                        <FontAwesomeIcon icon={faTrash} />
                                      </CButton>
                                    </CButtonGroup>
                                  </CTableDataCell>
                                  <CTableDataCell>{item.nomr}</CTableDataCell>
                                  <CTableDataCell>{item.namapasien}</CTableDataCell>
                                  <CTableDataCell>{item.jeniskelamin}</CTableDataCell>
                                  <CTableDataCell>{tgllahir}</CTableDataCell>
                                  <CTableDataCell>{item.alamat}</CTableDataCell>
                                  <CTableDataCell>{item.nohp}</CTableDataCell>
                                </CTableRow>
                              )
                            })
                          ) : (
                            <CTableRow key={1}>
                              <CTableHeaderCell className="text-center" colSpan={8}>
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

export default Pasien
