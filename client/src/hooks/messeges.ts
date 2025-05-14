interface Message {
  id: string;
  userId: string;
  content: string;
  serverId: string; 
  targetId?: string; 
  time: string;
}

class MessagesStore {
  private messages: Message[] = [
    {
      id: '1',
      userId: '1',
      content: 'Welcome to Server A!',
      serverId: '1',
      time: '10:00 AM'
    },
    {
      id: '2',
      userId: '2',
      content: 'Hello everyone!',
      serverId: '2',
      time: '10:05 AM'
    }
  ];

  addMessage(message: Omit<Message, 'id'>) {
    const newMessage: Message = {
      id: Date.now().toString(),
      ...message
    };
    this.messages.push(newMessage);
    return newMessage;
  }

  getMessagesByServer(serverId: string) {
    return this.messages.filter(message => message.serverId === serverId);
  }

  getMessagesByDM(targetId: string) {
    return this.messages.filter(message => 
      message.serverId === targetId || message.targetId === targetId
    );
  }
}

const messagesStore = new MessagesStore();
export default messagesStore;