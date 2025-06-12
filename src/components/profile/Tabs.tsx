import { FingerPrintIcon, UserIcon } from '@heroicons/react/20/solid'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

const tabs = [
  { name: 'Mi Cuenta', href: '/profile', icon: UserIcon },
  { name: 'Cambiar Password', href: '/profile/change-password', icon: FingerPrintIcon },
]

export default function Tabs() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentTab = tabs.filter(tab => tab.href === location.pathname)[0].href

  return (
    <div className='mb-10'>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-slate-300 focus:border-purple-800 dark:focus:border-purple-300 focus:ring-purple-800 dark:focus:ring-purple-300"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => navigate(e.target.value)}
          value={currentTab}
        >
          {tabs.map((tab) => (
            <option
              value={tab.href}
              key={tab.name}>
                {tab.name}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden sm:block">
        <div className="border-b border-slate-200 dark:border-slate-200/60">
          <nav className="-mb-px flex justify-center space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <NavLink
                key={tab.name}
                to={tab.href}
                end
                className={({ isActive }) =>
                  `group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium transition-colors duration-300 
                  ${isActive
                    ? 'border-purple-800 text-purple-800 dark:border-purple-400 dark:text-purple-400'
                    : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:text-slate-300 dark:hover:border-slate-200 dark:hover:text-slate-100'}`
                  }
              >
              {({ isActive }) => (
                <>
                  <tab.icon
                    className={`-ml-0.5 mr-2 size-5 transition-colors duration-300 ${isActive ? 'text-purple-800 dark:text-purple-400 ' : 'text-slate-400 group-hover:text-slate-500 dark:group-hover:text-slate-100 dark:text-slate-300'}`
                    }
                    aria-hidden="true"
                  />
                  <span>{tab.name}</span>
                </>
              )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}