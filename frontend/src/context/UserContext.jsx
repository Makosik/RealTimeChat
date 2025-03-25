import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode } from 'jwt-decode';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
   const [users, setUsers] = useState([]);
   const [userId, setUserId] = useState(null);
   const [userName, setUserName] = useState('');

   //decode user's token for id
   const getUserIdFromToken = (token) => {
      try {
         const decodedToken = jwtDecode(token);
        
         return decodedToken.userId;
      } catch (error) {
         console.error('Ошибка при декодировании токена', error);
         return null;
      }
   };

   //decode user's token for name
   const getUserNameFromToken = (token) => {
      try {
         const decodedToken = jwtDecode(token);
        
         return decodedToken.name;
      } catch (error) {
         console.error('Ошибка при декодировании токена', error);
         return null;
      }
   };

   const fetchUsers = async () => {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
         console.log('Токен не найден');
         return;
      }

      try {
         const decodedUserId = getUserIdFromToken(token);
         const decodedUserName = getUserNameFromToken(token);
         setUserId(decodedUserId);
         setUserName(decodedUserName);

         // make a request to get a list of users
         const res = await axios.get('/users/searchUsers', {
            headers: {
               Authorization: `${token}`,
            },
         });

         setUsers(res.data);
         
      } catch (error) {
         console.error('Ошибка при получении данных пользователей', error);
      }
   };

   useEffect(() => {
      fetchUsers();
   }, []);
 
   return (
      <UserContext.Provider value={{ users, userId, fetchUsers, userName}}>
         {children}
      </UserContext.Provider>
   );
};
