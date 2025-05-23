import mockData from '../aiData/sampleData.json';

/**
 * Simulates an AI response based on user input.
 * Matches user input against predefined sample data (case-insensitive).
 * 
 * @param {string} userMessage - The user's message to check.
 * @returns {Promise<string>} - The AI's response or a default message.
 */
export const getAIResponse = async (userMessage) => {
  try {
    const lowerCaseMessage = userMessage.toLowerCase();

    const foundItem = mockData.find(item =>
      lowerCaseMessage.includes(item.question.toLowerCase())
    );

    if (foundItem) {
      return foundItem.response;
    } else {
      return 'Sorry, Did not understand your query!';
    }
  } catch (error) {
    console.error('Error fetching AI response:', error);
    return 'Sorry, Did not understand your query!';
  }
};
