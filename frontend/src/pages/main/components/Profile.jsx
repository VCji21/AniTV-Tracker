import { useState, useEffect } from 'react'
import img from "../../../assets/images/defAvatar.png"
import { Link, Outlet, useLocation } from 'react-router-dom';
import { get_backend_data, backendApi } from '../../../service/api';

const Profile = () => {
  const [user, setUser] = useState({})
  const [data, setData] = useState({})
  const [preview, setPreview] = useState(null);
  
  useEffect(() => {
    // Provide user info
    const UserGetData = async () => {
      const res = await get_backend_data(`/api/users/me`)
      setUser(res);
      if (res.profile_image)
        setPreview(`${backendApi}/uploads/${res.profile_image}`);
    };
 
    // Set values for dashboard
    const getDashboardData = async () => {
      const res = await get_backend_data(`/api/anime/mylist`);
      let shows = res.data.length;
      let episodes = 0;
      let watched = 0;
      res.data.forEach(anime => {
        episodes += anime.episode_progress;
        if (anime.status === "Completed") {
          watched += 1;
        }
      });
      setData({watched, shows, episodes})
    };

    UserGetData();
    getDashboardData();
  }, []);


  const location = useLocation();

  if(location.pathname === "/profile/edit") {
    return (
      <Outlet />
    )
  }

  if(location.pathname === "/profile/settings") {
    return (
      <Outlet />
    )
  }
 
  return (
    <main className="p-10 bg-black">

      {/* User preview */}
      <div className="flex flex-col justify-center items-center gap-2 p-10">
        <div className="bg-zinc-400 w-48 h-48 rounded-full overflow-hidden border border-zinc-200">
          <img className="w-full h-full object-cover object-center" src={preview || img} alt="Profile Picture" />
        </div>
        <div className="py-1 text-3xl text-red-500 font-bold">{user.username || "Guest"}</div>
        <div className="px-3 py-1 w-[30vw] min-w-[300px] text-center m-auto text-xs">{user.bio || ""}</div>
        <div className="px-3 py-1 bg-zinc-400/30 rounded-md text-xs w-fit">Public</div>
      </div>

      {/* Followers and Following */}
      <div className="flex justify-center items-center p-10 max-w-200 mx-auto">
        <div className="flex flex-col justify-center items-center gap-2 w-[50%] border-x p-3">
          <div className="text-4xl p-3 font-bold">{user.followers}</div>
          <div className="font-bold">Followers</div>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 w-[50%] border-x p-3">
          <div className="text-4xl p-3 font-bold">{user.following}</div>
          <div className='font-bold'>Following</div>
        </div>
      </div>

      {/* Edit and Settings button */}
      <div className="flex justify-center items-center gap-7 p-10">
        <Link  to="edit" className="flex gap-1 px-2 py-1 bg-zinc-400/30 border border-zinc-200 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="18" height="18">
            <path fill="white" d="M535.6 85.7C513.7 63.8 478.3 63.8 456.4 85.7L432 110.1L529.9 208L554.3 183.6C576.2 161.7 576.2 126.3 554.3 104.4L535.6 85.7zM236.4 305.7C230.3 311.8 225.6 319.3 222.9 327.6L193.3 416.4C190.4 425 192.7 434.5 199.1 441C205.5 447.5 215 449.7 223.7 446.8L312.5 417.2C320.7 414.5 328.2 409.8 334.4 403.7L496 241.9L398.1 144L236.4 305.7zM160 128C107 128 64 171 64 224L64 480C64 533 107 576 160 576L416 576C469 576 512 533 512 480L512 384C512 366.3 497.7 352 480 352C462.3 352 448 366.3 448 384L448 480C448 497.7 433.7 512 416 512L160 512C142.3 512 128 497.7 128 480L128 224C128 206.3 142.3 192 160 192L256 192C273.7 192 288 177.7 288 160C288 142.3 273.7 128 256 128L160 128z"/>
          </svg>
          <span className="text-white text-sm">Edit Profile</span>
        </Link>
        <Link to="settings" className="flex gap-1 px-2 py-1 bg-zinc-400/30 border border-zinc-200 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="18" height="18">
            <path fill="white" d="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z"/>
          </svg>
          <span className="text-white text-sm">Settings</span>
        </Link>
      </div>
      <hr className='border-red-900 border-1 my-5'/>

      {/* Dashboard */}
      <div className="flex flex-col justify-center items-center p-10">
        <h2 className="text-7xl text-red-500 font-extrabold">Dashboard</h2>        
        <div className="mt-20 p-10 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 justify-items-center items-center w-full">
          {[
            [data.watched, "Show Completed"],
            [data.episodes, "Total Episodes"],
            [data.shows, "Total Shows"],
          ].map(([data, title]) => {
              return (<div key={title} className="p-[10px] min-w-50 bg-zinc-500/50 border border-zinc-200 rounded-md place-items-center">
              <div className="place-self-start text-sm text-zinc-100/30 pb-3 font-bold">All Time</div>
              <div className="text-4xl p-3 font-bold">{data}</div>
              <div className="text-xl pt-3 font-bold">{title}</div>
            </div>)
          })}
        </div>
      </div>
    </main>
  )
}

export default Profile