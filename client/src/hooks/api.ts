import axios from 'axios';
import { Chat, Message, User } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: (name: string, email: string, password: string) =>
    api.get(`/users/register/${name}/${email}/${password}`),
  
  login: (email: string, password: string) =>
    api.get(`/users/login/${email}/${password}`)
};

export const userService = {
  getAll: () => api.get<User[]>('/users/all'),
  getUserChats: (userId: string) => api.get<Chat[]>(`/textchat/chats/${userId}`)
};

export const chatService = {
  create: (name: string) => api.get<Chat>(`/textchat/create/${name}`),
  getAll: () => api.get<Chat[]>('/textchat/all'),
  getDMs: (userId: string) => api.get<Chat[]>(`/textchat/dm/${userId}`),
  join: (chatId: string, userId: string) =>
    api.get(`/usertextchat/join/${chatId}/${userId}`),
  getChatUsers: (chatId: string) => api.get<User[]>(`/users/chat/${chatId}`)
};

export const messageService = {
  getMessages: (chatId: string, limit: number = 50, offset: number = 0) =>
    api.get<Message[]>(`/messages/get/${chatId}/${limit}/${offset}`),
  
  getMessagesAfter: (chatId: string, messageId: string) =>
    api.get<Message[]>(`/messages/get/after/${chatId}/${messageId}`),
  
  send: (chatId: string, userId: string, content: string) =>
    api.get<Message>(`/messages/send/${chatId}/${userId}/${content}`),
  
  getAll: () => api.get<Message[]>('/messages/all')
};

