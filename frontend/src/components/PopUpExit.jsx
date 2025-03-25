import React,{ useRef} from 'react'
import {useNavigate } from 'react-router-dom';
import useClickOutside from '../hooks/useClickOutside';

const PopUpExit = ({onClose}) => {
   const navigate = useNavigate();
   const popUpRef = useRef(null);
   
   useClickOutside(popUpRef, onClose);

   const onExit = () =>{
      localStorage.removeItem("jwtToken");
      navigate('/login')
   }

   return (
      <div className='wrapPopUp'>
         <div className="popUp" ref={popUpRef}>
            <h2>Вы уверены, что хотите выйти?</h2>
            <div className="btns">
               <button className='addBtn popUpBtns' onClick={onClose}>Отмена</button>
               <button className='cancleBtn popUpBtns' onClick={onExit}>Выйти</button>
            </div>
         </div>
      </div>
   )
}

export default PopUpExit