import { useEffect, useState } from 'react';

/**
 * Custom React hook to manage state with localStorage persistence.
 *
 * @param {string} key - The key under which the value is stored in localStorage.
 * @param {*} defaultValue - The default value used if nothing exists in localStorage.
 * @returns {[any, Function]} - Returns the current state and a function to update it.
 */
export default function useLocalStorage(key, defaultValue) {
  // Initialize state from localStorage (if available), otherwise use the default value.
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(key); // Retrieve the item from localStorage
      console.log(`Retrieved from localStorage (key: ${key}):`, stored); // Debug: log retrieved data
      return stored ? JSON.parse(stored) : defaultValue; // Parse it if exists, else use default
    } catch (e) {
      // Catch JSON parsing errors or access issues
      console.error("Failed to parse localStorage item:", e);
      return defaultValue;
    }
  });

  // Sync state to localStorage whenever it changes
  useEffect(() => {
    try {
      console.log(`Saving to localStorage (key: ${key}):`, state); // Debug: log data being saved
      localStorage.setItem(key, JSON.stringify(state)); // Store state as a string
    } catch (e) {
      // Catch stringification or storage quota errors
      console.error("Failed to store item in localStorage:", e);
    }
  }, [key, state]); // Effect runs when key or state changes

  return [state, setState]; // Return state and updater function
}
