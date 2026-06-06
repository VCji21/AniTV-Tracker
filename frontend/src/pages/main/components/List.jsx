import AsideBar from './AsideBar'
import { Outlet } from 'react-router-dom';
 
const List = () => {

  const sourceArray = [
    ["all", "All"],
    ["watching", "Watching"],
    ["complete", "Completed"],
    ["plantowatch", "Plan to Watch"],
    ["onhold", "On Hold"],
    ["dropped", "Dropped"],
  ];

  return (
    <div className="grid md:grid-cols-[16rem_1fr] md:grid-rows-1 sm:grid-cols-1 sm:grid-rows-[10rem_1fr] min-h-[calc(100vh-8rem)] h-auto">
      <AsideBar sourceArray={sourceArray} />
      <main className="bg-black overflow-y-auto p-4">
        <Outlet />
      </main>
    </div>
  )
}

export default List