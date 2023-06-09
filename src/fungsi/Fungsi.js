/* eslint-disable prettier/prettier */
const momentjs = require('moment-timezone')
require('moment/locale/id')
const swal = require('sweetalert')
const Base64 = require('base-64')
const sha512 = require('js-sha512')
const $ = require('jquery')

// eslint-disable-next-line no-restricted-globals
// var serverGlobal = 'http://' + location.hostname + ':81'
var serverGlobal = 'http://localhost:81/api'
var kontentipe = 'application/x-www-form-urlencoded; charset=UTF-8'
var linkLogin = serverGlobal + '/login_pengguna'

//Berobat
var linkBerobat = serverGlobal + '/tampil_berobat'

//Pasien
var linkPasien = serverGlobal + '/tampil_pasien'
var linkAddPasien = serverGlobal + '/tambah_pasien'
var linkEditPasien = serverGlobal + '/ubah_pasien'
var linkDelPasien = serverGlobal + '/hapus_pasien'

//Pengguna
var linkPengguna = serverGlobal + '/tampil_pengguna'
var linkAddPengguna = serverGlobal + '/tambah_pengguna'
var linkEditPengguna = serverGlobal + '/ubah_pengguna'
var linkDelPengguna = serverGlobal + '/hapus_pengguna'

//Skrinning
var linkSkrining = serverGlobal + '/tampil_skrining'

//Staff
var linkStaff = serverGlobal + '/tampil_staff'

function loading_swal() {
  let span = document.createElement('span')
  span.innerHTML =
    '<h3><i class="fas fa-spinner fa-pulse fa-3x fa-fw"></i> Mohon Ditunggu...<h3><br><br>'
  swal({
    content: span,
    html: true,
    icon: 'info',
    closeOnClickOutside: false,
    closeOnEsc: false,
    buttons: false,
  })
}

var cari_data = function (nama_tabel, nama_field, kondisi) {
  let sql
  if (nama_tabel && kondisi && kondisi) {
    sql = 'SELECT ' + nama_field + ' '
    sql += 'FROM ' + nama_tabel + ' ' + kondisi
  } else {
    sql = ''
    console.log('Parameter Kueri Belum Lengkap !')
    console.log('nama_tabel : ' + nama_tabel)
    console.log('nama_field : ' + nama_field)
    console.log('kondisi : ' + kondisi)
  }
  return sql
}

var cari_data_debug = function (nama_tabel, nama_field, kondisi) {
  let sql
  if (nama_tabel && kondisi && kondisi) {
    sql = 'SELECT ' + nama_field + ' '
    sql += 'FROM ' + nama_tabel + ' ' + kondisi
    console.log('Kueri Lengkap: \n' + sql)
  } else {
    sql = ''
    console.log('Parameter Kueri Belum Lengkap !')
    console.log('nama_tabel : ' + nama_tabel)
    console.log('nama_field : ' + nama_field)
    console.log('kondisi : ' + kondisi)
  }
  return sql
}

var simpan_data = function (nama_tabel, nama_field, value_field) {
  let sql
  if (nama_tabel && nama_field && value_field) {
    sql = 'INSERT INTO ' + nama_tabel + '(' + nama_field + ') '
    sql += 'VALUES(' + value_field + ')'
  } else {
    sql = ''
    console.log('Parameter Kueri Belum Lengkap !')
    console.log('nama_tabel : ' + nama_tabel)
    console.log('nama_field : ' + nama_field)
    console.log('value_field : ' + value_field)
  }
  return sql
}

var simpan_data_debug = function (nama_tabel, nama_field, value_field) {
  let sql
  if (nama_tabel && nama_field && value_field) {
    sql = 'INSERT INTO ' + nama_tabel + '(' + nama_field + ') '
    sql += 'VALUES(' + value_field + ')'
    console.log('Kueri Lengkap: \n' + sql)
  } else {
    sql = ''
    console.log('Parameter Kueri Belum Lengkap !')
    console.log('nama_tabel : ' + nama_tabel)
    console.log('nama_field : ' + nama_field)
    console.log('value_field : ' + value_field)
  }
  return sql
}

