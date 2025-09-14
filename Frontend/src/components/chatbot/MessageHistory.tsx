import React from "react";
import { useChatHistory } from "../../hooks/useApi";

const MessageHistory: React.FC = () => {
  const { chatHistory } = useChatHistory();

  return (
    <div className="message-history">
      <h2>Chat History</h2>
      <ul>
        {chatHistory.map((message, index) => (
          <li key={index} className={message.role}>
            <strong>{message.role === "user" ? "You" : "Bot"}:</strong> {message.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageHistory;