import React, { useContext, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import ThumbsRating from '../ThumbsRating/ThumbsRating';
import { LightThemeContext } from '../../contexts/ThemeContext';
import styles from './Message.module.css';

/**
 * Message component renders an individual chat message bubble.
 * It shows the sender's avatar, message text, timestamp, and optionally a thumbs rating.
 */
const Message = ({ sender, text, time, pastConvo }) => {
  const [hovered, setHovered] = useState(false);

  // Event handlers to toggle thumbs rating visibility on hover
  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  const { lightTheme } = useContext(LightThemeContext);

  // Responsive avatar size for mobile vs desktop
  const isMobile = useMediaQuery('(max-width:590px)');
  const avatarSize = isMobile ? '45px' : '65px';

  return (
    <div
      className={styles.messageBubble}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Sender avatar */}
      <div>
        <img
          src={sender === 'user' ? '/images/user-img.svg' : '/images/ai-img.svg'}
          alt="avatar"
          style={{ width: avatarSize }}
        />
      </div>

      {/* Message content */}
      <div className={styles.messageBubbleText}>
        <div>
          <p className={styles.name}>{sender === 'user' ? 'You' : 'Bot AI'}</p>
          <p
            className={styles.info}
            style={{ color: !lightTheme ? '#a79fb3' : undefined }}
          >
            {text}
          </p>
        </div>

        {/* Timestamp and optional thumbs rating */}
        <div className={styles.timeAndRating}>
          <p
            className={styles.time}
            style={{ color: !lightTheme ? '#9586ad' : undefined }}
          >
            {time}
          </p>
          {!pastConvo && <ThumbsRating hovered={hovered} />}
        </div>
      </div>
    </div>
  );
};

export default Message;
