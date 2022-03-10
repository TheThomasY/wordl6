import React, { useState, useEffect } from 'react';

// Css
import styles from './PopUp.module.scss';

export default function PopUp(props) {
  // * STATE:
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (props.messages !== '') {
      // * If message content is not empty, show
      setShowMessage(true);
    }
  }, [props.messages]);

  // * If there's a message to show, pop-up appears for 2s
  useEffect(() => {
    if (showMessage) {
      const fadeOut = setTimeout(() => {
        setShowMessage(false);
        props.clearMessages();
      }, 2000);
      return () => clearInterval(fadeOut);
    }
  }, [showMessage]);

  return (
    <div className={styles.popup + ' ' + (props.darkMode ? styles.dark : '')}>
      {showMessage && <p className={styles.message}>{props.messages}</p>}
    </div>
  );
}
