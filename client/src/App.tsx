// MultipleFiles/App.tsx
import * as React from 'react';
import { CssBaseline, Box } from '@mui/joy';
import ChatInput from './Components/ChatInput';
import MemberList from './Components/MemberList';
import Message from './Components/Message';
import ServerList from './Components/ServerList';
import FriendsList from './Components/FriendList';
import './styles/App.scss';
import messagesStore from './data/messeges';

export default function App() {
  const [selectedServer, setSelectedServer] = React.useState('1');
  const [messages, setMessages] = React.useState(messagesStore.getMessagesByServer(selectedServer));
  const [isFriendsList, setIsFriendsList] = React.useState(false);

  React.useEffect(() => {
    const updateMessages = () => {
      setMessages(messagesStore.getMessagesByServer(selectedServer));
    };
    updateMessages();
  }, [selectedServer]);

  const handleSendMessage = (content: string) => {
    const newMessage = messagesStore.addMessage({
      userId: '1',
      content,
      serverId: selectedServer,
      time: new Date().toLocaleTimeString()
    });
    setMessages(prev => [...prev, newMessage]);
  };

  const toggleFriendsList = () => {
    setIsFriendsList(!isFriendsList);
  };

  return (
    <Box className="app-container">
      <CssBaseline />
      
      {/* Server List or Friends List */}
      <Box className="server-list">
        {isFriendsList ? (
          <FriendsList onBack={toggleFriendsList} />
        ) : (
          <ServerList 
            selectedServer={selectedServer}
            onServerChange={setSelectedServer}
            onToggleFriends={toggleFriendsList}
          />
        )}
      </Box>

      {/* Main Chat Area */}
      <Box className="main-chat">
        {messages.map((message) => (
          <Message
            key={message.id}
            username={`User ${message.userId}`}
            content={message.content}
            timestamp={message.time}
          />
        ))}
      </Box>

      {/* Chat Input */}
      <Box className="chat-input-container">
        <ChatInput 
          serverId={selectedServer}
          onSendMessage={handleSendMessage}
        />
      </Box>

      {/* Members List */}
      <Box className="members-list">
        <MemberList />
      </Box>
    </Box>
  );
}