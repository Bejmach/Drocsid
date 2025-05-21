export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Message {
  id: string;
  userId: string;
  content: string;
  chatId: string;
  time: string;
}

export interface Chat {
  id: string;
  name: string;
  isDM: boolean;
  participants?: string[];
}

export interface UserChat {
  userId: string;
  chatId: string;
}