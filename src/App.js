import './App.css';
import { Link } from 'react-router-dom';
import ChatBox from './components/ChatBox/ChatBox';
import React, { useState } from 'react';
import { LightThemeContext } from './contexts/ThemeContext';
import PastConversations from './components/PastConversations/PastConversations';

function App() {
  // State to manage the current theme (true = light theme, false = dark theme)
  const [lightTheme, setLightTheme] = useState(true);

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setLightTheme(!lightTheme);
  };

  return (
    // Provide the current theme state and toggle function to the component tree
    <LightThemeContext.Provider value={{ lightTheme, toggleTheme }}>
      {/* Use StrictMode to help identify potential problems in the app */}
      <React.StrictMode>
        {/* Render the ChatBox component */}
        <ChatBox />
        <a href="/">New Chat</a>
        <Link to="/history">Past Conversations</Link>
      </React.StrictMode>
    </LightThemeContext.Provider>
  );
}

export default App;
