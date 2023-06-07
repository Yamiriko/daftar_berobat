/* eslint-disable prettier/prettier */
import React from 'react'
import { CFooter } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-regular-svg-icons'

const AppFooter = () => {
  return (
    <CFooter>
      <div className="ms-auto">
        <span className="ms-1">
          <FontAwesomeIcon icon={faCopyright} /> 2023 IT RSIA Budhi Mulia.
        </span>
      </div>
      {/* <div className="ms-auto">
        <span className="me-1">Developt by</span>
        <a href="https://github.com/Yamiriko" target="_blank" rel="noopener noreferrer">
          Jean Riko Kurniawan Putra, S.Kom, M.Kom
        </a>
      </div> */}
    </CFooter>
  )
}

export default React.memo(AppFooter)
