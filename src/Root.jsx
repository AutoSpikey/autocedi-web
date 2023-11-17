import { Outlet } from 'react-router-dom'
import NavItem from './components/NavItem'

export default function Root() {
  return (
    <div className='v-full align-middle'>
      <div className="m-2 p-2 border-b ">
        <NavItem to="/" label="Home" />
        <NavItem to="automations/create" label="Automations" />
      </div>

        <div id="page" className='h-full w-full'>
            <Outlet />
        </div>
    </div>
  )
}
