import React, { useState } from 'react';
import { User } from '../../data/users';
import { Search, MessageSquare, MoreVertical } from 'lucide-react';

interface FriendsListProps {
  currentUser: User;
  users: User[];
  onStartChat: (userId: string) => void;
}

const FriendsList: React.FC<FriendsListProps> = ({ currentUser, users, onStartChat }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<User['status'] | 'all'>('all');

  const userFriends = users.filter(user => 
    currentUser.friends?.includes(user.id)
  );

  const filteredFriends = userFriends.filter(friend => {
    const matchesSearch = friend.username.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || friend.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const groupedFriends = {
    online: filteredFriends.filter(f => f.status === 'online'),
    idle: filteredFriends.filter(f => f.status === 'idle'),
    dnd: filteredFriends.filter(f => f.status === 'dnd'),
    offline: filteredFriends.filter(f => f.status === 'offline')
  };

  return (
    <div className="friends-list">
      <div className="friends-header">
        <h2>Friends</h2>
        <div className="status-filters">
          <button 
            className={statusFilter === 'all' ? 'active' : ''} 
            onClick={() => setStatusFilter('all')}
          >
            All
          </button>
          <button 
            className={statusFilter === 'online' ? 'active' : ''} 
            onClick={() => setStatusFilter('online')}
          >
            Online
          </button>
          <button 
            className={statusFilter === 'idle' ? 'active' : ''} 
            onClick={() => setStatusFilter('idle')}
          >
            Idle
          </button>
          <button 
            className={statusFilter === 'dnd' ? 'active' : ''} 
            onClick={() => setStatusFilter('dnd')}
          >
            Do Not Disturb
          </button>
          <button 
            className={statusFilter === 'offline' ? 'active' : ''} 
            onClick={() => setStatusFilter('offline')}
          >
            Offline
          </button>
        </div>
      </div>

      <div className="friends-search">
        <Search size={20} />
        <input
          type="text"
          placeholder="Search friends"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="friends-groups">
        {Object.entries(groupedFriends).map(([status, friends]) => (
          friends.length > 0 && (
            <div key={status} className="friend-group">
              <h3>{status.charAt(0).toUpperCase() + status.slice(1)} — {friends.length}</h3>
              {friends.map(friend => (
                <div key={friend.id} className="friend-item">
                  <div className="friend-avatar">
                    <img src={friend.avatar} alt={friend.username} />
                    <div className={`status-indicator ${friend.status}`} />
                  </div>
                  <div className="friend-info">
                    <div className="friend-name">
                      {friend.username}
                      <span className="discriminator">#{friend.discriminator}</span>
                    </div>
                    {friend.activity && (
                      <div className="friend-activity">
                        {friend.activity.type === 'playing' && `Playing ${friend.activity.name}`}
                        {friend.activity.type === 'streaming' && `Streaming ${friend.activity.name}`}
                        {friend.activity.type === 'listening' && `Listening to ${friend.activity.name}`}
                        {friend.activity.type === 'watching' && `Watching ${friend.activity.name}`}
                        {friend.activity.type === 'custom' && friend.activity.name}
                      </div>
                    )}
                  </div>
                  <div className="friend-actions">
                    <button onClick={() => onStartChat(friend.id)}>
                      <MessageSquare size={20} />
                    </button>
                    <button>
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default FriendsList;