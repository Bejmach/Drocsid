import React from 'react';
import { Message as MessageType } from '../../data/messages';
import { User } from '../../data/users';

interface MessageProps {
  message: MessageType;
  user: User;
  currentUser: User;
}

const Message: React.FC<MessageProps> = ({ message, user, currentUser }) => {
  // Format date
  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const isToday = date.toDateString() === today.toDateString();
    const isYesterday = date.toDateString() === yesterday.toDateString();
    
    if (isToday) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (isYesterday) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
  };
  
  return (
    <div className={`message ${message.isContinuation ? 'continuation' : ''}`}>
      <div className="message-avatar">
        <img src={user.avatar} alt={user.username} />
      </div>
      <div className="message-content">
        {!message.isContinuation && (
          <div className="message-header">
            <span className="username">{user.username}</span>
            <span className="timestamp">{formatDate(message.timestamp)}</span>
          </div>
        )}
        <div className="message-text">{message.content}</div>
        
        {message.reactions && message.reactions.length > 0 && (
          <div className="message-reactions">
            {message.reactions.map((reaction, index) => (
              <div key={index} className={`reaction ${reaction.reacted ? 'reacted' : ''}`}>
                <span>{reaction.emoji}</span>
                <span className="count">{reaction.count}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;