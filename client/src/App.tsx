import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/joy';
import { useAuth } from './hooks/AuthContext';
import Auth from './components/Auth'; 
import ServerList from './components/ServerList'; 
import FriendsList from './components/FriendList'; 
import MemberList from './components/MemberList'; 
import { Message } from './types';
import { messageService, chatService } from './hooks/api';
import ChatInput from './components/ChatInput';
import './styles/App.scss';

const App = () => {
  const { user : userArray } = useAuth(); 
  const [selectedServer, setSelectedServer] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isFriendsList, setIsFriendsList] = useState(false); 
  const [isLogin, setIsLogin] = useState(true);
  const [serverName, setServerName] = useState<string>('');


  const user = Array.isArray(userArray) && userArray.length > 0
    ? userArray[0]
    : null;

  const switchMode = () => {
    setIsLogin((prev) => !prev); 
  };

  const toggleFriendsList = () => {
    setIsFriendsList(!isFriendsList);
  };

  const handleSendMessage = async (content: string) => {
    if (!selectedServer || !userArray) return;
    try {
      const response = await messageService.send(selectedServer, user.id, encodeURIComponent(content));
      setMessages(prev => [...prev, response.data]);
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };

  useEffect(() => {
    const fetchServerName = async () => {
      if (!selectedServer) return;

      try {
        const response = await chatService.getAll(); 
        const chats = response.data;
        const found = chats.find((chat: Chat) => chat.id === selectedServer);
        if (found) {
          setServerName(found.name);
        } else {
          setServerName('');
        }
      } catch (err) {
        console.error('Failed to fetch server name from all chats', err);
        setServerName('');
      }
    };

    fetchServerName();
  }, [selectedServer]);


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
                  {/* Server List or Friends List */}
                  <Box className="server-list">
                  {isFriendsList ? (
                    <FriendsList 
                      onBack={toggleFriendsList}
                      onSelectFriend={(friendId) => setSelectedServer(friendId)}
                      selectedServer={selectedServer}
                    />
                  ) : (
                    <ServerList 
                      selectedServer={selectedServer}
                      onServerChange={setSelectedServer}
                      onToggleFriends={toggleFriendsList}
                      userId={user.id}
                    />
                  )}
                  </Box>

                  {/* Main Chat Area */}
                  <Box className="main-chat">
                    {messages.map((message) => (
                      <div key={message.id}>
                        <strong>{`User   ${message.userId}`}: </strong>
                        {message.content}
                      </div>
                    ))}
                  </Box>

                  {/* Chat Input */}
                  <Box className="chat-input-container">
                    <ChatInput 
                      serverId={selectedServer}
                      serverName={serverName}
                      isFriendsList={isFriendsList} 
                      onSendMessage={handleSendMessage}
                    />
                  </Box>

                  {/* Members List */}
                  <Box className="members-list">
                    <MemberList/> 
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
