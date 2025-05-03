import React, { useState, useRef, useEffect } from 'react';
import { User } from '../../data/users';
import { DirectMessage, typingIndicators } from '../../data/messages';
import { Phone, Video, Search, Pin, Bell, MessageCircleMore, Smile, PlusCircle, Gift, Sticker } from 'lucide-react';

interface DirectMessageChatProps {
  currentUser: User;
  friend: User;
  messages: DirectMessage[];
  onSendMessage: (content: string) => void;
}

const DirectMessageChat: React.FC<DirectMessageChatProps> = ({
  currentUser,
  friend,
  messages,
  onSendMessage
}) => {
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleTyping = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    setIsTyping(true);
    typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 3000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim()) {
      onSendMessage(messageInput);
      setMessageInput('');
      setIsTyping(false);
    }
  };

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  return (
    <div className="direct-message-chat">
      <div className="chat-header">
        <div className="friend-info">
          <div className="friend-avatar">
            <img src={friend.avatar} alt={friend.username} />
            <div className={`status-indicator ${friend.status}`} />
          </div>
          <div className="friend-details">
            <h2>{friend.username}</h2>
            <span className="status-text">{friend.status}</span>
          </div>
        </div>
        <div className="chat-actions">
          <button aria-label="Start Voice Call"><Phone size={20} /></button>
          <button aria-label="Start Video Call"><Video size={20} /></button>
          <button aria-label="Search Messages"><Search size={20} /></button>
          <button aria-label="Pinned Messages"><Pin size={20} /></button>
          <button aria-label="Mute"><Bell size={20} /></button>
          <button aria-label="More"><MessageCircleMore size={20} /></button>
        </div>
      </div>

      <div className="messages-container">
        {messages.map((message, index) => {
          const isCurrentUser = message.userId === currentUser.id;
          const showAvatar = index === 0 || messages[index - 1].userId !== message.userId;
          
          return (
            <div key={message.id} className={`message ${isCurrentUser ? 'sent' : 'received'}`}>
              {showAvatar && !isCurrentUser && (
                <div className="message-avatar">
                  <img src={friend.avatar} alt={friend.username} />
                </div>
              )}
              <div className="message-content">
                {showAvatar && (
                  <div className="message-header">
                    <span className="username">{isCurrentUser ? 'You' : friend.username}</span>
                    <span className="timestamp">{formatTimestamp(message.timestamp)}</span>
                  </div>
                )}
                <div className="message-text">{message.content}</div>
                {message.readBy?.includes(friend.id) && isCurrentUser && (
                  <div className="read-receipt">Seen</div>
                )}
              </div>
            </div>
          );
        })}
        {isTyping && (
          <div className="typing-indicator">
            <span>{friend.username} is typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="message-input" onSubmit={handleSendMessage}>
        <button type="button" className="attach-button">
          <PlusCircle size={24} />
        </button>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => {
            setMessageInput(e.target.value);
            handleTyping();
          }}
          placeholder={`Message @${friend.username}`}
        />
        <div className="message-actions">
          <button type="button"><Gift size={20} /></button>
          <button type="button"><Sticker size={20} /></button>
          <button type="button"><Smile size={20} /></button>
        </div>
      </form>
    </div>
  );
};

export default DirectMessageChat;