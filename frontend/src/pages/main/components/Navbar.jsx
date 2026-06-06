import React from "react";
import { images } from "../../../data/images";
import { useLocation, useNavigate} from "react-router-dom";

/* --- Upper Navbar --- */
const Navbar = () => {
  const [name, setName] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the current page name from the URL
  const getPageName = () => {

    const path = location.pathname;
    
    if (path.includes('/explore')) return 'Explore';
    if (path.includes('/search')) return 'Search';
    if (path.includes('/list')) return 'List';
    if (path.includes('/feeds')) return 'Feeds';
    if (path.includes('/profile')) return 'Profile';
    
    return 'AniTV Tracker'; // Default
  };

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(name)}`);
  }

  return (
    <div>
    <nav className="sticky pt-3 top-0 z-50 w-full bg-zinc-900 border-b border-zinc-800">
      <div className="max-w-full mx-auto px-4">
        <div className="flex items-center justify-around h-16">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={images.logo}
              alt="AniTV Logo"
              className="h-25 w-auto cursor-pointer"
            />
          </div>

          {/* Current Page */}
          <div className="hidden md:block">
            <span className="text-zinc-300 text-2xl font-extrabold">
              {getPageName()}
            </span>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">

            {/* Search */}
            <form onSubmit={handleSubmit} className="flex items-center bg-zinc-800 rounded-md px-3 py-1.5 focus-within:ring-1 focus-within:ring-black">
              <input
                type="text"
                className="bg-transparent outline-none text-sm text-zinc-200 placeholder-zinc-400 w-40 md:w-56"
                value={name}
                onChange={handleChange}
                placeholder="Search Anime"
              />
              <button type="Submit" className="text-zinc-400 hover:text-white transition">
                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="white" d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z"/>
                    </svg>
              </button>
            </form>

            {/* Notifications */}
            <button onClick={() => {setOpen(!open)}} className="relative text-zinc-400 hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="23" height="23">
                    <path fill="white" d="M12 22a2.5 2.5 0 0 0 2.5-2.5h-5A2.5 2.5 0 0 0 12 22Zm7-6V11a7 7 0 0 0-5-6.71V3a2 2 0 1 0-4 0v1.29A7 7 0 0 0 5 11v5l-2 2v1h18v-1l-2-2Z"/>
                </svg>
              {/* Notification dot */}
              <span className="absolute top-0 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

          </div>
        </div>
      </div>
    </nav>
    {
        open && <div className="absolute right-4 z-40 bg-zinc-700 h-[70vh] w-[40vw]">
          <div className="p-4">No Notification</div>
        </div>
      }
    </div>
  );
};

export default Navbar;
