import React, { useContext } from 'react';
import { Drawer } from '@mui/material';
import { LightThemeContext } from '../../contexts/ThemeContext';
import styles from './ChatSideBar.module.css';

/**
 * ChatSidebar component renders the sidebar for chat navigation.
 * It conditionally renders a Material UI Drawer on mobile or a fixed sidebar on desktop.
 *
 * Props:
 * - isMobile: boolean indicating if the device is mobile-sized
 * - isDrawerOpen: boolean to control drawer visibility on mobile
 * - toggleDrawer: function to open/close the drawer
 * - startNewChat: function to initiate a new chat
 * - handlePastConvo: function to show past conversations
 */
const ChatSidebar = ({ isMobile, isDrawerOpen, toggleDrawer, startNewChat, handlePastConvo }) => {
  // Consume the current theme state (light or dark)
  const { lightTheme } = useContext(LightThemeContext);

  return (
    <>
      {isMobile ? (
        // On mobile, use a Material UI Drawer component for sidebar sliding effect
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={toggleDrawer(false)}
          className={styles.drawer}
          PaperProps={{
            style: {
              backgroundColor: !lightTheme ? 'black' : undefined, // Dark background for drawer on mobile
              color: !lightTheme ? 'white' : undefined,           // White text color for readability
            },
          }}
        >
          {/* Render the sidebar content inside the drawer */}
          <SidebarContent startNewChat={startNewChat} handlePastConvo={handlePastConvo} />
        </Drawer>
      ) : (
        // On desktop, render a fixed sidebar div with conditional background
        <div className={styles.drawer} style={{ background: !lightTheme ? 'black' : undefined }}>
          <SidebarContent startNewChat={startNewChat} handlePastConvo={handlePastConvo} />
        </div>
      )}
    </>
  );
};

/**
 * SidebarContent renders the actual clickable elements and logo inside the sidebar.
 *
 * Props:
 * - startNewChat: callback for creating a new chat session
 * - handlePastConvo: callback for loading past conversations
 */
const SidebarContent = ({ startNewChat, handlePastConvo }) => {
  const { lightTheme } = useContext(LightThemeContext);

  return (
    <div>
      {/* Header section with logo and 'New Chat' button */}
      <div className={styles.drawerHeader} style={{ background: !lightTheme ? 'black' : undefined }}>
        <img src="/images/logo2.svg" alt="logo" className={styles.logoImg} />
        <a
          href="/"
          className={styles.newChatButton}
          onClick={(e) => {
            e.preventDefault();
            startNewChat();
          }}
          aria-label="Start a new chat"
        >
          New Chat
        </a>
        {/* Display different new chat icons depending on the theme */}
        {lightTheme ? (
          <img
            src="/images/new-chat.svg"
            className={styles.newChatButton}
            onClick={startNewChat}
            alt="new chat"
          />
        ) : (
          <img
            src="/images/new-chat-white.svg"
            className={styles.newChatButton}
            onClick={startNewChat}
            alt="new chat white"
          />
        )}
      </div>

      {/* Button to view past conversations */}
      <button
        className={styles.pastConvoButton}
        onClick={handlePastConvo}
        style={{ background: !lightTheme ? 'magenta' : undefined, color: !lightTheme ? 'white' : undefined }}
        aria-label="View past conversations"
      >
        Past Conversations
      </button>
    </div>
  );
};

export default ChatSidebar;
