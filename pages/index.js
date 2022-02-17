// * Next
import Head from 'next/head';

// * React
import React, { useEffect, useState, createContext, useContext } from 'react';
import ReactDOM from 'react-dom';

// * Components
import Header from '../components/Header/Header';
import GameBoard from '../components/GameBoard/GameBoard';
import Keyboard from '../components/Keyboard/Keyboard';
import PopUp from '../components/UI/PopUp';
import Modal from '../components/UI/Modal';
import Settings from '../components/UI/Settings';

// * Css
import styles from '../styles/Home.module.scss';

// * Data
import data from '../word-list.json';

export default function Home() {
  const [word, setWord] = useState('answer');
  const [gameState, setGameState] = useState('playing');

  // * Board typing ------
  const [board, setBoard] = useState({
    1: '      ',
    2: '      ',
    3: '      ',
    4: '      ',
    5: '      ',
    6: '      ',
  });
  const [currentRow, setCurrentRow] = useState(1);
  const [currentTile, setCurrentTile] = useState(0);

  // * Colour coding for letters ------
  const [colours, setColours] = useState({
    0: {},
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
    6: {},
  });
  const [keyStatus, setKeyStatus] = useState({});

  // * Pop Up Messages ------
  const [messages, setMessages] = useState('');
  const clearMessages = () => {
    setMessages('');
  };

  // * Statistics Modal ------
  const [showStats, setShowStats] = useState(false);

  const toggleStats = () => {
    setShowStats((prevShowStats) => {
      return !prevShowStats;
    });
  };

  // * Settings Screen ------
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings((prevShowSettings) => {
      return !prevShowSettings;
    });
  };

  // * Dark Mode ------
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    if (darkMode) {
      setDarkMode(false);
      document.querySelector('body').classList.remove('dark-body');
    } else {
      setDarkMode(true);
      document.querySelector('body').classList.add('dark-body');
    }
  };

  useEffect(() => {
    // Add listener to update styles
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => setDarkMode(e.matches));
    // Setup dark/light mode for the first time
    setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    // Remove listener
    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', () => {});
    };
  }, []);

  // * Pick a random word in the answer list and assign that as the correct word
  useEffect(() => {
    setWord(
      data['answer-words'][
        Math.floor(Math.random() * data['answer-words'].length)
      ]
    );
  }, []);

  useEffect(() => {
    if (gameState === 'won') {
      console.log('game won');
    } else if (gameState === 'lost') {
      console.log('game lost');
    }
  }, [gameState]);

  const updateKeyStatus = (key, status) => {
    if (!keyStatus[key] || status > keyStatus[key]) {
      setKeyStatus((prevKeyStatus) => {
        return {
          ...prevKeyStatus,
          [key]: status,
        };
      });
    }
  };

  const checkWord = (guess, word) => {
    if (data['guess-words'].indexOf(guess) === -1) {
      setMessages('Not in word list');
      return false;
    } else {
      // * Check users guess against the answer
      let colObj = {};

      // * Arrays for answer and guess, used to assess orange tiles
      let wordArr = word.split('');
      let guessArr = guess.split('');

      for (let i = 0; i < guess.length; i++) {
        if (guess[i] === word[i]) {
          // * If guess letter is exact, assign 2
          // * Then remove that letter from both arrays as it is certain
          // * Placeholder - and _ to preserve indexes
          colObj[i] = 2;
          wordArr[i] = '-';
          guessArr[i] = '_';

          updateKeyStatus(guess[i], 2);
        } else if (!word.includes(guess[i])) {
          // * If guess letter is not present in answer, assign 0
          // * Then remove that letter from just guess array
          colObj[i] = 0;
          guessArr[i] = '_';

          updateKeyStatus(guess[i], 0);
        }
      }

      for (let i = 0; i < wordArr.length; i++) {
        // * Loop over answer array which now contains only letters present in the
        // * guess, but not in the correct place
        if (guessArr.includes(wordArr[i])) {
          // * Handle only cases with letters
          // * Letter present in answer but in wrong position so assign 1
          colObj[guessArr.indexOf(wordArr[i])] = 1;
          updateKeyStatus(wordArr[i], 1);

          // * Remove letter from both guess and answer, avoids problems with duplicates
          guessArr[guessArr.indexOf(wordArr[i])] = '_';
          wordArr[i] = '-';
        }
      }

      // * Handles edge case where a repeated letter isn't assigned a number
      for (let i = 0; i < guessArr.length; i++) {
        if (guessArr[i] !== '_') {
          colObj[i] = 0;
        }
      }

      setColours((prevColours) => {
        return {
          ...prevColours,
          [currentRow]: colObj,
        };
      });

      return Object.values(colObj).includes(0) ||
        Object.values(colObj).includes(1)
        ? 'not won'
        : 'won';
    }
  };

  const updateBoard = (newLetter) => {
    // * Handles board updates due to user typing
    if (newLetter === 'back') {
      // * Backspace Pressed: remove last letter
      if (currentTile !== 0 && gameState === 'playing') {
        setBoard((prevBoard) => {
          return {
            ...prevBoard,
            [currentRow]:
              prevBoard[currentRow].slice(0, currentTile - 1) +
              ' ' +
              prevBoard[currentRow].slice(currentTile),
          };
        });
        // * Reset current tile to previous
        setCurrentTile((prevCurrentTile) => prevCurrentTile - 1);
      }
    } else if (newLetter === 'enter') {
      // * Enter Pressed
      if (!board[currentRow].includes(' ')) {
        if (checkWord(board[currentRow], word) === 'won') {
          setGameState('won');
          setMessages('Well done!');
        } else if (checkWord(board[currentRow], word) === 'not won') {
          if (currentRow < 6) {
            setCurrentRow((prevCurrentRow) => prevCurrentRow + 1);
            setCurrentTile(0);
          } else {
            setGameState('lost');
            setMessages(word.toUpperCase());
          }
        }
      }
    } else {
      // * You can't click letters if current line is full
      if (!board[currentRow].includes(' ')) {
        return;
      }
      // * Letter Pressed: add letter to current grid
      setBoard((prevBoard) => {
        return {
          ...prevBoard,
          [currentRow]:
            prevBoard[currentRow].slice(0, currentTile) +
            newLetter +
            prevBoard[currentRow].slice(currentTile + 1),
        };
      });
      setCurrentTile((prevCurrentTile) => prevCurrentTile + 1);
    }
  };

  return (
    <div className={styles.container + ' ' + (darkMode ? styles.dark : '')}>
      <Head>
        <title>Wordl6</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header
        toggleStats={toggleStats}
        toggleSettings={toggleSettings}
        darkMode={darkMode}
      />
      <PopUp
        messages={messages}
        clearMessages={clearMessages}
        darkMode={darkMode}
      />
      {showStats && <Modal toggleStats={toggleStats} darkMode={darkMode} />}
      {showSettings && (
        <Settings
          toggleSettings={toggleSettings}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}
      <GameBoard board={board} colours={colours} darkMode={darkMode} />
      <Keyboard
        updateBoard={updateBoard}
        keyStatus={keyStatus}
        darkMode={darkMode}
      />
    </div>
  );
}
