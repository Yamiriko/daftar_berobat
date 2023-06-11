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
import { faPlus, faRecycle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

const Berobat = () => {
  const [visible, setVisible] = useState(true)
  const [list, setList] = useState([])
  const [listPasien, setListPasien] = useState([])
  const notifier = new AWN({
    maxNotifications: 6,
  })

  function resetForm() {
    $('#form_input').trigger('reset')
    $('#nomr').focus()
    $("#btn_simpan").removeAttr('disabled')
  }

  function tambahData() {
    let nomr = $('#nomr').val()
    let statusberobat = $('#statusberobat').val()
    if (!nomr) {
      //notif masih kurang
      notifier.alert('Pesan System : Nomor Medical Record Tidak Boleh Kosong.')
      $('#nomr').focus()
    }
    else if (!statusberobat) {
      //notif masih kurang
      notifier.alert('Pesan System : Status Berobat Tidak Boleh Kosong.')
      $('#statusberobat').focus()
    }
    else {
      //simpan
      let fd = 'token=' + Token.TokenRahasia()
      fd += '&nomr=' + nomr.trim()
      fd += '&statusberobat=' + statusberobat
      fd += '&namapengguna=' + Fungsi.loadSession().namapengguna
      const optionku = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': Fungsi.kontentipe,
        },
        body: fd,
      }

      fetch(Fungsi.linkAddBerobat, optionku)
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

          fetch(Fungsi.linkDelBerobat, optionku)
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

  function loadPasien() {
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
              name: itm.nomr,
              namapasien: itm.namapasien,
              jeniskelamin: itm.jeniskelamin,
              tgllahir: itm.tgllahir,
              alamat: itm.alamat,
              nohp: itm.nohp
            }
            a.push(b)
          });
          // console.log(a)
          setListPasien(a)
        } else {
          setListPasien(obj)
        }
      })
      .catch((error) => {
        notifier.alert('Pesan Error Load Pasien : ' + error)
      })
  }

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.    
    // console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
    // console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log('On Select')
    console.log(item)
    $('#nomr').val(item.name).change()
    $('#namapasien').val(item.namapasien).change()
    $('#jeniskelamin').val(item.jeniskelamin).change()
    let tgllahir = Fungsi.KonversiTgl(
      item.tgllahir,
      'DD MMMM YYYY',
    )
    $('#tgllahir').val(tgllahir).change()
    $('#alamat').val(item.alamat).change()
    $('#nohp').val(item.nohp).change()
  }

  const handleOnFocus = () => {
    // console.log('Focused')
  }

  function pasienLamaBaru() {
    let jenis_pasien = $('#jenis_pasien').val()
    if (jenis_pasien === 'Lama'){
      console.log('Pasien Lama')
      $('#pasien_baru').fadeOut(1000)
      $('#pasien_lama').fadeIn(1000)
    }
    else if (jenis_pasien === 'Baru'){
      console.log('Pasien Baru')
      $('#pasien_baru').fadeIn(1000)
      $('#pasien_lama').fadeOut(1000)
    }    
  }

  $(".cGPYaj > .wrapper").css('padding-left','0px')

  useEffect(() => {
    tampilData()
    loadPasien()
  }, [])

  var judul = 'Data Berobat'

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
                        <CFormLabel>Jenis Pasien</CFormLabel>
                        <CFormSelect
                          id="jenis_pasien"
                          name="jenis_pasien"
                          aria-label="Default select example"
                          options={[
                            { label: 'Lama', value: 'Lama' },
                            { label: 'Baru', value: 'Baru' },
                          ]}
                          onChange={()=> pasienLamaBaru()}
                        />
                      </div>
                      <div id="pasien_baru" style={{ display:'none' }}>
                        <div className="form-group mb-3">
                          <CButton
                            id='btn_simpan'
                            name='btn_simpan'
                            type="button"
                            title="Daftar Pasien Baru ?"
                            color="success"
                            onClick={() => Fungsi.BukaLink('/#/pasien')}
                          >
                            <FontAwesomeIcon icon={faPlus} /> Registrasi Pasien
                          </CButton>
                        </div>
                      </div>
                      <div id="pasien_lama">
                        <div className="form-group mb-3">
                          <CFormLabel>No Medical Record</CFormLabel>
                          <ReactSearchAutocomplete
                            items={listPasien}
                            onSearch={handleOnSearch}
                            onHover={handleOnHover}
                            onSelect={handleOnSelect}
                            onFocus={handleOnFocus}
                            placeholder='Ketikkan Nomor MR'
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
                            id="nomr"
                            name="nomr"
                            autoComplete="Off"
                            placeholder="No Medical Record"
                            hidden
                          />
                        </div>
                        <div className="form-group mb-3">
                          <CFormLabel>Nama Pasien</CFormLabel>
                          <CFormInput
                            type="text"
                            id="namapasien"
                            name="namapasien"
                            autoComplete="Off"
                            placeholder="Nama Pasien"
                            disabled
                          />
                        </div>
                        <div className="form-group mb-3">
                          <CFormLabel>Jenis Kelamin</CFormLabel>
                          <CFormInput
                            type="text"
                            id="jeniskelamin"
                            name="jeniskelamin"
                            autoComplete="Off"
                            placeholder="Jenis Kelamin"
                            disabled
                          />
                        </div>
                        <div className="form-group mb-3">
                          <CFormLabel>Tanggal Lahir</CFormLabel>
                          <CFormInput
                            type="text"
                            id="tgllahir"
                            name="tgllahir"
                            autoComplete="Off"
                            placeholder="Tanggal Lahir"
                            disabled
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
                            disabled
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
                            disabled
                          />
                        </div>
                        <div className="form-group mb-3">
                          <CFormLabel>Status Berobat</CFormLabel>
                          <CFormSelect
                            id="statusberobat"
                            name="statusberobat"
                            aria-label="Default select example"
                            options={[
                              { label: '-Pilih-', value: '' },
                              { label: 'Kontrol', value: 'Kontrol' },
                              { label: 'Selesai', value: 'Selesai' },
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
                            <CTableHeaderCell className="text-center">Tanggal Berobat</CTableHeaderCell>
                            <CTableHeaderCell className="text-center">Status Berobat</CTableHeaderCell>
                            <CTableHeaderCell className="text-center">Nama Pengguna</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {list.length > 0 ? (
                            list.map((item, idx) => {
                              let tglberobat = Fungsi.KonversiTgl(
                                item.tglberobat,
                                'DD MMMM YYYY',
                              )
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
                                        title='Hapus data ini ?' 
                                        color='danger' size="sm" 
                                        onClick={() => hapusData(item.kdberobat)}
                                        >
                                        <FontAwesomeIcon icon={faTrash} />
                                      </CButton>
                                    </CButtonGroup>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <CTable>
                                      <CTableRow key={0}>
                                        <CTableDataCell>No MR</CTableDataCell>
                                        <CTableDataCell className='text-center'>:</CTableDataCell>
                                        <CTableDataCell>{item.nomr}</CTableDataCell>
                                      </CTableRow>
                                      <CTableRow key={1}>
                                        <CTableDataCell>Nama</CTableDataCell>
                                        <CTableDataCell className='text-center'>:</CTableDataCell>
                                        <CTableDataCell>{item.namapasien}</CTableDataCell>
                                      </CTableRow>
                                      <CTableRow key={2}>
                                        <CTableDataCell>Jenis Kelamin</CTableDataCell>
                                        <CTableDataCell className='text-center'>:</CTableDataCell>
                                        <CTableDataCell>{item.jeniskelamin}</CTableDataCell>
                                      </CTableRow>
                                      <CTableRow key={3}>
                                        <CTableDataCell>Tanggal Lahir</CTableDataCell>
                                        <CTableDataCell className='text-center'>:</CTableDataCell>
                                        <CTableDataCell>{tgllahir}</CTableDataCell>
                                      </CTableRow>
                                      <CTableRow key={4}>
                                        <CTableDataCell>Alamat</CTableDataCell>
                                        <CTableDataCell className='text-center'>:</CTableDataCell>
                                        <CTableDataCell>{item.alamat}</CTableDataCell>
                                      </CTableRow>
                                      <CTableRow key={5}>
                                        <CTableDataCell>Nomor HP</CTableDataCell>
                                        <CTableDataCell className='text-center'>:</CTableDataCell>
                                        <CTableDataCell>{item.nohp}</CTableDataCell>
                                      </CTableRow>
                                    </CTable>
                                  </CTableDataCell>
                                  <CTableDataCell>{tglberobat}</CTableDataCell>
                                  <CTableDataCell>{item.statusberobat}</CTableDataCell>
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
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Berobat
