import React, {useRef, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import useClickOutside from '../hooks/useClickOutside';

const PopUpUsers = ({ onClose }) => {
   const token = localStorage.getItem("jwtToken");
   const { id } = useParams();
   const [addedUsers, setAddedUsers] = useState([]);
   const { users } = useContext(UserContext);
   const popUpRef = useRef(null);
   
   useClickOutside(popUpRef, onClose);

   const CleanUsers = []
   for (let i = 0; i < users.length; i++) {
      for (let j = 0; j < addedUsers.length; j++) {
         if (users[i].id === addedUsers[j].user_id) {
            CleanUsers.push(`${users[i].name}`)
         }
      }
   }

   const handleCreate = async () => {

      try {
         const response = await axios.get(`/users/searchAddedUsers/${id}`,
            {
               headers: {
                  Authorization: `${token}`,
                  'Content-Type': 'application/json'
               }
            })
         setAddedUsers(response.data)
      } catch (error) {
         console.log('Ошибка при получении данных', error);
      }
   }

   useEffect(() => {
      handleCreate();
   }, []);

   return (
      <div className='wrapPopUp'>
         <div className="popUp" ref={popUpRef}>
            <h2>Участники:</h2>
            <ul>
               {
                  CleanUsers.map((user,index) => (
                     <li className='popUp_user' key={index}>{user}</li>
                  ))
               }
            </ul>
            <div className="btns">
               <button className='showUsers addBtn popUpBtns' onClick={onClose}>Закрыть</button>
            </div>

         </div>
      </div>
   )
}

export default PopUpUsers