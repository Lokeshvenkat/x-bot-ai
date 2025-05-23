import React, { useRef, useEffect } from 'react';
import Message from '../Message/Message';
import styles from './MessageList.module.css'; // Assuming you have a CSS module for styling

/**
 * MessageList component displays a list of chat messages.
 * It auto-scrolls to the latest message whenever the message list updates.
 *
 * @param {Array} messages - Array of message objects to render.
 */
const MessageList = ({ messages }) => {
  // Reference to the bottom of the messages container for auto-scrolling
  const messagesEndRef = useRef(null);

  // Scroll to the bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the last message
    }
  }, [messages]);

  return (
    <div className={styles.messages}>
      {/* Render each message using the Message component */}
      {messages.map((msg, index) => (
        <div key={index}>
          <Message
            sender={msg.sender}
            text={msg.text}
            time={msg.time}
            pastConvo={false}
          />
          {/* Ensure the message text is rendered within a span */}
          <span className={styles.messageText}>{msg.text}</span>
           {/* Display "Soul AI" within a span */}
          {msg.sender === 'ai' && <span className={styles.soulAI}>Soul AI</span>}
          {/* Ensure the AI's response is displayed within a p tag */}
          {msg.sender === 'ai' && <p className={styles.aiResponse}>{msg.text}</p>}
        </div>
      ))}

      {/* This div is used as the scroll target to always scroll to the latest message */}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default MessageList;
