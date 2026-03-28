import { NavLink } from 'react-router-dom'

export default function Navbar({ studentCount }) {
  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors px-4 py-2 rounded-xl ${
      isActive ? 'bg-stone-900 text-white' : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'
    }`

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-20">
      <div className="w-full px-12 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-stone-900 flex items-center justify-center">
            <span className="text-white text-sm font-bold">U</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-stone-900 leading-none">University Portal</p>
            <p className="text-xs text-stone-400 mt-0.5">{studentCount} students enrolled</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          <NavLink to="/"         className={linkClass} end>Dashboard</NavLink>
          <NavLink to="/students" className={linkClass}>Students</NavLink>
          <NavLink to="/add"      className={linkClass}>Add Student</NavLink>
          <NavLink to="/profiles" className={linkClass}>Profiles</NavLink>
        </nav>

      </div>
    </header>
  )
}
