import { CssBaseline, Box } from '@mui/joy';
import ChatInput from './Components/ChatInput';
import MemberList from './Components/MemberList';
import Message from './Components/Message';
import ServerList from './Components/ServerList';
import './styles/App.scss';

export default function App() {
  return (
    <Box className="app-container">
      <CssBaseline />
      {/* Server List */}
      <Box className="server-list">
        <ServerList />
      </Box>

      {/* Main Chat Area */}
      <Box className="main-chat">
        {[...Array(20)].map((_, i) => (
          <Message
            key={i}
            username={`User ${i + 1}`}
            content={`Message ${i + 1} in the chat`}
            timestamp={`${i + 1}:00 PM`}
          />
        ))}
      </Box>

      {/* Chat Input */}
      <Box className="chat-input-container">
        <ChatInput serverId={"1"} />
      </Box>

      {/* Members List */}
      <Box className="members-list">
        <MemberList />
      </Box>
    </Box>
  );
}