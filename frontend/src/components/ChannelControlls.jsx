import React, { useContext, useState } from 'react';
import PopUp from './PopUpCreate';
import Search from './Search';
import { ChannelContext } from '../context/ChannelContext';

const ChannelControlls = ({screenWidth}) => {

   const [active, setActive] = useState(false);
   const { channels } = useContext(ChannelContext);
   const wordsForBtn = 'Создать канал';

   return (
      <div className="navChannel">
         <Search data={channels} filterField="title" />
         <button className='popUpBtns addChannelBtn' onClick={() => setActive(true)}>{screenWidth > 720 ? wordsForBtn : null}<span className='symPlus'>&#x2B;</span></button>
         {active && <PopUp onClose={() => setActive(false)} onCreate={(channelName) => console.log('Добавлен канал: ', channelName)} />}
      </div>
   )
}

export default ChannelControlls