var simpan_data_ignore = function (nama_tabel, nama_field, value_field) {
  let sql
  if (nama_tabel.length > 0 && nama_field.length > 0 && value_field.length > 0) {
    sql = 'INSERT IGNORE INTO ' + nama_tabel + '(' + nama_field + ') '
    sql += 'VALUES(' + value_field + ')'
    // console.log("Kueri Lengkap: \n" + sql);
  } else {
    sql = ''
    console.log('Parameter Kueri Belum Lengkap !')
    console.log('nama_tabel : ' + nama_tabel)
    console.log('nama_field : ' + nama_field)
    console.log('value_field : ' + value_field)
  }
  return sql
}

var simpan_multi = function (nama_tabel, nama_field, value_field) {
  let sql
  if (nama_tabel && nama_field && value_field) {
    sql = 'INSERT INTO ' + nama_tabel + '(' + nama_field + ') '
    sql += 'VALUES ' + value_field + ''
    // console.log("Kueri Lengkap: \n" + sql);
  } else {
    sql = ''
    // console.log("Parameter Kueri Belum Lengkap !");
    // console.log("nama_tabel : " + nama_tabel);
    // console.log("nama_field : " + nama_field);
    // console.log("value_field : " + value_field);
  }
  return sql
}

var simpan_multi_debug = function (nama_tabel, nama_field, value_field) {
  let sql
  if (nama_tabel && nama_field && value_field) {
    sql = 'INSERT INTO ' + nama_tabel + '(' + nama_field + ') VALUES ' + value_field + ''
    console.log('Kueri Lengkap: \n' + sql)
  } else {
    sql = ''
    console.log('Parameter Kueri Belum Lengkap !')
    console.log('nama_tabel : ' + nama_tabel)
    console.log('nama_field : ' + nama_field)
    console.log('value_field : ' + value_field)
  }
  return sql
}

var simpan_multi_duplicate = function (nama_tabel, nama_field, value_field, duplicatenya) {
  let sql
  if (nama_tabel && nama_field && value_field) {
    sql = 'INSERT INTO ' + nama_tabel + '(' + nama_field + ') '
    sql += 'VALUES ' + value_field + ' '
    sql += 'ON DUPLICATE KEY UPDATE ' + duplicatenya
  } else {
    sql = ''
  }
  return sql
}

var simpan_multi_duplicate_debug = function (nama_tabel, nama_field, value_field, duplicatenya) {
  let sql
  if (nama_tabel && nama_field && value_field) {
    sql = 'INSERT INTO ' + nama_tabel + '(' + nama_field + ') '
    sql += 'VALUES ' + value_field + ' '
    sql += 'ON DUPLICATE KEY UPDATE ' + duplicatenya
    console.log('Kueri Lengkap: \n' + sql)
  } else {
    sql = ''
    console.log('Parameter Kueri Belum Lengkap !')
    console.log('nama_tabel : ' + nama_tabel)
    console.log('nama_field : ' + nama_field)
    console.log('value_field : ' + value_field)
  }
  return sql
}

//nama_tabel,nama_field,value_field,gbrBase64
var simpan_data_base64 = function (nama_tabel, nama_field, field_base64, value_field, gbrBase64) {
  let sql

  // let base64Data = req.rawBody.replace(/^data:image\/png;base64,/, "");

  if (nama_tabel && nama_field && value_field && field_base64 && gbrBase64) {
    sql = 'INSERT INTO ' + nama_tabel + '(' + nama_field + ',' + field_base64 + ') '
    sql += 'VALUES(' + value_field + ',' + gbrBase64 + ')'
    // console.log("Kueri Lengkap: \n" + sql);
  } else {
    sql = ''
    console.log('Parameter Kueri Belum Lengkap !')
    console.log('nama_tabel : ' + nama_tabel)
    console.log('nama_field : ' + nama_field)
    console.log('field_base64 : ' + field_base64)
    console.log('value_field : ' + value_field)
    console.log('field_base64 : ' + field_base64)
  }
  return sql
}

