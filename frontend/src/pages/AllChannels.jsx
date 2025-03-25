import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import ChannelControlls from '../components/ChannelControlls';
import { ChannelContext } from '../context/ChannelContext';
import Pagination from '../components/Pagination';

const Channels = () => {
   const navigate = useNavigate();
   const { channels } = useContext(ChannelContext)
   const [currentPage, setCurrentPage] = useState(1);
   const [channelsPerPage, setChannelsPerPage] = useState(7);

   const lastChannelIndex = currentPage * channelsPerPage;
   const firstChannelIndex = lastChannelIndex - channelsPerPage;
   const currentChannel = channels.slice(firstChannelIndex, lastChannelIndex);
   const paginate = pageNumber => setCurrentPage(pageNumber);

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
         <div className='channelsWrap'>
            <ChannelControlls screenWidth={screenWidth} />
            <h3>Список каналов:</h3>
            <ul>
               {currentChannel.map((channel) => (
                  <li onClick={() => navigate(`/channel/${channel.id}`)} key={channel.id}>{channel.title}</li>
               ))}
            </ul>
            <Pagination
               channelsPerPage={channelsPerPage}
               totalChannels={channels.length}
               paginate={paginate}
            />
         </div>
      </div>

   );
};

export default Channels;