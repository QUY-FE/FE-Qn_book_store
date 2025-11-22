import { Link, Outlet, useNavigate } from "react-router-dom"
import { BiSolidBookAdd } from "react-icons/bi";
import { RiBookShelfFill ,RiDatabaseLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { UseAuth } from "../../context/AuthContext";
const NavLink = ({to, children, className}) => (
  <Link to={to} className={`inline-flex items-center justify-center py-3 ${className} rounded-lg`}>
    {children}
  </Link>
)

const IconButton = ({onClick, icon, srText, className}) => (
  <button onClick={onClick} 
    className={`relative ${className} p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full`}>
    <span className="sr-only">{srText}</span>
    {icon}
  </button>
)

const DashboardLayout = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/")
  }
  const Links = [
    {
      to: "/dashboard",
      icon: <RiDatabaseLine className="h-6 w-6"/>
    },
    {
      to: "/dashboard/add-new-book",
      icon: <BiSolidBookAdd className="h-6 w-6"/>
    },
    {
      to: "/dashboard/manage-book", 
      icon: <RiBookShelfFill className="h-6 w-6" />
    }
  ]

  return (
    <section className="flex md:bg-gray-100 min-h-screen overflow-hidden">
      <aside className="hidden sm:flex sm:flex-col">
        <a href="/" className="inline-flex items-center justify-center h-20 w-20 bg-purple-600 hover:bg-purple-500">
          <img src="/fav-icon.png" alt="logo" />
        </a>
        <div className="flex-grow flex flex-col justify-between text-gray-500 bg-gray-800">
          <nav className="flex flex-col mx-4 my-6 space-y-4">
            {Links &&  Links.map((link, index) => (
              <NavLink key={index} to={link.to} className={link.className || "hover:text-gray-400 hover:bg-gray-700"}>
                {link.icon}
              </NavLink>
            ))}
          </nav>
          {/* <IconButton 
            icon={<svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>}
            srText="Settings"
          /> */}
        </div>
      </aside>
      <div className="flex-grow text-gray-800">
        <header className="flex items-center h-20 px-6 sm:px-10 bg-white mb-5">
          <div className="flex items-center justify-between w-full">
            <div className="relative w-full flex items-center gap-2 max-w-md">
              <input type="text" placeholder="Search..." className="py-2 pl-2 w-full border-4 border-transparent placeholder-gray-400 focus:bg-gray-50 rounded-lg" />
              <IconButton icon={<FaSearch />}/>
              
            </div>
            
            <div className="flex items-center">
              <div className="hidden md:flex md:flex-col md:items-end mr-3">
                <span className="font-semibold">Admin</span>
                <span className="text-sm text-gray-600">123</span>
              </div>
              <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="profile" className="h-12 w-12 rounded-full" />
              <IconButton 
                className="ml-4"
                onClick={handleLogout}
                icon={<FiLogOut className="h-6 w-6" />}
                srText="Log out"
              />
            </div>
          </div>
        </header>

        <div className="px-6 sm:px-10">
          <div className="flex flex-col md:flex-row justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-semibold">Dashboard</h1>
              <h2 className="text-gray-600">Book Store Inventory</h2>
            </div>
            <div className="flex mt-4 md:mt-0">
              <Link to="/dashboard/manage-book" className="inline-flex px-5 py-3 text-purple-600 hover:text-purple-700 focus:text-purple-700 hover:bg-purple-100 focus:bg-purple-100 border border-purple-600 rounded-md mb-3">Manage Books</Link>
              <Link to="/dashboard/add-new-book" className="inline-flex px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3">Add New Book</Link>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </section>
  )
}

export default DashboardLayout