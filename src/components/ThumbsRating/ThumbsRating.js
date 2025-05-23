import React, { useContext, useState } from 'react';
import { IconButton } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { LightThemeContext } from '../../contexts/ThemeContext';
import styles from './ThumbsRating.module.css';

/**
 * ThumbsRating component shows thumbs up/down icons for user feedback.
 * Icons become visible on hover or if already selected.
 */
const ThumbsRating = ({ hovered }) => {
  // selected state keeps track of the user's choice: 'up', 'down', or null
  const [selected, setSelected] = useState(null);

  // Toggles thumbs up selection
  const handleThumbUpClick = () => {
    setSelected(selected === 'up' ? null : 'up');
  };

  // Toggles thumbs down selection
  const handleThumbDownClick = () => {
    setSelected(selected === 'down' ? null : 'down');
  };

  // Control visibility: visible when hovered or when a selection is made
  const isVisible = hovered || selected !== null;

  const { lightTheme } = useContext(LightThemeContext);

  return (
    <div
      className={styles.thumbsContainer}
      style={{ opacity: isVisible ? 1 : 0 }}
      aria-label="Feedback thumbs rating"
    >
      <IconButton onClick={handleThumbUpClick} aria-pressed={selected === 'up'}>
        {selected === 'up' ? (
          <ThumbUpIcon
            color="primary"
            sx={{ fontSize: '20px', color: !lightTheme && '#a79fb3' }}
          />
        ) : (
          <ThumbUpOutlinedIcon sx={{ fontSize: '20px', color: !lightTheme && '#a79fb3' }} />
        )}
      </IconButton>

      <IconButton onClick={handleThumbDownClick} aria-pressed={selected === 'down'}>
        {selected === 'down' ? (
          <ThumbDownIcon
            color="primary"
            sx={{ fontSize: '20px', color: !lightTheme && '#a79fb3' }}
          />
        ) : (
          <ThumbDownOutlinedIcon sx={{ fontSize: '20px', color: !lightTheme && '#a79fb3' }} />
        )}
      </IconButton>
    </div>
  );
};

export default ThumbsRating;