var ubah_data = function (nama_tabel, nama_field, kondisi) {
  let sql
  if (nama_tabel && nama_field && kondisi) {
    sql = 'UPDATE ' + nama_tabel + ' SET ' + nama_field + ' '
    sql += 'WHERE ' + kondisi + ''
  } else {
    sql = ''
  }
  return sql
}

var ubah_data_debug = function (nama_tabel, nama_field, kondisi) {
  let sql
  if (nama_tabel && nama_field && kondisi) {
    sql = 'UPDATE ' + nama_tabel + ' SET ' + nama_field + ' WHERE ' + kondisi + ''
    console.log('Kueri Lengkap: \n' + sql)
  } else {
    sql = ''
    console.log('Parameter Kueri Belum Lengkap !')
    console.log('nama_tabel : ' + nama_tabel)
    console.log('kondisi : ' + kondisi)
  }
  return sql
}

var hapus_data = function (nama_tabel, kondisi) {
  let sql
  if (nama_tabel && kondisi) {
    sql = 'DELETE FROM ' + nama_tabel + ' '
    sql += 'WHERE ' + kondisi + ''
  } else {
    sql = ''
  }
  return sql
}

var hapus_data_debug = function (nama_tabel, kondisi) {
  let sql
  if (nama_tabel && kondisi) {
    sql = 'DELETE FROM ' + nama_tabel + ' '
    sql += 'WHERE ' + kondisi + ''
    console.log('Kueri Lengkap: \n' + sql)
  } else {
    sql = ''
    console.log('Parameter Kueri Belum Lengkap !')
    console.log('nama_tabel : ' + nama_tabel)
    console.log('kondisi : ' + kondisi)
  }
  return sql
}

var kosongkan_data_debug = function (nama_tabel) {
  let sql
  if (nama_tabel) {
    sql = 'TRUNCATE TABLE `' + nama_tabel + '`'
    console.log('Kueri Lengkap: \n' + sql)
  } else {
    sql = ''
    console.log('Parameter Kueri Belum Lengkap !')
    console.log('nama_tabel : ' + nama_tabel)
  }
  return sql
}

var kosongkan_data = function (nama_tabel) {
  let sql
  if (nama_tabel) {
    sql = 'TRUNCATE TABLE `' + nama_tabel + '`'
  } else {
    sql = ''
  }
  return sql
}

var urlToFile = function (url, filename, mimeType) {
  return fetch(url)
    .then(function (res) {
      return res.arrayBuffer()
    })
    .then(function (buf) {
      return new File([buf], filename, { type: mimeType })
    })

  /* m 
  Usage example:
  urltoFile('data:text/plain;base64,aGVsbG8gd29ybGQ=', 'hello.txt','text/plain')
  .then(function(file){ console.log(file);});
  */
}

var dataURLtoFile = function (dataurl, filename) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, { type: mime })

  /*
  var file = dataURLtoFile('data:text/plain;base64,aGVsbG8gd29ybGQ=','hello.txt');
  console.log(file);
  */
}

var waktu_sekarang = function (formatnya) {
  //DDMMYYYYHH
  let tampil_sekarang = momentjs().locale('ID').tz('Asia/Jakarta').format(formatnya)
  return tampil_sekarang
}

var konversi_tgl = function (tglnya, formatnya) {
  momentjs().locale('id')
  let hasilnya = momentjs(tglnya).tz('Asia/Jakarta').format(formatnya)
  return hasilnya
}

const buka_link = (linknya) => {
  window.location = linknya
}

function logout() {
  swal({
    title: 'Kamu Mau Logout ?',
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
        className: 'btn btn-success',
      },
    },
  }).then((value) => {
    if (value === 'ya') {
      loading_swal()
      sessionStorage.clear()
      setTimeout(() => {
        swal.close()
        buka_link('/#/login')
      }, 3000)
    }
  })
}

function loadSession() {
  const data = {
    namapengguna: sessionStorage.getItem('namapengguna'),
    sandipengguna: sessionStorage.getItem('sandipengguna'),
  }
  return data
}

function saveSession(datanya) {
  sessionStorage.setItem('namapengguna', datanya.namapengguna)
  sessionStorage.setItem('sandipengguna', datanya.sandipengguna)
}

