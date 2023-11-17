import { NavLink, Outlet } from 'react-router-dom'

export default function Root() {
  return (
    <div className='v-full'>
        <div id="navbar" className='flex'>
            <NavLink to="/">Autocedi</NavLink>
            <NavLink to="automations/create">Automations</NavLink>
        </div>
        <div id="page" className='h-full w-full'>
            <Outlet />
        </div>
    </div>
  )
}
