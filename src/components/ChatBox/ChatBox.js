import React, { useContext, useEffect, useRef, useState } from 'react';
import { getAIResponse } from '../../utils/aiResponse';
import PastConversations from '../PastConversations/PastConversations';
import useLocalStorage from '../../hooks/useLocalStorage';
import { getCurrentTime } from '../../utils/time';
import { IconButton, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InputArea from '../InputArea/InputArea';
import ChatSidebar from '../ChatSideBar/ChatSideBar';
import InitialQuestions from '../InitialQuestions/InitialQuestions';
import MessageList from '../MessageList/MessageList';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { LightThemeContext } from '../../contexts/ThemeContext';
import styles from './ChatBox.module.css';

const ChatBox = () => {
    // Chat state variables
    const [messages, setMessages] = useState([]);
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [input, setInput] = useState('');
    const [showInitialQuestions, setShowInitialQuestions] = useState(true);
    const [previousChats, setPreviousChats] = useLocalStorage('previousChats', []);
    const [currentChatId, setCurrentChatId] = useState(null);
    const [loadPreviousChats, setLoadPreviousChats] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Check if current screen is mobile
    const isMobile = useMediaQuery('(max-width:590px)');

    // Theme context
    const { lightTheme, toggleTheme } = useContext(LightThemeContext);

    // Predefined list of questions
    const initialQuestions = [
        "Hi, how are you?",
        "What is the virtual DOM?",
        "Can you explain RESTful APIs?",
        "What is a Promise in JavaScript?",
        "How do you handle errors in async/await?"
    ];

    // Handle when a user clicks a suggested question
    const handleQuestionClick = async (question) => {
        setShowInitialQuestions(false);
        const newMessages = [{ sender: 'user', text: question, time: getCurrentTime() }];
        setMessages(newMessages);

        const aiResponse = await getAIResponse(question);
        setMessages([...newMessages, { sender: 'ai', text: aiResponse, time: getCurrentTime() }]);
    };

    // Handle sending a new user message
    const handleSendMessage = async () => {
        if (!input.trim()) return;

        setShowInitialQuestions(false);
        setLoadPreviousChats(false);

        const newMessages = [...messages, { sender: 'user', text: input, time: getCurrentTime() }];
        setMessages(newMessages);

        const aiResponse = await getAIResponse(input);
        const responseMessage = aiResponse || "Sorry, Did not understand your query!";
        const newMessagesAi = [...newMessages, { sender: 'ai', text: responseMessage, time: getCurrentTime() }];
        setMessages(newMessagesAi);
        setInput('');
    };

    // Start a new chat session
    const startNewChat = () => {
        if (messages.length > 0) {
            const updatedChats = [...previousChats, {
                id: currentChatId,
                date: new Date().toDateString(),
                messages,
                rating,
                feedback: comment
            }];
            setPreviousChats(updatedChats);
            localStorage.setItem('previousChats', JSON.stringify(updatedChats));
        }

        setMessages([]);
        setShowInitialQuestions(true);
        setLoadPreviousChats(false);
    };

    // Generate a new unique chat ID when component mounts
    useEffect(() => {
        setCurrentChatId(Date.now());
    }, []);

    // Load previous chats from localStorage on component mount
    useEffect(() => {
        const savedChats = localStorage.getItem('previousChats');
        if (savedChats) {
            setPreviousChats(JSON.parse(savedChats));
        }
    }, []);

    // Save current chat to localStorage whenever messages change
    useEffect(() => {
        if (messages.length > 0) {
            const updatedChats = [...previousChats, { id: currentChatId, date: new Date().toDateString(), messages, rating, feedback: comment }];
            setPreviousChats(updatedChats);
            localStorage.setItem('previousChats', JSON.stringify(updatedChats));
        }
    }, [messages]);

    // Scroll to the bottom when messages update
    const messagesEndRef = useRef(null);
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // Save user feedback
    const saveFeedback = () => {
        if (messages.length > 0) {
            const chats = [...previousChats, {
                id: currentChatId,
                date: new Date().toDateString(),
                messages,
                rating,
                feedback: comment
            }];
            setPreviousChats(chats);
            localStorage.setItem('previousChats', JSON.stringify(chats));
        }
    };

    // Toggle sidebar drawer for mobile
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsDrawerOpen(open);
    };

    // Determine which main section to show
    const showPage = () => {
        if (showInitialQuestions) {
            return (
                <InitialQuestions
                    isMobile={isMobile}
                    initialQuestions={initialQuestions}
                    handleQuestionClick={handleQuestionClick}
                />
            );
        }

        if (loadPreviousChats) {
            return <PastConversations previousChats={previousChats} />;
        }

        return (
            <div className="InputArea_inputArea__qaIO5">
                <MessageList messages={messages} />
            </div>
        );
    };

    // Load past conversations
    const handlePastConvo = () => {
        if (messages.length > 0) {
            const updatedChats = [...previousChats, {
                id: currentChatId,
                date: new Date().toDateString(),
                messages,
                rating,
                feedback: comment
            }];
            setPreviousChats(updatedChats);
            localStorage.setItem('previousChats', JSON.stringify(updatedChats));
        }
        setShowInitialQuestions(false);
        setLoadPreviousChats(true);
    };

    // Show feedback modal if there are messages
    const handleFeedbackModal = () => {
        if (messages.length !== 0) setShowFeedbackModal(true);
    };

    return (
        <div className={styles.chatBox}>
            {/* Sidebar with drawer support */}
            <ChatSidebar
                isMobile={isMobile}
                isDrawerOpen={isDrawerOpen}
                toggleDrawer={toggleDrawer}
                startNewChat={startNewChat}
                handlePastConvo={handlePastConvo}
            />

            {/* Main content area with conditional dark background */}
            <div className={`${styles.content} ${!lightTheme ? styles.darkBackground : ''}`}>
                {/* Top bar with bot title and theme toggle */}
                <p className={styles.botAi}>
                    <div>
                        {isMobile && (
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={toggleDrawer(true)}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                        <header>
                             <h1>Bot AI</h1>
                            </header>
                    </div>
                    <div onClick={toggleTheme}>
                        {lightTheme ? <DarkModeIcon /> : <LightModeIcon />}
                    </div>
                </p>

                {/* Main display area for messages/questions/past chats */}
                <div className={styles.messageArea}>
                    {showPage()}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input area is hidden when viewing previous chats */}
                {!loadPreviousChats && (
                    <InputArea
                        input={input}
                        setInput={setInput}
                        handleSendMessage={handleSendMessage}
                        handleFeedbackModal={handleFeedbackModal}
                        setShowFeedbackModal={setShowFeedbackModal}
                        showFeedbackModal={showFeedbackModal}
                        rating={rating}
                        comment={comment}
                        setRating={setRating}
                        setComment={setComment}
                        saveFeedback={saveFeedback}
                    />
                )}
            </div>
        </div>
    );
};

export default ChatBox;
