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
import { faPencil, faPlus, faRecycle, faSync, faTrash } from '@fortawesome/free-solid-svg-icons'
import 'flatpickr/dist/themes/material_green.css'
import Flatpickr from 'react-flatpickr'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import './Staff.css'

const Staff = () => {
  const [visible, setVisible] = useState(true)
  const [list, setList] = useState([])
  const [listPengguna, setListPengguna] = useState([])
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
    $('#kodestaff').focus()
    $("#btn_simpan").removeAttr('disabled')
    $("#btn_ubah").attr('disabled',true)
  }

  function tambahData() {
    let kodestaff = $('#kodestaff').val()
    let namastaff = $('#namastaff').val()
    let jabatanstaff = $('#jabatanstaff').val()
    let tgllahirstaff = $('#tgllahirstaff').val()
    let namapengguna = $('#namapengguna').val()
    if (!kodestaff) {
      //notif masih kurang
      notifier.alert('Pesan System : Kode Staff Tidak Boleh Kosong.')
      $('#kodestaff').focus()
    }
    else if (!namastaff) {
      //notif masih kurang
      notifier.alert('Pesan System : Nama Staff Tidak Boleh Kosong.')
      $('#namastaff').focus()
    }
    else if (!jabatanstaff) {
      //notif masih kurang
      notifier.alert('Pesan System : Jabatan staff Belum Dipilih.')
      $('#jabatanstaff').focus()
    }
    else if (!namapengguna) {
      //notif masih kurang
      notifier.alert('Pesan System : Nama Pengguna Staff Belum Dipilih.')
      $('#namapengguna').focus()
    }
    else {
      //simpan
      let fd = 'token=' + Token.TokenRahasia()
      fd += '&kodestaff=' + kodestaff.trim()
      fd += '&namastaff=' + namastaff.trim()
      fd += '&jabatanstaff=' + jabatanstaff
      fd += '&tgllahirstaff=' + tgllahirstaff
      fd += '&namapengguna=' + namapengguna
      const optionku = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': Fungsi.kontentipe,
        },
        body: fd,
      }

      fetch(Fungsi.linkAddStaff, optionku)
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
    let kodestaff = $('#kodestaff').val()
    let namastaff = $('#namastaff').val()
    let jabatanstaff = $('#jabatanstaff').val()
    let tgllahirstaff = $('#tgllahirstaff').val()
    let namapengguna = $('#namapengguna').val()
    if (!kodestaff) {
      //notif masih kurang
      notifier.alert('Pesan System : Kode Staff Tidak Boleh Kosong.')
      $('#kodestaff').focus()
    }
    else if (!namastaff) {
      //notif masih kurang
      notifier.alert('Pesan System : Nama Staff Tidak Boleh Kosong.')
      $('#namastaff').focus()
    }
    else if (!jabatanstaff) {
      //notif masih kurang
      notifier.alert('Pesan System : Jenis Kelamin Belum Dipilih.')
      $('#jabatanstaff').focus()
    }
    else if (!namapengguna) {
      //notif masih kurang
      notifier.alert('Pesan System : Nama Pengguna Staff Belum Dipilih.')
      $('#namapengguna').focus()
    }
    else {
      //ubah
      let fd = 'token=' + Token.TokenRahasia()
      fd += '&kodestaff=' + kodestaff.trim()
      fd += '&namastaff=' + namastaff.trim()
      fd += '&jabatanstaff=' + jabatanstaff
      fd += '&tgllahirstaff=' + tgllahirstaff
      fd += '&namapengguna=' + namapengguna
      const optionku = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': Fungsi.kontentipe,
        },
        body: fd,
      }

      fetch(Fungsi.linkEditStaff, optionku)
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
          fd += '&kodestaff=' + params
          const optionku = {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': Fungsi.kontentipe,
            },
            body: fd,
          }

          fetch(Fungsi.linkDelStaff, optionku)
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

    fetch(Fungsi.linkStaff, optionku)
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

  function loadUbah(kodestaff,namastaff,jabatanstaff,tgllahirstaff,namapengguna) {
    $("#kodestaff").val(kodestaff).change()
    $("#namastaff").val(namastaff).change()
    $("#jabatanstaff").val(jabatanstaff).change()
    let vtgllahirstaff = Fungsi.KonversiTgl(
      tgllahirstaff,
      'YYYY-MM-DD',
    )
    $("#tgllahirstaff").val(vtgllahirstaff).change()
    $("#namapengguna").val(namapengguna).change()
    $("#kodestaff").focus()
    $("#btn_simpan").attr('disabled',true)
    $("#btn_ubah").removeAttr('disabled')
  }

  function loadPengguna() {
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
      .then((response) => response.json())
      .then((data_json) => {
        let status = data_json.status_tampil
        let obj = []
        obj = data_json.data
        if (status) {
          var a = []
          $.map(obj, function (itm, idx) {            
            let b = {
              id: idx,
              name: itm.namapengguna
            }
            a.push(b)
          });
          // console.log(a)
          setListPengguna(a)
        } else {
          setListPengguna(obj)
        }
      })
      .catch((error) => {
        notifier.alert('Pesan Error System : ' + error)
      })
  }

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.    
    console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
    // console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    // console.log(item)
    $("#namapengguna").val(item.name).change()
  }

  const hendleOnClear = () => {
    $("#namapengguna").val(null).change()
  }

  const handleOnFocus = () => {
    // console.log('Focused')
  }

  $("#btn_ubah").attr('disabled',true)
  $(".cGPYaj > .wrapper").css('padding-left','0px')

  useEffect(() => {
    tampilData()
    loadPengguna()
  }, [])

  var judul = 'Data Staff'

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
                        <CFormLabel>Kode Staff</CFormLabel>
                        <CFormInput
                          type="text"
                          id="kodestaff"
                          name="kodestaff"
                          maxLength={20}
                          autoFocus
                          autoComplete="Off"
                          placeholder="Kode Staff"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <CFormLabel>Nama Staff</CFormLabel>
                        <CFormInput
                          type="text"
                          id="namastaff"
                          name="namastaff"
                          maxLength={50}
                          autoComplete="Off"
                          placeholder="Nama Staff"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <CFormLabel>Jabatan</CFormLabel>
                        <CFormSelect
                          id="jabatanstaff"
                          name="jabatanstaff"
                          aria-label="Default select example"
                          options={[
                            { label: '-Pilih-', value: '' },
                            { label: 'Apotek', value: 'Apotek' },
                            { label: 'Dokter', value: 'Dokter' },
                            { label: 'Perawat', value: 'Perawat' },
                          ]}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <CFormLabel>Akun Pengguna</CFormLabel>
                        <ReactSearchAutocomplete
                          items={listPengguna}
                          onSearch={handleOnSearch}
                          onHover={handleOnHover}
                          onSelect={handleOnSelect}
                          onFocus={handleOnFocus}
                          onClear={hendleOnClear}
                          placeholder='Ketikkan Nama Penggunanya'
                          styling={{
                            height: "34px",
                            border: "1px solid darkgreen",
                            borderRadius: "4px",
                            backgroundColor: "white",
                            boxShadow: "none",
                            hoverBackgroundColor: "lightgreen",
                            color: "darkgreen",
                            fontSize: "12px",
                            fontFamily: "Courier",
                            iconColor: "green",
                            lineColor: "lightgreen",
                            placeholderColor: "darkgreen",
                            clearIconMargin: "3px 8px 0 0",
                            zIndex: 2,
                          }}
                        />
                        <CFormInput
                          type="text"
                          id="namapengguna"
                          name="namapengguna"
                          maxLength={50}
                          autoComplete="Off"
                          placeholder="Nama Pengguna"
                          hidden
                        />
                      </div>
                      <div className="form-group mb-3">
                        <CFormLabel>Tanggal Lahir Staff</CFormLabel>
                        <Flatpickr
                          id="tgllahirstaff"
                          name="tgllahirstaff"
                          className="form-control"
                          options={flatpickr}
                          placeholder="Klik Untuk Buka Kalender"
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
                            <CTableHeaderCell className="text-center">kodestaff</CTableHeaderCell>
                            <CTableHeaderCell className="text-center">Nama Pasien</CTableHeaderCell>
                            <CTableHeaderCell className="text-center">Jenis Kelamin</CTableHeaderCell>
                            <CTableHeaderCell className="text-center">Tgl Lahir</CTableHeaderCell>
                            <CTableHeaderCell className="text-center">Nomor HP</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {list.length > 0 ? (
                            list.map((item, idx) => {
                              let tgllahirstaff = Fungsi.KonversiTgl(
                                item.tgllahirstaff,
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
                                        onClick={() => loadUbah(item.kodestaff,item.namastaff,item.jabatanstaff,item.tgllahirstaff,item.alamat,item.namapengguna)}
                                        >
                                        <FontAwesomeIcon icon={faPencil} />
                                      </CButton>
                                      <CButton 
                                        type='button' 
                                        title='Hapus data ini ?' 
                                        color='danger' size="sm" 
                                        onClick={() => hapusData(item.kodestaff)}
                                        >
                                        <FontAwesomeIcon icon={faTrash} />
                                      </CButton>
                                    </CButtonGroup>
                                  </CTableDataCell>
                                  <CTableDataCell>{item.kodestaff}</CTableDataCell>
                                  <CTableDataCell>{item.namastaff}</CTableDataCell>
                                  <CTableDataCell>{item.jabatanstaff}</CTableDataCell>
                                  <CTableDataCell>{tgllahirstaff}</CTableDataCell>
                                  <CTableDataCell>{item.namapengguna}</CTableDataCell>
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

export default Staff
