import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { CssBaseline, Box } from '@mui/joy'
import { useAuth } from './hooks/AuthContext'
import Auth from './components/Auth'
import ServerList from './components/ServerList'
import FriendsList from './components/FriendList'
import MemberList from './components/MemberList'
import MessageComponent from './components/Message'
import { Message, Chat } from './types'
import { messageService, chatService } from './hooks/api'
import ChatInput from './components/ChatInput'
import './styles/App.scss'

const App = () => {
  const { user: userArray } = useAuth()
  const [selectedServer, setSelectedServer] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])
  const messagesRef = useRef<Message[]>([])
  const lastMessageIdRef = useRef<string | null>(null) // Dedicated ref for last message ID
  const [isFriendsList, setIsFriendsList] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [serverName, setServerName] = useState<string>('')
  const user = Array.isArray(userArray) && userArray.length > 0 ? userArray[0] : null

  const switchMode = () => setIsLogin(prev => !prev)
  const toggleFriendsList = () => setIsFriendsList(prev => !prev)

  const fetchServerName = async (chatId: string) => {
    try {
      const resp = await chatService.getAll()
      const found = resp.data.find((c: Chat) => c.id === chatId)
      setServerName(found ? found.name : '')
    } catch (err) {
      console.error('Failed to fetch server name', err)
      setServerName('')
    }
  }

  async function syncMessages() {
      try {
        const lastId = lastMessageIdRef.current;

        if (!lastId) return;
        
        const resp = await messageService.getMessagesAfter(selectedServer, lastId);
        if (resp.data.length > 0) {
          setMessages(prev => {
            const existingIds = new Set(prev.map(m => m.id));
            const newMessages = resp.data.filter(msg => !existingIds.has(msg.id));
            
            if (newMessages.length === 0) return prev;
            
            const updated = [...prev, ...newMessages];
            messagesRef.current = updated;
            lastMessageIdRef.current = updated[updated.length - 1].id;
            return updated;
          });
        }
      } catch (err) {
        console.error('Failed to fetch new messages', err);
      }
    }

  useEffect(() => {
    if (!selectedServer) return;

    fetchServerName(selectedServer);

    const fetchInitialMessages = async () => {
      try {
        const resp = await messageService.getMessages(selectedServer, 100, 0);
        setMessages(resp.data);
        messagesRef.current = resp.data;
        
        if (resp.data.length > 0) {
          lastMessageIdRef.current = resp.data[resp.data.length - 1].id;
        } else {
          lastMessageIdRef.current = null;
        }
      } catch (err) {
        console.error('Failed to fetch messages', err);
        lastMessageIdRef.current = null;
      }
    };
    
    fetchInitialMessages();

    const intervalId = window.setInterval(async () => {
      syncMessages()
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  });

  const handleSendMessage = async (content: string) => {
    if (!selectedServer || !user) return;
    try {
      await messageService.send(
        selectedServer, 
        user.id, 
        encodeURIComponent(content)
      );
      syncMessages()
    } catch (err) {
      console.error('Failed to send message', err);
      if (messagesRef.current.length > 0) {
        lastMessageIdRef.current = messagesRef.current[messagesRef.current.length - 1].id;
      }
    }
  };

  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const hasScrolledRef = useRef(false); 

  useEffect(() => {
  if (!hasScrolledRef.current && messages.length > 0 && messageContainerRef.current) {
    messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    hasScrolledRef.current = true;
  }
}, [messages]);



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
                    {isFriendsList ? (
                      <FriendsList
                        userId={user.id}
                        onBack={toggleFriendsList}
                        onSelectFriend={setSelectedServer}
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

                  <Box className="main-chat" ref={messageContainerRef}>
                    {!selectedServer ? (
                      <div className="empty-state">
                        Select a server or friend to start chatting!
                      </div>
                    ) : (
                      messages.map((msg) => (
                        <MessageComponent
                          key={msg.id}
                          username={msg.name || `User ${msg.userId}`}
                          content={decodeURIComponent(msg.content)}
                          timestamp={new Date(msg.time).toLocaleTimeString()}
                        />
                      ))
                    )}
                  </Box>


                  <Box className="chat-input-container">
                    <ChatInput
                      serverId={selectedServer}
                      serverName={serverName}
                      isFriendsList={isFriendsList}
                      onSendMessage={handleSendMessage}
                    />
                  </Box>

                  <Box className="members-list">
                    <MemberList chatId={selectedServer} />
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
  )
}

export default App