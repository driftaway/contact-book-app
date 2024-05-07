import React from 'react'
import './LeftMenu.scss'
import { Button } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { People, Settings } from '@mui/icons-material'

const MENU_ITEMS = [
  { name: 'Contacts', slug: '', muiIcon: <People /> },
  { name: 'Settings', slug: 'settings', muiIcon: <Settings /> },
]

const LeftMenuList = () => {
  return (
    <div className='left-menu__body'>
      <span className='left-menu__body-header'>MENU</span>

      <div className='left-menu__body-items'>
        {MENU_ITEMS.map(({ name, slug, muiIcon }) => (
          <NavLink key={slug} to={slug}>
            <Button startIcon={muiIcon} fullWidth key={slug}>
              {name}
            </Button>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default LeftMenuList
