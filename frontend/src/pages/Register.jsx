import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { ChannelContext } from "../context/ChannelContext";

const Register = () => {
   const [name, setName] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const navigate = useNavigate();
   const {fetchUsers} = useContext(UserContext)
   const {fetchChannels}=useContext(ChannelContext)

   const handleRegister = async (e) => {
      e.preventDefault();

      try {
         const response = await axios.post("/users/register", {
            name,
            password,
         });

         if (response.status === 200 || response.status === 201) {
            const { token } = response.data;
            localStorage.setItem("jwtToken", token); // save token in localstorage
            fetchUsers();
            fetchChannels();
            alert("Регистрация успешна!");
            navigate("/channels")
         }
      } catch (err) {

         if (err.response) {
            setError(err.response.data?.message || "Ошибка регистрации");
         } else if (err.request) {
            setError("Ошибка сети: сервер не ответил");
         } else {
            setError("Ошибка при отправке запроса");
         }
      }
   };

   return (
      <div className="auth-wrap">
         <h1>Добро пожаловать!</h1>
         <div className="register-container">
            <h2>Регистрация</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleRegister}>
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
               <button type="submit">Зарегистрироваться</button>
               <p className="toggle-link">
                  Есть аккаунт?{" "}
                  <span onClick={() => navigate("/login")}>Войти</span>
               </p>
            </form>
         </div>
      </div>

   );
};

export default Register;