import { NavLink } from "react-router-dom"
 
const AsideBar = ({sourceArray}) => {
  return (
    <aside className="bg-zinc-800 text-white overflow-y-auto">
      <ul className="flex flex-col gap-1 p-3 text-sm uppercase tracking-wider">
        {sourceArray.map(([path, label]) => (
          <li key={path}>
            <NavLink
              to={path}          // relative path
              end                // prevents partial matching
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md transition-all duration-100 ${
                  isActive ? "bg-blue-600" : "hover:bg-zinc-700"
                }`
              }
            >
              <span className="text-white text-xl font-extrabold">{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default AsideBar