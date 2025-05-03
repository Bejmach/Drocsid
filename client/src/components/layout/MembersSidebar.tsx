import React from 'react';
import { User, ServerMember, roles, serverMembers } from '../../data/users';

interface MembersSidebarProps {
  users: User[];
  serverId: string;
}

const MembersSidebar: React.FC<MembersSidebarProps> = ({ users, serverId }) => {
  // Get server members
  const serverMembersList = serverMembers.filter(member => member.serverId === serverId);
  
  // Map server members to users with roles
  const membersWithRoles = serverMembersList.map(member => {
    const user = users.find(u => u.id === member.userId);
    const userRoles = roles.filter(role => member.roles.includes(role.id))
      .sort((a, b) => b.position - a.position);
    
    return {
      ...user,
      roles: userRoles,
      joinedAt: member.joinedAt,
      nickname: member.nickname
    };
  }).filter((member): member is (User & { roles: typeof roles[number][] }) => !!member);
  
  // Group members by role and status
  const groupedMembers = membersWithRoles.reduce((acc, member) => {
    const highestRole = member.roles[0]?.id || 'member';
    if (!acc[highestRole]) {
      acc[highestRole] = {
        online: [],
        offline: []
      };
    }
    
    const statusGroup = member.status === 'offline' ? 'offline' : 'online';
    acc[highestRole][statusGroup].push(member);
    return acc;
  }, {} as Record<string, { online: typeof membersWithRoles, offline: typeof membersWithRoles }>);
  
  const renderStatusIndicator = (status: User['status']) => {
    let statusClass = '';
    
    switch (status) {
      case 'online':
        statusClass = 'bg-[#43b581]';
        break;
      case 'idle':
        statusClass = 'bg-[#faa61a]';
        break;
      case 'dnd':
        statusClass = 'bg-[#f04747]';
        break;
      case 'streaming':
        statusClass = 'bg-[#593695]';
        break;
      case 'offline':
        statusClass = 'bg-[#747f8d]';
        break;
    }
    
    return <div className={`status ${statusClass} absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#2f3136]`} />;
  };
  
  return (
    <div className="members-sidebar">
      {Object.entries(groupedMembers).map(([roleId, { online, offline }]) => {
        const role = roles.find(r => r.id === roleId);
        if (!role) return null;
        
        return (
          <div key={roleId} className="members-group">
            <h3 style={{ color: role.color }}>{role.name} — {online.length + offline.length}</h3>
            
            {online.map(member => (
              <div key={member.id} className="member-item">
                <div className="member-avatar">
                  <img src={member.avatar} alt={member.username} />
                  {renderStatusIndicator(member.status)}
                </div>
                <div className="member-info">
                  <div className="member-name" style={{ color: role.color }}>
                    {member.nickname || member.username}
                  </div>
                  {member.activity && (
                    <div className="member-activity">
                      {member.activity.type === 'playing' && `Playing ${member.activity.name}`}
                      {member.activity.type === 'streaming' && `Streaming ${member.activity.name}`}
                      {member.activity.type === 'listening' && `Listening to ${member.activity.name}`}
                      {member.activity.type === 'watching' && `Watching ${member.activity.name}`}
                      {member.activity.type === 'custom' && member.activity.name}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {offline.length > 0 && (
              <>
                <h4>Offline — {offline.length}</h4>
                {offline.map(member => (
                  <div key={member.id} className="member-item offline">
                    <div className="member-avatar">
                      <img src={member.avatar} alt={member.username} />
                      {renderStatusIndicator(member.status)}
                    </div>
                    <div className="member-info">
                      <div className="member-name">
                        {member.nickname || member.username}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MembersSidebar;