function statusLogin() {
  let pengguna = loadSession().namapengguna
  let psw = loadSession().sandipengguna
  if (!pengguna && !psw) {
    return false
  } else {
    return true
  }
}

function disableF12() {
  $(document).keydown(function (event) {
    if (event.keyCode === 123) {
      return false
    }
  })

  $(document).contextmenu(function (ev) {
    ev.preventDefault()
    return false
  })
}

function FilterTahun() {
  momentjs().locale('id')
  let thnIni = momentjs().tz('Asia/Jakarta').format('YYYY')
  let cnvThnIni = parseInt(thnIni) + 5
  let rangeThn = 2018
  const arr = []
  arr.push({ label: '-Pilih-', value: null })
  for (let i = cnvThnIni; i >= rangeThn; i--) {
    if (i === parseInt(thnIni)){
      arr.push({ label: i, value: i, selected: true })
    }
    else{
      arr.push({ label: i, value: i })
    }
  }
  return arr
}

function FilterBulan() {
  let byk = 12
  const arr = []
  arr.push({ label: '-Pilih-', value: '' })
  for (let i = 1; i <= byk; i++) {
    if (i >= 1 && i <= 9) {
      arr.push({ label: '0' + i, value: '0' + i })
    } else {
      arr.push({ label: i, value: i })
    }
  }
  return arr
}

