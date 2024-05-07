import React from 'react'
import './LeftMenu.scss'
import { Divider } from '@mui/material'
import ImportContactsIcon from '@mui/icons-material/ImportContacts'
import LeftMenuList from './LeftMenuList'

const LeftMenu = () => {
  return (
    <div className='left-menu'>
      <div className='left-menu__header'>
        <ImportContactsIcon />

        <span>Address Book</span>
      </div>

      <Divider />

      <LeftMenuList />
    </div>
  )
}

export default LeftMenu
