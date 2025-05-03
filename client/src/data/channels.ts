export interface Channel {
  id: string;
  name: string;
  type: 'text' | 'voice' | 'announcement' | 'stage' | 'forum';
  serverId: string;
  parentId?: string;
  isActive?: boolean;
}

export interface ChannelCategory {
  id: string;
  name: string;
  serverId: string;
  position: number;
  isCollapsed?: boolean;
}

export const categories: ChannelCategory[] = [
  {
    id: 'cat1',
    name: 'Text Channels',
    serverId: 'server1',
    position: 0
  },
  {
    id: 'cat2',
    name: 'Voice Channels',
    serverId: 'server1',
    position: 1
  },
  {
    id: 'cat3',
    name: 'Game Channels',
    serverId: 'server2',
    position: 0
  },
  {
    id: 'cat4',
    name: 'Voice Chat',
    serverId: 'server2',
    position: 1
  },
  {
    id: 'cat5',
    name: 'Discussion',
    serverId: 'server3',
    position: 0
  },
  {
    id: 'cat6',
    name: 'Music Rooms',
    serverId: 'server3',
    position: 1
  }
];

export const channels: Channel[] = [
  // Direct Messages
  {
    id: 'dm1',
    name: 'JaneDoe',
    type: 'text',
    serverId: 'home',
    isActive: true
  },
  {
    id: 'dm2',
    name: 'JohnSmith',
    type: 'text',
    serverId: 'home'
  },
  {
    id: 'dm3',
    name: 'AliceWonder',
    type: 'text',
    serverId: 'home'
  },
  {
    id: 'dm4',
    name: 'BobBuilder',
    type: 'text',
    serverId: 'home'
  },
  
  // ReactJS Server
  {
    id: 'channel1',
    name: 'welcome',
    type: 'text',
    serverId: 'server1',
    parentId: 'cat1'
  },
  {
    id: 'channel2',
    name: 'general',
    type: 'text',
    serverId: 'server1',
    parentId: 'cat1'
  },
  {
    id: 'channel3',
    name: 'reactjs-help',
    type: 'text',
    serverId: 'server1',
    parentId: 'cat1'
  },
  {
    id: 'channel4',
    name: 'job-postings',
    type: 'text',
    serverId: 'server1',
    parentId: 'cat1'
  },
  {
    id: 'channel5',
    name: 'General Voice',
    type: 'voice',
    serverId: 'server1',
    parentId: 'cat2'
  },
  {
    id: 'channel6',
    name: 'Pair Programming',
    type: 'voice',
    serverId: 'server1',
    parentId: 'cat2'
  },
  
  // Gaming Server
  {
    id: 'channel7',
    name: 'welcome',
    type: 'text',
    serverId: 'server2',
    parentId: 'cat3'
  },
  {
    id: 'channel8',
    name: 'general',
    type: 'text',
    serverId: 'server2',
    parentId: 'cat3'
  },
  {
    id: 'channel9',
    name: 'apex-legends',
    type: 'text',
    serverId: 'server2',
    parentId: 'cat3'
  },
  {
    id: 'channel10',
    name: 'minecraft',
    type: 'text',
    serverId: 'server2',
    parentId: 'cat3'
  },
  {
    id: 'channel11',
    name: 'Game Chat',
    type: 'voice',
    serverId: 'server2',
    parentId: 'cat4'
  },
  {
    id: 'channel12',
    name: 'Chill Zone',
    type: 'voice',
    serverId: 'server2',
    parentId: 'cat4'
  },
  
  // Music Server
  {
    id: 'channel13',
    name: 'welcome',
    type: 'text',
    serverId: 'server3',
    parentId: 'cat5'
  },
  {
    id: 'channel14',
    name: 'general',
    type: 'text',
    serverId: 'server3',
    parentId: 'cat5'
  },
  {
    id: 'channel15',
    name: 'music-recommendations',
    type: 'text',
    serverId: 'server3',
    parentId: 'cat5'
  },
  {
    id: 'channel16',
    name: 'Listening Party',
    type: 'voice',
    serverId: 'server3',
    parentId: 'cat6'
  },
  {
    id: 'channel17',
    name: 'Jam Session',
    type: 'voice',
    serverId: 'server3',
    parentId: 'cat6'
  }
];