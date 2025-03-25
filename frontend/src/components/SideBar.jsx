import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PopUpExit from './PopUpExit';
import { UserContext } from '../context/UserContext';

const SideBar = ({ isOpen }) => {
   const navigate = useNavigate();
   const [active, setActive] = useState(false);
   const {userName} = useContext(UserContext)

   return (
      <div className={`sideBar ${isOpen ? '' : 'hidden'}`}>
         <div className="userIcon"></div>
         <div className='userName'>{userName}</div>
         <ul> 
            <li onClick={() => navigate("/usersearch")}>Пользователи</li>
            <li onClick={() => navigate("/channels")}>Каналы</li>
            <li onClick={() => setActive(true)}>Выйти</li>
            {active && <PopUpExit onClose={() => setActive(false)} />}
         </ul>
      </div>
   )
}

export default SideBar