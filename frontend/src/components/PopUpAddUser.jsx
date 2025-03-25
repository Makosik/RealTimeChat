import axios from 'axios';
import React, {useRef, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import useClickOutside from '../hooks/useClickOutside';

const PopUpAddUser = ({ onClose }) => {

   const [name, setName] = useState('');
   const token = localStorage.getItem("jwtToken");
   const { id } = useParams();
   const popUpRef = useRef(null);

   useClickOutside(popUpRef, onClose);

   const handleCreate = async () => {
      if (name.trim()) {
         try {
            const response = await axios.post(`/channels/${id}/join`,
               { name },
               {
                  headers: {
                     Authorization: `${token}`,
                     'Content-Type': 'application/json'
                  }
               })
            setName('');
            onClose();
            alert(`Пользователь ${name} добавлен`);
         } catch (error) {
            onClose();
            console.log('Ошибка при добавлении пользователя',error);
            alert('Ошибка при добавлении пользователя')
         }

      }
   }

   return (
      <div className='wrapPopUp'>
         <div className="popUp" ref={popUpRef}>
            <h2>Пригласить пользователя</h2>
            <input
               type="text"
               placeholder='Напишите имя пользователя'
               value={name}
               onChange={(e) => setName(e.target.value)}
            />
            <div className="btns">
               <button className='cancleBtn popUpBtns' onClick={onClose}>Отмена</button>
               <button className='addBtn popUpBtns' onClick={handleCreate}>Отправить</button>
            </div>

         </div>
      </div>
   )
}

export default PopUpAddUser