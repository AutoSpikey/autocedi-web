import { Outlet } from 'react-router-dom'
import NavItem from './components/NavItem'

export default function Root() {
  return (
    <div className='v-full align-middle '>

      <div className="m-2 py-4 px-2">
        <NavItem to="/" label="Home" />
        <NavItem to="automations" label="Automations" />
      </div>

      <div className="border-b w-full"></div>

      <div id="page" className='h-full w-full'>
        <Outlet />
      </div>

    </div>

  )
}
