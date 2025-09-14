import React, { useState } from 'react';
import { sendMessage, getChatHistory } from '../../services/chatbot';

const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

  const handleSendMessage = async () => {
    if (!input) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    
    try {
      const response = await sendMessage(input);
      const botMessage = { role: 'bot', content: response.data.message };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setInput('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <div className="chat-interface">
      <div className="message-history">
        {messages.map((msg, index) => (
          <div key={index} className={msg.role}>
            <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Type your message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatInterface;