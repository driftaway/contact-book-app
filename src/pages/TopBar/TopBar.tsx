import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Contacts from '../Contacts'
import Settings from '../Settings'

const ROUTES = [
  { path: '/contacts', component: <Contacts />},
  { path: '/settings', component: <Settings />},
]

const TopBar = () => {
  return (
    <Routes>
      {ROUTES.map(({ path, component }) => (
        <Route key={path} path={path} element={component} />
      ))}
    </Routes>
  )
}

export default TopBar