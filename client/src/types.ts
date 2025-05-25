export interface User {
  id: string;
  name: string;
  email: string;
}
export interface Message {
  id: string;
  content: string;
  userId: string;
  textChatId: string;
  time: string;
}
export interface Chat {
  id: string;
  name: string;
  members: User[];
}