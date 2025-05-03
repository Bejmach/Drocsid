import React, { useState, useEffect } from 'react';
import ServerSidebar from './ServerSidebar';
import ChannelsSidebar from './ChannelsSidebar';
import ChatContainer from '../chat/ChatContainer';
import MembersSidebar from './MembersSidebar';
import FriendsSidebar from '../friends/FriendsSidebar';
import DirectMessageChat from '../chat/DirectMessageChat';
import { servers } from '../../data/servers';
import { channels, categories } from '../../data/channels';
import { users, currentUser } from '../../data/users';
import { messages, directMessages } from '../../data/messages';

const DrocsidLayout: React.FC = () => {
  const [activeServerId, setActiveServerId] = useState<string>('home');
  const [activeChannelId, setActiveChannelId] = useState<string>('channel2');
  const [selectedFriendId, setSelectedFriendId] = useState<string | undefined>();
  
  // Find the most recent conversation
  useEffect(() => {
    if (activeServerId === 'home' && !selectedFriendId) {
      const recentMessages = [...directMessages].sort((a, b) => 
        b.timestamp.getTime() - a.timestamp.getTime()
      );
      
      const mostRecentMessage = recentMessages[0];
      if (mostRecentMessage) {
        const friendId = mostRecentMessage.userId === currentUser.id 
          ? mostRecentMessage.recipientId 
          : mostRecentMessage.userId;
        setSelectedFriendId(friendId);
      }
    }
  }, [activeServerId]);
  
  const activeServer = servers.find(server => server.id === activeServerId) || servers[0];
  const activeChannel = channels.find(channel => channel.id === activeChannelId) || channels[0];
  const selectedFriend = users.find(user => user.id === selectedFriendId);
  
  const serverChannels = channels.filter(channel => channel.serverId === activeServerId);
  const serverCategories = categories.filter(category => category.serverId === activeServerId);
  
  const channelMessages = messages.filter(message => message.channelId === activeChannelId);
  const friendMessages = directMessages.filter(
    message => 
      (message.userId === selectedFriendId && message.recipientId === currentUser.id) ||
      (message.userId === currentUser.id && message.recipientId === selectedFriendId)
  );
  
  const handleServerClick = (serverId: string) => {
    setActiveServerId(serverId);
    if (serverId !== 'home') {
      setSelectedFriendId(undefined);
      // Set the first channel of the server as active
      const firstChannel = channels.find(channel => channel.serverId === serverId);
      if (firstChannel) {
        setActiveChannelId(firstChannel.id);
      }
    }
  };
  
  const handleChannelClick = (channelId: string) => {
    setActiveChannelId(channelId);
    setSelectedFriendId(undefined);
  };

  const handleFriendSelect = (friendId: string) => {
    setSelectedFriendId(friendId);
  };

  const handleSendDirectMessage = (content: string) => {
    if (!selectedFriendId) return;
    
    const newMessage = {
      id: `dm${Date.now()}`,
      content,
      userId: currentUser.id,
      recipientId: selectedFriendId,
      channelId: `dm-${selectedFriendId}`,
      timestamp: new Date(),
      readBy: []
    };
    
    // In a real app, this would be handled by a proper state management solution
    directMessages.push(newMessage);
  };
  
  return (
    <div className="app-container">
      <ServerSidebar 
        servers={servers} 
        activeServerId={activeServerId} 
        onServerClick={handleServerClick} 
      />
      {activeServerId === 'home' ? (
        <>
          <FriendsSidebar
            currentUser={currentUser}
            users={users}
            onSelectFriend={handleFriendSelect}
            selectedFriendId={selectedFriendId}
          />
          {selectedFriend ? (
            <DirectMessageChat
              currentUser={currentUser}
              friend={selectedFriend}
              messages={friendMessages}
              onSendMessage={handleSendDirectMessage}
            />
          ) : (
            <div className="empty-chat-container">
              <h2>Loading conversation...</h2>
            </div>
          )}
        </>
      ) : (
        <>
          <ChannelsSidebar 
            server={activeServer}
            channels={serverChannels}
            categories={serverCategories}
            activeChannelId={activeChannelId}
            currentUser={currentUser}
            onChannelClick={handleChannelClick}
          />
          <ChatContainer 
            channel={activeChannel}
            messages={channelMessages}
            users={users}
            currentUser={currentUser}
          />
          <MembersSidebar 
            users={users} 
            serverId={activeServerId} 
          />
        </>
      )}
    </div>
  );
};

export default DrocsidLayout;