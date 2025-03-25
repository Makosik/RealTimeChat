import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const ChannelContext = createContext();

export const ChannelProvider = ({ children }) => {

   const [channels, setChannels] = useState([]);

   const fetchChannels = async () => {
      try {
         const token = localStorage.getItem("jwtToken");
         const res = await axios.get('/channels//getChannelsForSub', {
            headers: {
               Authorization: `${token}`,
            },
         });
         setChannels(res.data);
      } catch (error) {
         console.log(error.request);
      }
   };

  

   useEffect(() => {
      fetchChannels();
   }, []);

   return (
      <ChannelContext.Provider value={{channels,fetchChannels}}>
         {children}
      </ChannelContext.Provider>
   )
}
