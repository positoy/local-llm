"use client";

import { useChat } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";
import { useEffect, useRef } from "react";

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "api/chat",
  });
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.role === "user" ? "user" : "ai"}`}
          >
            <div className="bubble">
              {message.role === "user" ? "User: " : "AI: "}
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          name="prompt"
          value={input}
          onChange={handleInputChange}
          id="input"
        />
        <button type="submit">Submit</button>
      </form>
      <style jsx>{`
        .chat-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          justify-content: flex-end;
        }
        .messages {
          flex-grow: 1;
          overflow-y: auto;
          padding: 10px;
        }
        .message {
          display: flex;
          margin-bottom: 10px;
        }
        .message.user {
          justify-content: flex-end;
        }
        .message.ai {
          justify-content: flex-start;
        }
        .bubble {
          max-width: 60%;
          padding: 10px;
          border-radius: 15px;
          background-color: #f1f1f1;
          white-space: pre-wrap; /* Handles new lines */
        }
        .message.user .bubble {
          background-color: #007bff;
          color: white;
        }
        .input-form {
          display: flex;
          padding: 10px;
          border-top: 1px solid #ccc;
        }
        .input-form input {
          flex-grow: 1;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 15px;
          margin-right: 10px;
        }
        .input-form button {
          padding: 10px 20px;
          border: none;
          border-radius: 15px;
          background-color: #007bff;
          color: white;
          cursor: pointer;
        }
        .input-form button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
}
