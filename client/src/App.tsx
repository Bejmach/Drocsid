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

  useEffect(() => {
    if (!selectedServer) return

    fetchServerName(selectedServer)

    const fetchInitialMessages = async () => {
      try {
        const resp = await messageService.getMessages(selectedServer, 100, 0)
        setMessages(resp.data)
        messagesRef.current = resp.data
        
        if (resp.data.length > 0) {
          lastMessageIdRef.current = resp.data[resp.data.length - 1].id
        } else {
          lastMessageIdRef.current = null 
        }
      } catch (err) {
        console.error('Failed to fetch messages', err)
        lastMessageIdRef.current = null
      }
    }
    
    fetchInitialMessages()

    const intervalId = window.setInterval(async () => {
      try {
        const lastId = lastMessageIdRef.current
        console.log(`[intervalId] Fetching messages after: ${lastId}`)

        if (!lastId) return
        console.log(`[intervalId] Last message ID: ${lastId}`)
        
        const resp = await messageService.getMessagesAfter(selectedServer, lastId)
        console.log(`[intervalId] Received ${resp.data.length} new messages`)
        if (resp.data.length > 0) {
          setMessages(prev => {
            const updated = [...prev, ...resp.data]
            messagesRef.current = updated
            lastMessageIdRef.current = updated[updated.length - 1].id
            return updated
          })
        }
      } catch (err) {
        console.error('Failed to fetch new messages', err)
      }
    }, 5000)

    return () => {
      clearInterval(intervalId)
    }
  }, [selectedServer])

  const handleSendMessage = async (content: string) => {
    if (!selectedServer || !user) return
    
    try {
      const resp = await messageService.send(
        selectedServer, 
        user.id, 
        encodeURIComponent(content)
      )
      const saved = resp.data
      const newMsg: Message = {
        id: saved.id,
        textChatId: selectedServer,
        userId: saved.userId ?? user.id,
        content: saved.content ?? content,
        time: saved.time ?? new Date().toISOString(),
        name: user.name 
      }
      
      setMessages(prev => {
        const updated = [...prev, newMsg]
        messagesRef.current = updated
        return updated
      })
    } catch (err) {
      console.error('Failed to send message', err)
    }
  }

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

                  <Box className="main-chat">
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