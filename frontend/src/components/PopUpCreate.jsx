import axios from 'axios';
import React, {useRef, useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { ChannelContext } from '../context/ChannelContext';
import { jwtDecode } from 'jwt-decode';
import useClickOutside from '../hooks/useClickOutside';

const PopUpCreate = ({ onClose, onCreate }) => {

   const [channelName, setChannelName] = useState('');
   const { userId } = useContext(UserContext);
   const {fetchChannels} = useContext(ChannelContext)
   const token = localStorage.getItem("jwtToken");
   const name = jwtDecode(token).name;
   const popUpRef = useRef(null);
   
   useClickOutside(popUpRef, onClose);

   const handleCreate = async () => {
      if (channelName.trim()) {
         try {

            const response = await axios.post('/channels/createChannel', 
               { channelName, userId },
               {
               headers: {
                  Authorization: `${token}`,
                  'Content-Type': 'application/json',
               }
            });
            const channelId = response.data.id;

            await axios.post(`/channels/${channelId}/join`,
               { name },
               {
                  headers: {
                  Authorization: `${token}`,
                  'Content-Type': 'application/json',
               }
               })
            onCreate(response.data);
            await fetchChannels();
            setChannelName('');
            onClose();
         } catch (error) {
            console.log('Ошибка при создании канала');
         }

      }
   }

   return (
      <div className='wrapPopUp'>
         <div className="popUp" ref={popUpRef}>
            <h2>Создать канал</h2>
            <input
               type="text"
               placeholder='Название канала'
               value={channelName}
               onChange={(e) => setChannelName(e.target.value)}
            />
            <div className="btns">
               <button className='cancleBtn popUpBtns' onClick={onClose}>Отмена</button>
               <button className='addBtn popUpBtns' onClick={handleCreate}>Создать</button>
            </div>

         </div>
      </div>
   )
}

export default PopUpCreate