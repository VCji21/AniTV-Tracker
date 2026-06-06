import { Routes, Route, Navigate } from "react-router-dom"

/* ------- Navbars for pages ------- */
import Navbar from './components/Navbar'
import NavSec from './components/NavSec'

/* ------- MainPage's Route ------- */
import Explore from './components/Explore'
import Search from './components/search'
import List from './components/List'
import Feeds from './components/Feeds'
import Profile from './components/Profile'

/* ------- List's routes path ------- */
import ListByStatus from "./components/listComp/ListByStatus"

/* ------- Feeds's routes path ------- */
import Home from "./components/feedComp/Home"
import People from "./components/feedComp/People"
import Communtiy from "./components/feedComp/Community"

/* ------- Profile's routes path ------- */
import Edit from "./components/profileComp/Edit"
import Settings from "./components/profileComp/Settings"

/* --- Private Protected App --- */
const Mainpage = () => {

  return (
    <div className='min-h-screen grid grid-rows-[auto_1fr_auto]'>
      <header className='sticky top-0 z-50'>
        <Navbar/>
        <NavSec />
      </header>

      <Routes>
        <Route index element={<Navigate to="explore" replace />} />

        <Route path="explore" element={<Explore />} />
        <Route path="search" element={<Search />} />

        {/* List with routes */}
        <Route path="list" element={<List />}>
          <Route index element={<Navigate to="all" replace />} />
          <Route path=":status" element={<ListByStatus />} /> {/* Dynamic routing */}
          <Route path="*" element={<Navigate to="all" replace />} />
        </Route>

        {/* Feeds with routes */}
        <Route path="feeds" element={<Feeds />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="people" element={<People />} />
          <Route path="communtiy" element={<Communtiy />} />
          <Route path="*" element={<Navigate to="home" replace />} />
        </Route>

        {/* Profile with routes */}
        <Route path="profile" element={<Profile />}>
          <Route path="edit" element={<Edit />}/>
          <Route path="settings" element={<Settings />}/>
        </Route>

        {/* 404 - Catch all undefined routes */}
        <Route path="*" element={<Navigate to="/explore" replace />} />
      </Routes>

      <footer className="p-10 w-full p-5 min-h-[50vh] text-center bg-zinc-900">
        <div>2026 &copy; AniTV Tracker | All Rights Reserved</div><br/>
        <div>Created by: Vishnu Chandak</div>
        <div>Created Between: 18 December 2025 - 28 January 2026</div>
        <div>Created For: LaunchED Global - Capstone Project</div>
      </footer>
    </div>
  )
}

export default Mainpage 