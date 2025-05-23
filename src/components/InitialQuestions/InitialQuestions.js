import React, { useContext } from 'react';
import { LightThemeContext } from '../../contexts/ThemeContext';
import styles from './InitialQuestions.module.css';

/**
 * InitialQuestions component shows a set of example questions
 * that users can click to get an immediate AI response.
 * Layout adjusts responsively based on isMobile flag.
 */
export default function InitialQuestions({ isMobile, initialQuestions, handleQuestionClick }) {
  const { lightTheme } = useContext(LightThemeContext);

  // Determine container class based on device type
  const questionsContainerClass = isMobile ? styles.questionsFlex : styles.questionsGrid;

  // Determine button font size
  const buttonFontSize = isMobile ? '10px' : '16px';

  return (
    <div className={styles.initialQuestions}>
      {/* Welcome section with heading and logo */}
      <div className={styles.welcomeSection}>
        <p>How Can I Help You Today?</p>
        <img src="/images/logo.svg" alt="logo" />
      </div>

      {/* Questions container: flex on mobile, grid on desktop */}
      <div className={questionsContainerClass}>
        {initialQuestions.map((question, index) => (
          <button
            key={index}
            onClick={() => handleQuestionClick(question)}
            className={`${styles.questionButton} ${!lightTheme ? styles.questionButtonDark : ''}`}
            style={{ fontSize: buttonFontSize }}
          >
            {/* Question main text */}
            <p className={`${styles.questionText} ${!lightTheme ? styles.questionTextDark : ''}`}>
              {question}
            </p>

            {/* Subtitle with smaller font */}
            <p className={`${styles.questionTextSmall} ${!lightTheme ? styles.questionTextDarkSmall : ''}`}>
              Get immediate AI generated response
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
