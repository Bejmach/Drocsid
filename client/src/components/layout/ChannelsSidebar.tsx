import React, { useState } from 'react';
import { Server } from '../../data/servers';
import { Channel, ChannelCategory } from '../../data/channels';
import { User } from '../../data/users';
import { ChevronDown, Hash, Volume2, Mic, Headphones, Settings } from 'lucide-react';
import SettingsModal from '../settings/SettingsModal';

interface ChannelsSidebarProps {
  server: Server;
  channels: Channel[];
  categories: ChannelCategory[];
  activeChannelId: string;
  currentUser: User;
  onChannelClick: (channelId: string) => void;
}

const ChannelsSidebar: React.FC<ChannelsSidebarProps> = ({
  server,
  channels,
  categories,
  activeChannelId,
  currentUser,
  onChannelClick
}) => {
  const [categoryStates, setCategoryStates] = useState<Record<string, boolean>>(
    categories.reduce((acc, category) => {
      acc[category.id] = category.isCollapsed || false;
      return acc;
    }, {} as Record<string, boolean>)
  );
  
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  const toggleCategory = (categoryId: string) => {
    setCategoryStates(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };
  
  const renderChannelIcon = (channel: Channel) => {
    switch (channel.type) {
      case 'text':
        return <Hash size={20} />;
      case 'voice':
        return <Volume2 size={20} />;
      default:
        return <Hash size={20} />;
    }
  };
  
  return (
    <div className="channels-sidebar">
      <div className="server-header">
        <h1>{server.name}</h1>
      </div>
      
      <div className="channels-container">
        {categories.map(category => (
          <div key={category.id}>
            <div className="channel-category">
              <h3 
                className={categoryStates[category.id] ? 'collapsed' : ''}
                onClick={() => toggleCategory(category.id)}
              >
                <ChevronDown size={12} /> {category.name}
              </h3>
            </div>
            
            {!categoryStates[category.id] && channels
              .filter(channel => channel.parentId === category.id)
              .map(channel => (
                <div 
                  key={channel.id}
                  className={`channel-item ${activeChannelId === channel.id ? 'active' : ''}`}
                  onClick={() => onChannelClick(channel.id)}
                >
                  {renderChannelIcon(channel)}
                  <span className="channel-name">{channel.name}</span>
                </div>
              ))
            }
          </div>
        ))}
      </div>
      
      <div className="user-area">
        <div className="user-avatar">
          <img src={currentUser.avatar} alt={currentUser.username} />
          <div className="status"></div>
        </div>
        <div className="user-info">
          <div className="username">{currentUser.username}</div>
          <div className="discriminator">#{currentUser.discriminator}</div>
        </div>
        <div className="user-actions">
          <button><Mic size={20} /></button>
          <button><Headphones size={20} /></button>
          <button onClick={() => setSettingsOpen(true)}><Settings size={20} /></button>
        </div>
      </div>

      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        currentUser={currentUser}
      />
    </div>
  );
};

export default ChannelsSidebar;