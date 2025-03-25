import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { ChannelContext } from "../context/ChannelContext";

const Auth = () => {
   const [name, setName] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const navigate = useNavigate();
   const { fetchUsers } = useContext(UserContext);
   const {fetchChannels} = useContext(ChannelContext)

   const handleLogin = async (e) => {
      e.preventDefault();

      try {
         const response = await axios.post("/users/login", {
            name,
            password,
         });
         const { token } = response.data;
         if (response.status === 200 && token) {

            localStorage.setItem("jwtToken", token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            fetchChannels();
            fetchUsers();
            navigate("/channels");
         } else {
            setError(response.data?.message || "Ошибка авторизации");
         }
      } catch (err) {
         setError(err.response?.data?.message || "Ошибка сети или сервера");
      }
   };

   return (
      <div className="auth-wrap">
         <h1>Добро пожаловать!</h1>
         <div className="auth-container">
            <h2>Авторизация</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin}>
               <input
                  type="text"
                  placeholder="Логин"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
               />
               <input
                  type="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
               <button type="submit">Войти</button>
               <p className="toggle-link">
                  Нет аккаунта?{" "}
                  <span onClick={() => navigate("/register")}>Зарегистрироваться</span>
               </p>
            </form>
         </div>
      </div>

   );
};

export default Auth;