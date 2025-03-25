import React, { useContext, useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { io } from 'socket.io-client';
import ChannelNavigation from '../components/ChannelNavigation';

const socket = io('http://localhost:5000'); // Подключение к WebSocket

const Channel = () => {
   const { id } = useParams();
   const [channelTitle, setChannelTitle] = useState('');
   const token = localStorage.getItem("jwtToken");
   const [message, setMessage] = useState('');
   const { userId } = useContext(UserContext);
   const [messages, setMessages] = useState([]);
   const [isOwner, setOwner] = useState(false);
   const [isFullScreenNavOpen, setIsFullScreenNavOpen] = useState();
   const [screenWidth, setScreenWidth] = useState(window.innerWidth);
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

   useEffect(() => {
      const fetchChannelTitle = async () => {
         try {
            const response = await axios.get(`/channels/channel/${id}`, {
               headers: {
                  Authorization: `${token}`,
               },
            });
            setChannelTitle(response.data.channelTitle); // set title
         } catch (error) {
            console.error('Error fetching channel title:', error);
         }
      }

      const fetchMessages = async () => {
         try {
            const res = await axios.get(`/message/${id}/history`, {
               headers: { Authorization: `${token}` },
            });
            setMessages(res.data);
         } catch (error) {
            console.error('Ошибка загрузки сообщений:', error);
         }
      };

      const checkOwnership = async () => {
         try {
            const response = await axios.get(`/channels/${id}/ownership`, {
               headers: { Authorization: `${token}` }
            });
            setOwner(response.data.isOwner);
         } catch (error) {
            console.error('Ошибка проверки владельца:', error);
         }
      };

      checkOwnership();
      fetchChannelTitle();
      fetchMessages();

      socket.emit('join_channel', id); // Присоединяемся к каналу WebSocket

      return () => {
         socket.off('new_message');
      };

   }, [id, token]);

   useEffect(() => {
      socket.on('new_message', (newMessage) => {
         setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      return () => {
         socket.off('new_message');
      };
   }, []);

   const sendMessage = async () => {
      try {
         const res = await axios.post(`/message/${id}/send`,
            { message, userId },
            {
               headers: {
                  Authorization: `${token}`,
               },
            })
         if (res.status === 200 || res.status === 201) {
            const newMessage = res.data

            setMessage('')
         }
      } catch (error) {
         console.error('Error: ', error)
      }
   }

   useEffect(() => {
      const handleResize = () => {
         setScreenWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   const checkOwnMessage = (MesIdUser) => {
      return MesIdUser === userId ? 'own-message' : 'other-message';
   };


   return (
      <div className="wrapper">
         {screenWidth < 720 && (
            <button className="burger-menu" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
               ☰
            </button>
         )}

         <SideBar isOpen={isSidebarOpen} />

         <div className='channelWrap'>
            <h3 className='channelTitle' onClick={() => {
               if (screenWidth < 1280) {
                  setIsFullScreenNavOpen(true);
               }
            }}>
               {channelTitle}
            </h3>

            {screenWidth >= 1280 ? (
               <ChannelNavigation
                  isOpen={true} // Всегда открыт
                  onClose={() => { }}
                  channelTitle={channelTitle}
                  isOwner={isOwner}
               />
            ) : (
               <ChannelNavigation
                  isOpen={isFullScreenNavOpen}
                  onClose={() => setIsFullScreenNavOpen(false)}
                  channelTitle={channelTitle}
                  isOwner={isOwner}
               />
            )}
            <div className="messageList">
               <ul>
                  {messages.map((msg, index) => (
                     <li key={index} className={checkOwnMessage(msg.user_id)}>
                        <strong>{msg.name}:</strong> {msg.content}
                     </li>
                  ))}
               </ul>
            </div>
            <div className='messageWrap'>
               <input className='messageForm' type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
               <button className='messageBtn' onClick={sendMessage}>{'>'}</button>
            </div>
         </div>
      </div>
   );
}
export default Channel;