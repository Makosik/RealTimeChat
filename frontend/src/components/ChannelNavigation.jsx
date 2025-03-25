import React from 'react';
import PopUpAddUser from '../components/PopUpAddUser';
import PopUpUsers from '../components/PopUpUsers';
import PopUpDelete from '../components/PopUpDelete';
import PopUpExitFromChannel from '../components/PopUpExitFromChannel';

const ChannelNavigation = ({ isOpen, onClose, channelTitle, isOwner, screenWidth }) => {
   const [isAddActive, setIsAddActive] = React.useState(false);
   const [isUsersActive, setIsUsersActive] = React.useState(false);
   const [delPopIsActive, setDelPopIsActive] = React.useState(false);
   const [exitPopUpisActive, setExitPopUpActive] = React.useState(false);

   if (!isOpen) return null; 

   return (
      <div className="fullScreenOverlay" onClick={onClose}>
         <div className="fullScreenNav" onClick={(e) => e.stopPropagation()}>
            <div className="channelMenu">
               <button className="popUpBtns addChannelBtn" onClick={() => setIsUsersActive(true)}>Пользователи</button>
               <button className="popUpBtns addChannelBtn" onClick={() => setIsAddActive(true)}>Пригласить<span className='symPlus'>&#x2B;</span></button>
               <button className="popUpBtns addChannelBtn" onClick={() => setExitPopUpActive(true)}>Покинуть канал</button>
               {isOwner && (
                  <button className="popUpBtns addChannelBtn" onClick={() => setDelPopIsActive(true)}>Удалить канал</button>
               )}
            </div>

            {isAddActive && <PopUpAddUser onClose={() => setIsAddActive(false)} />}
            {isUsersActive && <PopUpUsers onClose={() => setIsUsersActive(false)} />}
            {delPopIsActive && <PopUpDelete onClose={() => setDelPopIsActive(false)} />}
            {exitPopUpisActive && <PopUpExitFromChannel onClose={() => setExitPopUpActive(false)} />}
         </div>
      </div>
   );
};

export default ChannelNavigation;
