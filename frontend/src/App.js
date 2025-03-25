import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './styles/App.css';
import Auth from "./pages/Auth";
import Register from "./pages/Register";
import Channels from "./pages/AllChannels";
import Channel from "./pages/Channel";
import UserSearch from "./pages/UserSearch";
import { ChannelProvider } from "./context/ChannelContext";
import { UserProvider } from "./context/UserContext";

const App = () => {
   return (
      <ChannelProvider>
      <UserProvider>
         <Router>
            <Routes>
               <Route path="/login" element={<Auth />} />
               <Route path="/register" element={<Register />} />
               <Route path="/channels" element={<Channels />} />
               <Route path="/channel/:id" element={<Channel />} />
               <Route path="/usersearch" element={<UserSearch />} />
               <Route path="*" element={<Register />} />
            </Routes>
         </Router>
         </UserProvider>
      </ChannelProvider>

   );
};

export default App;