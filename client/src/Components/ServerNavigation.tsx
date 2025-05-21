import React from 'react';
import ServerList from './ServerList';
import FriendsList from './FriendList';
import LogoutIcon from '@mui/icons-material/Logout';

interface ServerNavigationProps {
  isFriendsList: boolean;
  selectedServer: string;
  toggleFriendsList: () => void;
  onServerChange: (serverId: string) => void;
  onSelectFriend: (friendId: string) => void;
  onLogout: () => void;
}

const ServerNavigation: React.FC<ServerNavigationProps> = ({
  isFriendsList,
  selectedServer,
  toggleFriendsList,
  onServerChange,
  onSelectFriend,
  onLogout,
}) => {
  return (
    <div className="server-navigation">
      {isFriendsList ? (
        <FriendsList
          onBack={toggleFriendsList}
          onSelectFriend={onSelectFriend}
          selectedServer={selectedServer}
        />
      ) : (
        <ServerList
          selectedServer={selectedServer}
          onServerChange={onServerChange}
          onToggleFriends={toggleFriendsList}
        />
      )}
      <button className="logout-button" onClick={onLogout}>
        <LogoutIcon />
      </button>
    </div>
  );
};

export default ServerNavigation;