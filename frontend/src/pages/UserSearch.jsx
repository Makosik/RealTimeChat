import React, {useState, useContext, useEffect } from 'react'
import Search from '../components/Search'
import { UserContext } from '../context/UserContext'
import SideBar from '../components/SideBar';

const UserSearch = () => {
   const users = useContext(UserContext);
   const [screenWidth, setScreenWidth] = useState(window.innerWidth);
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

   useEffect(() => {
         const handleResize = () => {
            setScreenWidth(window.innerWidth);
         };
         window.addEventListener('resize', handleResize);
   
         return () => {
            window.removeEventListener('resize', handleResize);
         };
      }, []);
   
   return (
      <div className="wrapper">
         {screenWidth < 720 && (
            <button className="burger-menu" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
               ☰
            </button>
         )}
         <SideBar isOpen={isSidebarOpen} />
         <div className='userSearch_wrap'>
            <h2>Поиск пользователей:</h2>
            <Search data={users.users} filterField="name" />
         </div>

      </div>
   )
}

export default UserSearch