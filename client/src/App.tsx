import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { CssBaseline, Box } from '@mui/joy'
import { useAuth } from './hooks/AuthContext'
import Auth from './components/Auth'
import ServerList from './components/ServerList'
import FriendsList from './components/FriendList'
import MemberList from './components/MemberList'
import MessageComponent from './components/Message'
import { Message, Chat, User } from './types'
import { messageService, chatService, userService } from './hooks/api'
import ChatInput from './components/ChatInput'
import './styles/App.scss'

const App = () => {
  const { user: userArray } = useAuth()
  const [selectedServer, setSelectedServer] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])
  const messagesRef = useRef<Message[]>([])
  const [isFriendsList, setIsFriendsList] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [serverName, setServerName] = useState<string>('')
  const [users, setUsers] = useState<User[]>([])
  const user = Array.isArray(userArray) && userArray.length > 0 ? userArray[0] : null

  const switchMode = () => setIsLogin(prev => !prev)
  const toggleFriendsList = () => setIsFriendsList(prev => !prev)

  const fetchServerName = async (chatId: string) => {
    const resp = await chatService.getAll()
    const found = resp.data.find((c: Chat) => c.id === chatId)
    setServerName(found ? found.name : '')
  }

  const getUsername = (userId: string) => {
    const found = users.find(u => u.id === userId)
    return found ? found.name : `User ${userId}`
  }

  useEffect(() => {
    if (!user) return
    const fetchUsers = async () => {
      try {
        const resp = await userService.getAll()
        setUsers(resp.data)
      } catch (err) {
        console.error('Failed to fetch users', err)
      }
    }
    fetchUsers()
  }, [user])

  useEffect(() => {
    if (!selectedServer) return

    fetchServerName(selectedServer)

    ;(async () => {
      const resp = await messageService.getMessages(selectedServer, 100, 0)
      setMessages(resp.data)
      messagesRef.current = resp.data
    })()

    const intervalId = window.setInterval(async () => {
      const lastList = messagesRef.current
      const lastId = lastList.length ? lastList[lastList.length - 1].id : undefined
      const resp = await messageService.getMessagesAfter(selectedServer, lastId || '')
      if (resp.data.length > 0) {
        setMessages(prev => {
          const updated = [...prev, ...resp.data]
          messagesRef.current = updated
          return updated
        })
      }
    }, 5000)

    return () => {
      clearInterval(intervalId)
    }
  }, [selectedServer])

  const handleSendMessage = async (content: string) => {
    if (!selectedServer || !user) return
    const resp = await messageService.send(selectedServer, user.id, encodeURIComponent(content))
    const saved = resp.data
    const newMsg: Message = {
      id: saved.id,
      textChatId: selectedServer,
      userId: saved.userId ?? user.id,
      content: saved.content ?? encodeURIComponent(content),
      time: saved.time ?? new Date().toISOString()
    }
    setMessages(prev => {
      const updated = [...prev, newMsg]
      messagesRef.current = updated
      return updated
    })
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
                      messages.map((msg, idx) => (
                        <MessageComponent
                          key={msg.id ?? `msg-${idx}`}
                          username={getUsername(msg.userId)}
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
