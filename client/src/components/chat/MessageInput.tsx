import React, { useState } from 'react';
import { User } from '../../data/users';
import { PlusCircle, Gift, Image, Sticker, PiIcon as EmojiIcon, DiffIcon as GifIcon } from 'lucide-react';

interface MessageInputProps {
  channelId: string;
  currentUser: User;
}

const MessageInput: React.FC<MessageInputProps> = ({ channelId, currentUser }) => {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim()) {
      // Here we would normally send the message to the server
      console.log('Sending message:', message);
      setMessage('');
    }
  };
  
  return (
    <div className="message-input-container">
      <form onSubmit={handleSubmit} className="message-input">
        <button type="button" className="upload-button">
          <PlusCircle size={24} />
        </button>
        
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Message #${channelId}`}
        />
        
        <div className="message-actions">
          <button type="button">
            <Gift size={20} />
          </button>
          <button type="button">
            <GifIcon size={20} />
          </button>
          <button type="button">
            <Sticker size={20} />
          </button>
          <button type="button">
            <EmojiIcon size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;