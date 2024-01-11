import { Routes, Route } from 'react-router-dom'
import Contacts from '../../pages/Contacts'
import Settings from '../../pages/Settings'

const ROUTES = [
  { path: '/', component: <Contacts />},
  { path: '/settings', component: <Settings />},
]

const TopBar = () => {
  return (
    <Routes>
      {ROUTES.map(({ path, component }) => <Route key={path} path={path} element={component} />)}
    </Routes>
  )
}

export default TopBar