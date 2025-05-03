export interface Server {
  id: string;
  name: string;
  icon: string | null;
  ownerId: string;
  isActive?: boolean;
}

export const servers: Server[] = [
  {
    id: 'home',
    name: 'Home',
    icon: null,
    ownerId: '1234567890',
    isActive: true
  },
  {
    id: 'server1',
    name: 'ReactJS Developers',
    icon: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ownerId: '2222222222'
  },
  {
    id: 'server2',
    name: 'Gaming Squad',
    icon: 'https://images.pexels.com/photos/7915254/pexels-photo-7915254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ownerId: '1111111111'
  },
  {
    id: 'server3',
    name: 'Music Lovers',
    icon: 'https://images.pexels.com/photos/4722513/pexels-photo-4722513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ownerId: '3333333333'
  },
  {
    id: 'server4',
    name: 'Anime Club',
    icon: null,
    ownerId: '5555555555'
  },
  {
    id: 'server5',
    name: 'Study Group',
    icon: null,
    ownerId: '7777777777'
  },
  {
    id: 'add-server',
    name: 'Add a Server',
    icon: 'add',
    ownerId: '1234567890'
  },
  {
    id: 'explore-servers',
    name: 'Explore Public Servers',
    icon: 'compass',
    ownerId: '1234567890'
  }
];