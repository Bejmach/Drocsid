import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/joy';
import { useAuth } from './hooks/AuthContext';
import Auth from './Components/Auth';
import ServerNavigation from './Components/ServerNavigation';
import MainChat from './Components/MainChat';
import MemberList from './Components/MemberList';
import { Message } from './types';

const App = () => {
  const { user, logout } = useAuth();
  const [selectedChat, setSelectedChat] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLogin, setIsLogin] = useState(true); 

  const switchMode = () => {
    setIsLogin((prev) => !prev); 
  };

  return (
    <Box className="app-container">
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth isLogin={isLogin} switchMode={switchMode} />} />
          <Route
            path="/"
            element={
              user ? (
                <>
                  <Box className="server-list">
                    <ServerNavigation
                      chats={chats}
                      selectedChat={selectedChat}
                      onSelectChat={setSelectedChat}
                      onLogout={logout}
                    />
                  </Box>
                  
                  <MainChat
                    messages={messages}
                    selectedChat={selectedChat}
                    onSendMessage={handleSendMessage}
                  />

                  <Box className="members-list">
                    <MemberList chatId={selectedChat} />
                  </Box>
                </>
              ) : (
                <Navigate to="/auth" />
              )
            }
          />
        </Routes>
      </Router>
    </Box>
  );
};

export default App;
