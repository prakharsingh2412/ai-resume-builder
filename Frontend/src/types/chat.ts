export interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
}

export interface ChatHistory {
  userId: string;
  messages: ChatMessage[];
}