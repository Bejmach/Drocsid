export interface UserRole {
  id: string;
  name: string;
  color: string;
  permissions: string[];
  position: number;
}

export interface ServerMember {
  userId: string;
  serverId: string;
  roles: string[];
  joinedAt: Date;
  nickname?: string;
}

export interface User {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  status: 'online' | 'idle' | 'dnd' | 'offline' | 'streaming';
  activity?: {
    type: 'playing' | 'streaming' | 'listening' | 'watching' | 'custom';
    name: string;
  };
  friends?: string[];
}

export const roles: UserRole[] = [
  {
    id: 'admin',
    name: 'Admin',
    color: '#f47fff',
    permissions: ['ADMINISTRATOR'],
    position: 3
  },
  {
    id: 'moderator',
    name: 'Moderator',
    color: '#5865f2',
    permissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS'],
    position: 2
  },
  {
    id: 'member',
    name: 'Member',
    color: '#3ba55c',
    permissions: ['SEND_MESSAGES', 'READ_MESSAGES'],
    position: 1
  }
];

export const serverMembers: ServerMember[] = [
  {
    userId: '1234567890',
    serverId: 'server1',
    roles: ['admin'],
    joinedAt: new Date('2023-01-01')
  },
  {
    userId: '1111111111',
    serverId: 'server1',
    roles: ['moderator'],
    joinedAt: new Date('2023-01-02')
  },
  {
    userId: '2222222222',
    serverId: 'server1',
    roles: ['member'],
    joinedAt: new Date('2023-01-03')
  },
  {
    userId: '3333333333',
    serverId: 'server2',
    roles: ['admin'],
    joinedAt: new Date('2023-01-04')
  },
  {
    userId: '4444444444',
    serverId: 'server2',
    roles: ['member'],
    joinedAt: new Date('2023-01-05')
  }
];

export const currentUser: User = {
  id: '1234567890',
  username: 'DiscordUser',
  discriminator: '1234',
  avatar: 'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  status: 'online',
  activity: {
    type: 'playing',
    name: 'Visual Studio Code'
  },
  friends: ['1111111111', '2222222222', '3333333333']
};

export const users: User[] = [
  {
    id: '1111111111',
    username: 'JaneDoe',
    discriminator: '0001',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    status: 'online',
    activity: {
      type: 'playing',
      name: 'Apex Legends'
    },
    friends: ['1234567890', '2222222222']
  },
  {
    id: '2222222222',
    username: 'JohnSmith',
    discriminator: '0002',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    status: 'idle',
    activity: {
      type: 'listening',
      name: 'Spotify'
    },
    friends: ['1234567890', '1111111111']
  },
  {
    id: '3333333333',
    username: 'AliceWonder',
    discriminator: '0003',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    status: 'dnd',
    activity: {
      type: 'streaming',
      name: 'Twitch'
    },
    friends: ['1234567890']
  },
  {
    id: '4444444444',
    username: 'BobBuilder',
    discriminator: '0004',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    status: 'offline'
  },
  {
    id: '5555555555',
    username: 'CharlieBrown',
    discriminator: '0005',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    status: 'online',
    activity: {
      type: 'custom',
      name: 'Working on projects'
    }
  },
  {
    id: '6666666666',
    username: 'DianaPrince',
    discriminator: '0006',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    status: 'idle'
  },
  {
    id: '7777777777',
    username: 'ElliotAlderson',
    discriminator: '0007',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    status: 'online',
    activity: {
      type: 'playing',
      name: 'Cyberpunk 2077'
    }
  },
  {
    id: '8888888888',
    username: 'FionaGallagher',
    discriminator: '0008',
    avatar: 'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    status: 'offline'
  }
];