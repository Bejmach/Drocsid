import * as React from 'react';
import { CssBaseline, Box } from '@mui/joy';
import ChatInput from './Components/ChatInput';
import MemberList from './Components/MemberList';
import Message from './Components/Message';
import ServerList from './Components/ServerList';
import FriendsList from './Components/FriendList';
import './styles/App.scss';
import messagesStore from './hooks/messeges';

export default function App() {
  const [selectedServer, setSelectedServer] = React.useState<string>('1');
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [isFriendsList, setIsFriendsList] = React.useState(false);

  React.useEffect(() => {
    const updateMessages = () => {
      if (selectedServer) {
        if (isFriendsList) {
          setMessages(messagesStore.getMessagesByDM(selectedServer));
        } else {
          setMessages(messagesStore.getMessagesByServer(selectedServer));
        }
      }
    };
    updateMessages();
  }, [selectedServer, isFriendsList]);

  const handleSendMessage = (content: string) => {
    if (selectedServer) {
      if (isFriendsList) {
        const newMessage = messagesStore.addMessage({
          userId: '1',
          content,
          serverId: selectedServer,
          targetId: selectedServer,
          time: new Date().toLocaleTimeString()
        });
        setMessages(prev => [...prev, newMessage]);
      } else {
        const newMessage = messagesStore.addMessage({
          userId: '1',
          content,
          serverId: selectedServer,
          time: new Date().toLocaleTimeString()
        });
        setMessages(prev => [...prev, newMessage]);
      }
    }
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
          isFriendsList={isFriendsList}
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