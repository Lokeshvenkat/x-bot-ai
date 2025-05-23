import React, { useContext } from 'react';
import FeedbackForm from '../FeedBackForm/FeedBackForm';
import { LightThemeContext } from '../../contexts/ThemeContext';
import styles from './InputArea.module.css';

/**
 * InputArea component for message input, send button,
 * save feedback button, and conditionally renders FeedbackForm modal.
 */
function InputArea({
  input,
  setInput,
  handleSendMessage,
  handleFeedbackModal,
  setShowFeedbackModal,
  showFeedbackModal,
  rating,
  comment,
  setRating,
  setComment,
  saveFeedback,
}) {
  const { lightTheme } = useContext(LightThemeContext);

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    if (input.trim() === '') return;
    handleSendMessage(); // assume this function sends message to bot
    setInput(''); // clear input field
  };

  return (
    <div className={styles.inputArea}>
      {/* Text input for chat messages */}
      <form onSubmit={handleSubmit} className={styles.inputForm}>
        <input
          type="text"
          placeholder="Message Bot AI..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={`${styles.inputField} ${!lightTheme ? styles.inputFieldDark : ''}`}
        />
        <button type="submit" className={styles.sendButton}>Send</button>
      </form>

      {/* Button to send the chat message */}
      <button
        type="button"
        onClick={handleSendMessage}
        className={`${styles.button} ${!lightTheme ? styles.buttonDark : ''}`}
      >
        Ask
      </button>

      {/* Button to open the feedback modal */}
      <button
        type="button"
        onClick={handleFeedbackModal}
        className={`${styles.button} ${!lightTheme ? styles.buttonDark : ''}`}
      >
        Save
      </button>

      {/* Conditionally render the FeedbackForm modal */}
      {showFeedbackModal && (
        <FeedbackForm
          setOpen={setShowFeedbackModal}
          open={showFeedbackModal}
          rating={rating}
          comment={comment}
          setRating={setRating}
          setComment={setComment}
          saveFeedback={saveFeedback}
        />
      )}
    </div>
  );
}

export default InputArea;
