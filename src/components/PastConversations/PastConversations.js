import React, { useContext, useState, useEffect } from 'react';
import Message from '../Message/Message';
import { Rating } from '@mui/material';
import { LightThemeContext } from '../../contexts/ThemeContext';
import styles from './PastConversations.module.css';

/**
 * PastConversations component displays a list of previous chat conversations.
 * Allows filtering by rating, shows conversation messages, and feedback if available.
 *
 * @param {Array} previousChats - Array of chat conversation objects.
 */
export default function PastConversations({ previousChats = [] }) {
  // Use local state to hold filtered chats and filter rating
  const [filteredChat, setFilteredChats] = useState(previousChats);
  const [rating, setRating] = useState('');
  const { lightTheme } = useContext(LightThemeContext);

  // Sync filtered chats with previousChats prop updates
  useEffect(() => {
    setFilteredChats(previousChats);
  }, [previousChats]);

  /**
   * Filters conversations by rating.
   * @param {object} e - The change event from the select input.
   */
  const handleFilter = (e) => {
    const selectedRating = e.target.value;
    setRating(selectedRating);

    if (selectedRating === '') {
      setFilteredChats(previousChats);
      return;
    }

    // Filter chats based on rating value (converted to number)
    const filtered = previousChats.filter(
      (chat) => chat.rating === Number(selectedRating)
    );
    setFilteredChats(filtered);
  };

  if (!previousChats || previousChats.length === 0) {
    return <p className={styles['no-prev-chat']}>No previous chats</p>;
  }

  return (
    <div className={styles.PastConversations}>
      <p className={styles.heading}>Conversation History</p>

      {/* Rating filter dropdown */}
      <div className={styles['rating-filter']}>
        <select
          name="rating"
          id="rating"
          value={rating}
          onChange={handleFilter}
          style={{
            background: !lightTheme && '#5b4185',
            color: !lightTheme && 'white',
          }}
          aria-label="Filter conversations by rating"
        >
          <option value="">All Ratings</option>
          <option value="0">0 Stars</option>
          <option value="1">1 Stars</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
      </div>

      {/* Conversation list */}
      <div
        className={styles.content}
        style={{ background: !lightTheme ? 'transparent' : undefined }}
      >
        {filteredChat.length > 0 ? (
          filteredChat.map((chat, index) => (
            <div className={styles['chat-section']} key={index}>
              <p className={styles.date}>
                {chat.date === new Date().toDateString() ? 'Today' : chat.date}
              </p>

              <div
                className={styles['prev-convo-messages']}
                style={{ background: !lightTheme ? '#310E68' : undefined }}
              >
                {/* Render each message */}
                {(chat.messages || []).map((message, idx) => (
                  <Message
                    key={idx}
                    sender={message.sender}
                    text={message.text}
                    time={message.time}
                    pastConvo={true}
                  />
                ))}

                {/* Show rating if available */}
                {chat.rating > 0 && (
                  <p className={styles.rating}>
                    Rating:
                    <Rating
                      name="read-only"
                      value={chat.rating}
                      readOnly
                      size="small"
                      sx={{
                        '& .MuiRating-iconFilled': {
                          color: '#000000',
                        },
                      }}
                      aria-label={`Rating: ${chat.rating} stars`}
                    />
                  </p>
                )}

                {/* Show feedback if available */}
                {chat.feedback && (
                  <div className={styles['feedback-section']}>
                    <p className={styles['feedback-heading']}>Feedback: </p>
                    <p className={styles.feedback}>{chat.feedback}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className={styles['no-prev-chat']}>No conversations match this rating</p>
        )}
      </div>
    </div>
  );
}
