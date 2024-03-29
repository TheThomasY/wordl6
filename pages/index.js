// * Next
import Head from 'next/head';

// * React
import React, { useEffect, useState, useLayoutEffect } from 'react';

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
  // * STATES:
  const [word, setWord] = useState('answer');
  const [gameState, setGameState] = useState('playing');

  // * -------------------------------------------------------
  // * Typing on the board
  // * -------------------------------------------------------
  // * STATES:
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

  // * -------------------------------------------------------
  // * Colour coding the letters
  // * -------------------------------------------------------
  // * STATES:
  // * colours[0] = {0: 0 (grey), 1: 1 (yellow), 2: 2 (green), 3:2, 4:0, 5:0}
  const [colours, setColours] = useState({
    0: {},
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
    6: {},
  });
  // * {guessedKey: 0 (grey), guessedKey: 1 (orange), guessedKey: 2(green)}
  const [keyStatus, setKeyStatus] = useState({});

  // * -------------------------------------------------------
  // * Handling User Typed Words
  // * -------------------------------------------------------

  // * Handles board updates when user types
  const updateBoard = (newLetter) => {
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
      // * Enter pressed so check word
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

  // * Checks user guessed word against the answer. Calls on updateKeyStatus()
  // * If guess isn't a word => return false
  // * If guess is a word, returns either "won" or "not won"
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

      // * Find Greens and Greys
      // * Loop over each letter in the user's guess
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

      // * Find Yellows
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

  // * Function that handles updating key colour status.
  // * Green over yellow/grey. Yellow over grey.
  const updateKeyStatus = (key, status) => {
    if (!keyStatus[key] || status > keyStatus[key]) {
      // * Only update state if key is new, or new status beats current
      setKeyStatus((prevKeyStatus) => {
        return {
          ...prevKeyStatus,
          [key]: status,
        };
      });
    }
  };

  // * -------------------------------------------------------
  // * Pop Up Messages
  // * -------------------------------------------------------
  // * STATES:
  const [messages, setMessages] = useState('');
  const clearMessages = () => {
    setMessages('');
  };

  // * -------------------------------------------------------
  // * Statistics
  // * -------------------------------------------------------
  // * STATES:
  const [showStats, setShowStats] = useState(false);
  const [stats, setStats] = useState({
    currentStreak: 0,
    played: 0,
    wins: 0,
    maxStreak: 0,
  });

  const toggleStats = () => {
    setShowStats((prevShowStats) => {
      return !prevShowStats;
    });
  };

  // * RUN AT START: Create or get stats
  useEffect(() => {
    if (localStorage.getItem('currentStreak') === null) {
      // * Create local storage if none exists
      localStorage.setItem('currentStreak', 0);
      localStorage.setItem('played', 0);
      localStorage.setItem('wins', 0);
      localStorage.setItem('maxStreak', 0);
    } else {
      // * If data does exists, get and set as state
      setStats({
        currentStreak: parseInt(localStorage.getItem('currentStreak')),
        played: parseInt(localStorage.getItem('played')),
        wins: parseInt(localStorage.getItem('wins')),
        maxStreak: parseInt(localStorage.getItem('maxStreak')),
      });
    }
    // localStorage.clear();
  }, []);

  // * Given a result (win/loss), update stats state
  const updateStats = (result) => {
    if (result === 'win') {
      if (stats.currentStreak === stats.maxStreak) {
        setStats((prevStats) => {
          return {
            ...prevStats,
            currentStreak: prevStats.currentStreak + 1,
            played: prevStats.played + 1,
            wins: prevStats.wins + 1,
            maxStreak: prevStats.maxStreak + 1,
          };
        });
      } else {
        setStats((prevStats) => {
          return {
            ...prevStats,
            currentStreak: prevStats.currentStreak + 1,
            played: prevStats.played + 1,
            wins: prevStats.wins + 1,
          };
        });
      }
    } else if (result === 'lost') {
      setStats((prevStats) => {
        return {
          ...prevStats,
          currentStreak: 0,
          played: prevStats.played + 1,
        };
      });
    }
  };

  // * ON STATS CHANGE: set stats states to local storage
  useEffect(() => {
    if (stats.played !== 0) {
      localStorage.setItem('currentStreak', stats.currentStreak);
      localStorage.setItem('played', stats.played);
      localStorage.setItem('wins', stats.wins);
      localStorage.setItem('maxStreak', stats.maxStreak);
    }
  }, [stats]);

  // * -------------------------------------------------------
  // * Settings Screen
  // * -------------------------------------------------------
  // * STATE:
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings((prevShowSettings) => {
      return !prevShowSettings;
    });
  };

  // * -------------------------------------------------------
  // * Dark Mode
  // * -------------------------------------------------------
  // * STATE:
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

  // * Check browser theme preference and set theme state
  useLayoutEffect(() => {
    // * Add listener to update styles
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => setDarkMode(e.matches));
    // * Setup dark/light mode for the first time
    setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', () => {});
    };
  }, []);
  // * Apply theme class to body
  useLayoutEffect(() => {
    darkMode
      ? document.querySelector('body').classList.remove('dark-body')
      : document.querySelector('body').classList.add('dark-body');
  }, []);

  // * -------------------------------------------------------
  // * New game set/reset
  // * -------------------------------------------------------

  // * Pick random word and reset all relevant states
  const newGame = () => {
    setGameState('playing');
    // * Pick a random word in the answer list and assign that as the correct word
    setWord(
      data['answer-words'][
        Math.floor(Math.random() * data['answer-words'].length)
      ]
    );
    setBoard({
      1: '      ',
      2: '      ',
      3: '      ',
      4: '      ',
      5: '      ',
      6: '      ',
    });
    setColours({
      0: {},
      1: {},
      2: {},
      3: {},
      4: {},
      5: {},
      6: {},
    });
    setCurrentRow(1);
    setCurrentTile(0);
    setKeyStatus({});
    setShowStats(false);
    setShowSettings(false);
  };
  // * RUN AT START:
  useEffect(() => {
    newGame();
  }, []);

  // * -------------------------------------------------------
  // * End Game
  // * -------------------------------------------------------

  // * Detect game over, then show stats modal after 1.5s
  // * Also trigger stats update
  useEffect(() => {
    if (gameState !== 'playing') {
      setTimeout(function () {
        setShowStats(true);
      }, 1500);
    }
    if (gameState === 'won') {
      updateStats('win');
    } else if (gameState === 'lost') {
      updateStats('lost');
    }
  }, [gameState]);

  return (
    <div className={styles.container + ' ' + (darkMode ? styles.dark : '')}>
      <Head>
        <title>Wordl6</title>
        <meta
          name='description'
          content='Try and guess the 6 letter word. Inspired by Wordle. '
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header
        toggleStats={toggleStats}
        toggleSettings={toggleSettings}
        darkMode={darkMode}
        stats={stats}
      />
      <PopUp
        messages={messages}
        clearMessages={clearMessages}
        darkMode={darkMode}
      />
      {showStats && (
        <Modal
          toggleStats={toggleStats}
          darkMode={darkMode}
          gameState={gameState}
          newWord={newGame}
          stats={stats}
        />
      )}
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
