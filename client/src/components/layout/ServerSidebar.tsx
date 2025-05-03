import React from 'react';
import { Server } from '../../data/servers';
import { Plus, Compass, Home } from 'lucide-react';

interface ServerSidebarProps {
  servers: Server[];
  activeServerId: string;
  onServerClick: (serverId: string) => void;
}

const ServerSidebar: React.FC<ServerSidebarProps> = ({ 
  servers, 
  activeServerId, 
  onServerClick 
}) => {
  const renderServerIcon = (server: Server) => {
    if (server.id === 'home') {
      return (
        <div className={`server-icon ${activeServerId === server.id ? 'active' : ''}`}>
          <Home size={24} color="#fff" />
        </div>
      );
    }
    
    if (server.id === 'add-server') {
      return (
        <div className="server-icon">
          <Plus size={24} color="#43b581" />
        </div>
      );
    }
    
    if (server.id === 'explore-servers') {
      return (
        <div className="server-icon">
          <Compass size={24} color="#43b581" />
        </div>
      );
    }
    
    if (server.icon) {
      return (
        <div className={`server-icon ${activeServerId === server.id ? 'active' : ''}`}>
          <img src={server.icon} alt={server.name} />
        </div>
      );
    }
    
    // Show initials if no icon
    const initials = server.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2);
      
    return (
      <div className={`server-icon ${activeServerId === server.id ? 'active' : ''}`}>
        <div className="server-initials">{initials}</div>
      </div>
    );
  };
  
  return (
    <div className="servers-sidebar">
      {servers.map((server) => (
        <div key={server.id} onClick={() => onServerClick(server.id)}>
          {renderServerIcon(server)}
        </div>
      ))}
    </div>
  );
};

export default ServerSidebar;