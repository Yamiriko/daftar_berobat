/* eslint-disable prettier/prettier */
import React, { Component, Suspense } from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import Fungsi from './fungsi/Fungsi'
import './scss/style.scss'

const loading = (
  <>
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  </>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const Mt = React.lazy(() => import('./views/pages/mt/Mt'))
const Konstruksi = React.lazy(() => import('./views/pages/konstruksi/Konstruksi'))
const Suspend = React.lazy(() => import('./views/pages/suspend/Suspend'))
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      statusnya: '',
    }
  }

  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route exact path="/mt" name="Maintenance" element={<Mt />} />
            <Route exact path="/konstruksi" name="Konstruksi" element={<Konstruksi />} />
            <Route exact path="/suspend" name="Suspend" element={<Suspend />} />
            {/* {validasiWebsite()} */}
            {Fungsi.statusLogin() ? (
              <Route path="*" name="Beranda" element={<DefaultLayout />} />
            ) : (
              <Route path="*" name="Beranda" element={<Navigate to="/login" replace />} />
            )}
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
