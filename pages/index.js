// Next
import Head from 'next/head';

// React
import React, { useState } from 'react';

// Components
import Header from '../components/Header/Header';
import GameBoard from '../components/GameBoard/GameBoard';
import Keyboard from '../components/Keyboard/Keyboard';

// Css
import styles from '../styles/Home.module.scss';

export default function Home() {
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

  const wordList = ['temper', 'outfit', 'served', 'fright', 'piston'];

  const [word, setWord] = useState(wordList[Math.floor(Math.random() * 5)]);
  const [matches, setMatches] = useState({});

  const checkWord = (guess, word) => {
    console.log(guess, word);
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === word[i]) {
        // * If letter matches exactly assign 0
        setMatches((prevMatches) => {
          return {
            ...prevMatches,
            [guess[i]]: 0,
          };
        });
      } else if (word.includes(guess[i])) {
        // * If letter is in the word but not correct place, assign 1
        setMatches((prevMatches) => {
          return {
            ...prevMatches,
            [guess[i]]: 1,
          };
        });
      }
    }
  };

  const updateBoard = (newLetter) => {
    if (newLetter === 'back') {
      // Backspace Pressed: remove last letter
      if (currentTile !== 0) {
        setBoard((prevBoard) => {
          return {
            ...prevBoard,
            [currentRow]:
              prevBoard[currentRow].slice(0, currentTile - 1) +
              ' ' +
              prevBoard[currentRow].slice(currentTile),
          };
        });
        // Reset current tile to previous
        setCurrentTile((prevCurrentTile) => prevCurrentTile - 1);
      }
    } else if (newLetter === 'enter') {
      // Enter Pressed: go to new line
      if (!board[currentRow].includes(' ') && currentRow < 6) {
        checkWord(board[currentRow], word);
        setCurrentRow((prevCurrentRow) => prevCurrentRow + 1);
        setCurrentTile(0);
      }
      // TODO - check for win condition here
    } else {
      // You can't click letters if current line is full
      if (!board[currentRow].includes(' ')) {
        return;
      }
      // Letter Pressed: add letter to current grid
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
    <div className={styles.container}>
      <Head>
        <title>Wordl6</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <GameBoard board={board} matches={matches} />
      <Keyboard updateBoard={updateBoard} matches={matches} />
    </div>
  );
}