function FormatUang(angka, prefix) {
  return prefix + angka.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function TotalWaktu(durations) {
  // const durations = [
  //   '1:00:00',
  //   '1:00:00',
  //   '1:00:00',
  // ]
  
  if (durations.length !== 0) {
    const totalDurations = durations.slice(1)
    .reduce((prev, cur) => momentjs.duration(cur).add(prev),
    momentjs.duration(durations[0]))  
    let waktunya = momentjs.utc(totalDurations.asMilliseconds()).format("HH:mm:ss")
    return waktunya
  }
  else{
    return null
  }
}

function RataRataWaktu(durations) {
  // const durations = [
  //   '1:00:00',
  //   '1:00:00',
  //   '1:00:00',
  // ]
  
  if (durations.length !== 0) {
    const totalDurations = durations.slice(1)
    .reduce((prev, cur) => momentjs.duration(cur).add(prev),
    momentjs.duration(durations[0]))  
    let waktunya = momentjs.utc(totalDurations.asMilliseconds() / durations.length).format("HH:mm:ss")
    return waktunya
  }
  else{
    return null
  }
}

var lihat_password = function(selektor_input) {
  /*
  Require Font Awesome 5
  Panggil Fungsi ini pada Jquery Click
  atau pada OnClick
  */
  if ($("#" + selektor_input).attr("type") === 'password'){
    $("#" + selektor_input).attr("type","text")
    return true
  }
  else if ($("#" + selektor_input).attr("type") === 'text'){
    $("#" + selektor_input).attr("type","password")
    return false
  }
}

function StandarLevel() {
  const defaultLevel = [
    "Admin",
    "Operator",
    "Owner",
  ]
  return defaultLevel
}

function base64Encode(params) {
  if (params){
    return Base64.encode(params)
  }
  else{
    return null
  }
}

function base64Decode(params) {
  if (params){
    return Base64.decode(params)
  }
  else{
    return null
  }
}

function huruf_besar(selektor) {
  let inputtan = $("#" + selektor).val();
  let henshin = inputtan.toUpperCase();
  $("#" + selektor).val(henshin).change();
}

module.exports = {
  kontentipe: kontentipe,
  linkLogin: linkLogin,
  linkBerobat: linkBerobat,
  linkPasien: linkPasien,
  linkAddPasien: linkAddPasien,
  linkEditPasien: linkEditPasien,
  linkDelPasien: linkDelPasien,
  linkPengguna: linkPengguna,
  linkAddPengguna: linkAddPengguna,
  linkEditPengguna: linkEditPengguna,
  linkDelPengguna: linkDelPengguna,
  linkSkrining: linkSkrining,
  linkStaff: linkStaff,
  loadingSwal: function () {
    return loading_swal()
  },
  CariData: function (nama_tabel, nama_field, kondisi) {
    return cari_data(nama_tabel, nama_field, kondisi)
  },
  CariDataDebug: function (nama_tabel, nama_field, kondisi) {
    return cari_data_debug(nama_tabel, nama_field, kondisi)
  },
  SimpanSingle: function (nama_tabel, nama_field, value_field) {
    return simpan_data(nama_tabel, nama_field, value_field)
  },
  SimpanSingleDebug: function (nama_tabel, nama_field, value_field) {
    return simpan_data_debug(nama_tabel, nama_field, value_field)
  },
  SimpanSingleIgnore: function (nama_tabel, nama_field, value_field) {
    return simpan_data_ignore(nama_tabel, nama_field, value_field)
  },
  SimpanMulti: function (nama_tabel, nama_field, value_field) {
    return simpan_multi(nama_tabel, nama_field, value_field)
  },
  SimpanMultiDebug: function (nama_tabel, nama_field, value_field) {
    return simpan_multi_debug(nama_tabel, nama_field, value_field)
  },
  SimpanMultiDuplicate: function (nama_tabel, nama_field, value_field, duplicatenya) {
    return simpan_multi_duplicate(nama_tabel, nama_field, value_field, duplicatenya)
  },
  SimpanMultiDuplicateDebug: function (nama_tabel, nama_field, value_field, duplicatenya) {
    return simpan_multi_duplicate_debug(nama_tabel, nama_field, value_field, duplicatenya)
  },
  SimpanBase64: function (nama_tabel, nama_field, field_base64, value_field, gbrBase64) {
    return simpan_data_base64(nama_tabel, nama_field, field_base64, value_field, gbrBase64)
  },
  Ubah: function (nama_tabel, nama_field, kondisi) {
    return ubah_data(nama_tabel, nama_field, kondisi)
  },
  UbahDebug: function (nama_tabel, nama_field, kondisi) {
    return ubah_data_debug(nama_tabel, nama_field, kondisi)
  },
  Hapus: function (nama_tabel, kondisi) {
    return hapus_data(nama_tabel, kondisi)
  },
  HapusDebug: function (nama_tabel, kondisi) {
    return hapus_data_debug(nama_tabel, kondisi)
  },
  KosongkanData: function (nama_tabel) {
    return kosongkan_data(nama_tabel)
  },
  KosongkanDataDebug: function (nama_tabel) {
    return kosongkan_data_debug(nama_tabel)
  },
  UrlToFile: function (url, filename, mimeType) {
    return urlToFile(url, filename, mimeType)
  },
  DataUrlToFile: function (dataurl, filename) {
    return dataURLtoFile(dataurl, filename)
  },
  WaktuSekarang: function (formatnya) {
    return waktu_sekarang(formatnya)
  },
  KonversiTgl: function (tglnya, formatnya) {
    return konversi_tgl(tglnya, formatnya)
  },
  GetIpLocal: function () {
    // eslint-disable-next-line no-restricted-globals
    return location.hostname
  },
  BukaLink: function (alamatnya) {
    return buka_link(alamatnya)
  },
  logout: function () {
    return logout()
  },
  loadSession: function () {
    return loadSession()
  },
  saveSession: function (datanya) {
    return saveSession(datanya)
  },
  statusLogin: function () {
    return statusLogin()
  },
  disableF12: function () {
    return disableF12()
  },
  FilterTahun: function () {
    return FilterTahun()
  },
  FilterBulan: function () {
    return FilterBulan()
  },
  FormatUang: function (angka,prefix) {
    return FormatUang(angka,prefix)
  },
  TotalWaktu: function (durasi) {
    return TotalWaktu(durasi)
  },
  RataRataWaktu: function (durasi) {
    return RataRataWaktu(durasi)
  },
  LihatPassword: function (selektor_input) {
    return lihat_password(selektor_input)
  },
  StandarLevel: function () {
    return StandarLevel()
  },
  base64Encode: function (params) {
    return base64Encode(params)
  },
  base64Decode: function (params) {
    return base64Decode(params)
  },
  hash512: function (str) {
    return sha512.sha512(str)
  },
  huruf_besar: function (selektor) {
    huruf_besar(selektor)
  }
}
