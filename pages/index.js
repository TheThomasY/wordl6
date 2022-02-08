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

  const updateBoard = (newLetter) => {
    setBoard((prevBoard) => {
      return {
        ...prevBoard,
        [currentRow]:
          prevBoard[currentRow].slice(0, currentTile) +
          newLetter +
          prevBoard[currentRow].slice(currentTile + 1),
      };
    });

    if (currentTile < 5) {
      setCurrentTile((prevCurrentTile) => prevCurrentTile + 1);
    } else {
      console.log(currentRow);
      setCurrentTile(0);
      setCurrentRow((prevCurrentRow) => prevCurrentRow + 1);
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
      <GameBoard board={board} />
      <Keyboard updateBoard={updateBoard} />
    </div>
  );
}
