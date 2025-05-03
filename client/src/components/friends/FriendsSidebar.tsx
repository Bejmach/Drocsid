import React, { useState } from 'react';
import { User } from '../../data/users';
import { Search, Plus, MessageSquare, Mic, Headphones, Settings } from 'lucide-react';
import SettingsModal from '../settings/SettingsModal';

interface FriendsSidebarProps {
  currentUser: User;
  users: User[];
  onSelectFriend: (userId: string) => void;
  selectedFriendId?: string;
}

const FriendsSidebar: React.FC<FriendsSidebarProps> = ({
  currentUser,
  users,
  onSelectFriend,
  selectedFriendId
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);

  const friends = users.filter(user => 
    currentUser.friends?.includes(user.id) &&
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onlineFriends = friends.filter(f => f.status !== 'offline');
  const offlineFriends = friends.filter(f => f.status === 'offline');

  const formatLastActive = (user: User) => {
    if (user.status !== 'offline') return null;
    return 'Last seen recently';
  };

  return (
    <div className={`friends-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="friends-sidebar-header">
        <button className="new-message-btn" aria-label="New Message">
          <Plus size={20} />
          <MessageSquare size={20} />
        </button>
        <button 
          className="collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      <div className="friends-search">
        <Search size={16} />
        <input
          type="text"
          placeholder="Search friends"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="friends-list">
        {onlineFriends.length > 0 && (
          <div className="friends-section">
            <h3>Online — {onlineFriends.length}</h3>
            {onlineFriends.map(friend => (
              <div
                key={friend.id}
                className={`friend-item ${selectedFriendId === friend.id ? 'selected' : ''}`}
                onClick={() => onSelectFriend(friend.id)}
              >
                <div className="friend-avatar">
                  <img src={friend.avatar} alt={friend.username} />
                  <div className={`status-indicator ${friend.status}`} />
                </div>
                {!isCollapsed && (
                  <div className="friend-info">
                    <div className="friend-name">{friend.username}</div>
                    {friend.activity && (
                      <div className="friend-activity">{friend.activity.name}</div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {offlineFriends.length > 0 && (
          <div className="friends-section">
            <h3>Offline — {offlineFriends.length}</h3>
            {offlineFriends.map(friend => (
              <div
                key={friend.id}
                className={`friend-item ${selectedFriendId === friend.id ? 'selected' : ''}`}
                onClick={() => onSelectFriend(friend.id)}
              >
                <div className="friend-avatar">
                  <img src={friend.avatar} alt={friend.username} />
                  <div className="status-indicator offline" />
                </div>
                {!isCollapsed && (
                  <div className="friend-info">
                    <div className="friend-name">{friend.username}</div>
                    <div className="last-active">{formatLastActive(friend)}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="user-area">
        <div className="user-avatar">
          <img src={currentUser.avatar} alt={currentUser.username} />
          <div className={`status-indicator ${currentUser.status}`} />
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

export default FriendsSidebar;