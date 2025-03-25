import React, { useContext, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useClickOutside from '../hooks/useClickOutside';
import { ChannelContext } from '../context/ChannelContext';
import axios from 'axios';

const PopUpExitFromChannel = ({ onClose }) => {
   const navigate = useNavigate();
   const popUpRef = useRef(null);
   const { id } = useParams();
   const token = localStorage.getItem("jwtToken");
   const { fetchChannels } = useContext(ChannelContext);

   useClickOutside(popUpRef, onClose);

   const onExit = async () => {
      try {
         const res = await axios.delete(`/channels/${id}/exit`,
            {
               headers: {
                  Authorization: `${token}`
               }
            }
         )
         await fetchChannels();
         navigate('/channels');

      } catch (error) {
         console.log(error)
      }
   }

   return (
      <div className='wrapPopUp'>
         <div className="popUp" ref={popUpRef}>
            <h2>Вы уверены, что хотите покинуть канал?</h2>
            <div className="btns">
               <button className='addBtn popUpBtns' onClick={onClose}>Отмена</button>
               <button className='cancleBtn popUpBtns' onClick={onExit}>Покинуть</button>
            </div>
         </div>
      </div>
   )
}

export default PopUpExitFromChannel