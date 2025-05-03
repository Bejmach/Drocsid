export interface MessageReaction {
  emoji: string;
  count: number;
  reacted?: boolean;
}

export interface Message {
  id: string;
  content: string;
  userId: string;
  channelId: string;
  timestamp: Date;
  attachments?: string[];
  reactions?: MessageReaction[];
  edited?: boolean;
  isPinned?: boolean;
  readBy?: string[];
  isContinuation?: boolean;
}

export interface DirectMessage extends Message {
  recipientId: string;
}

export interface TypingIndicator {
  userId: string;
  channelId: string;
  timestamp: Date;
}

export const messages: Message[] = [
  {
    id: 'msg1',
    content: 'Welcome to the channel!',
    userId: '1111111111',
    channelId: 'channel1',
    timestamp: new Date('2024-03-20T10:00:00'),
    readBy: ['1234567890']
  },
  {
    id: 'msg2',
    content: 'Thanks! Excited to be here.',
    userId: '1234567890',
    channelId: 'channel1',
    timestamp: new Date('2024-03-20T10:05:00'),
    readBy: ['1111111111']
  }
];

export const directMessages: DirectMessage[] = [
  {
    id: 'dm1',
    content: 'Hey, how are you doing?',
    userId: '1111111111',
    recipientId: '1234567890',
    channelId: 'dm1',
    timestamp: new Date('2024-03-20T10:30:00'),
    readBy: ['1234567890']
  },
  {
    id: 'dm2',
    content: 'I\'m good! Working on this new project. How about you?',
    userId: '1234567890',
    recipientId: '1111111111',
    channelId: 'dm1',
    timestamp: new Date('2024-03-20T10:32:00'),
    readBy: ['1111111111']
  },
  {
    id: 'dm3',
    content: 'Just finished that game we talked about. It was amazing!',
    userId: '1111111111',
    recipientId: '1234567890',
    channelId: 'dm1',
    timestamp: new Date('2024-03-20T10:34:00'),
    readBy: ['1234567890']
  }
];

export const typingIndicators: TypingIndicator[] = [];