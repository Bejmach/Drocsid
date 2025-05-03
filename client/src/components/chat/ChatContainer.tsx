import React from 'react';
import { Channel } from '../../data/channels';
import { Message as MessageType } from '../../data/messages';
import { User } from '../../data/users';
import Message from './Message';
import MessageInput from './MessageInput';
import { Hash, Bell, PinIcon, Users, Search, InboxIcon, MessageCircleQuestion as QuestionMarkCircle } from 'lucide-react';

interface ChatContainerProps {
  channel: Channel;
  messages: MessageType[];
  users: User[];
  currentUser: User;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  channel,
  messages,
  users,
  currentUser
}) => {
  // Group messages by user and time (if messages are < 5 min apart from the same user, group them)
  const groupedMessages: MessageType[] = [];
  
  messages.forEach((message, index) => {
    const prevMessage = messages[index - 1];
    
    // Check if this is a continuation
    const isContinuation = prevMessage 
      && prevMessage.userId === message.userId 
      && (message.timestamp.getTime() - prevMessage.timestamp.getTime() < 5 * 60 * 1000);
    
    if (isContinuation) {
      message = { ...message, isContinuation: true };
    }
    
    groupedMessages.push(message);
  });
  
  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="channel-info">
          <Hash size={24} />
          <h2>{channel.name}</h2>
        </div>
        <div className="header-actions">
          <button><Bell size={20} /></button>
          <button><PinIcon size={20} /></button>
          <button><Users size={20} /></button>
          <div className="search-bar">
            <input type="text" placeholder="Search" />
            <Search size={20} />
          </div>
          <button><InboxIcon size={20} /></button>
          <button><QuestionMarkCircle size={20} /></button>
        </div>
      </div>
      
      <div className="messages-container">
        {groupedMessages.map((message) => {
          const user = users.find(u => u.id === message.userId) || currentUser;
          return (
            <Message 
              key={message.id} 
              message={message} 
              user={user} 
              currentUser={currentUser} 
            />
          );
        })}
      </div>
      
      <MessageInput channelId={channel.id} currentUser={currentUser} />
    </div>
  );
};

export default ChatContainer;