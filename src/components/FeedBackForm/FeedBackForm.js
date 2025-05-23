import { Box, Modal, Backdrop, Rating } from '@mui/material';
import React, { useContext } from 'react';
import { LightThemeContext } from '../../contexts/ThemeContext';
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent';
import styles from './FeedBackForm.module.css';

/**
 * FeedbackForm component renders a modal popup to collect
 * user rating and additional comments as feedback.
 */
const FeedbackForm = ({ open, setOpen, rating, setRating, comment, setComment, saveFeedback }) => {
  const { lightTheme } = useContext(LightThemeContext);

  // Close modal handler
  const handleClose = () => setOpen(false);

  // Submit feedback handler: saves feedback, resets inputs, closes modal
  const handleSubmit = () => {
    saveFeedback();
    setRating(0);
    setComment('');
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={styles.feedbackForm}
      slots={{
        backdrop: Backdrop,
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',  // Dark translucent backdrop
            backdropFilter: 'blur(2px)',            // Slight blur effect
          },
        },
      }}
    >
      <Box
        className={lightTheme ? styles.modalBoxLight : styles.modalBoxDark}
      >
        <div className={`${styles.feedbackForm} ${!lightTheme ? styles.dark : ''}`}>
          {/* Header section */}
          <div className={styles.feedbackHeader}>
            {lightTheme ? (
              <img src="/images/feedback-logo.svg" alt="logo" className={styles.logo} />
            ) : (
              <WbIncandescentIcon
                className={styles.logo}
                style={{ transform: 'rotate(180deg)', color: 'white' }}
              />
            )}
            <span>Provide Additional Feedback</span>

            {/* Close button */}
            {lightTheme ? (
              <img
                src="/images/feedback-close-button.svg"
                alt="close-button"
                className={styles.closeButton}
                onClick={handleClose}
              />
            ) : (
              <span
                className={styles.closeButton}
                onClick={handleClose}
                style={{ color: 'white' }}
                role="button"
                aria-label="Close"
              >
                X
              </span>
            )}
          </div>

          {/* Star rating input */}
          <div className={styles.feedbackRating}>
            <Rating
              name="simple-controlled"
              value={Number(rating)}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              aria-label="Rating"
            />
          </div>

          {/* Textarea for additional comments */}
          <textarea
            className={`${styles.feedbackMessage} ${!lightTheme ? styles.dark : ''}`}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter your feedback here..."
            aria-label="Feedback comments"
          />

          {/* Submit button */}
          <div className={styles.feedbackSubmit}>
            <button className={!lightTheme ? styles.dark : ''} onClick={handleSubmit} aria-label="Submit feedback">
              Submit
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default FeedbackForm;
