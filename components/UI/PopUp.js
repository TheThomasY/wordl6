import React, { useState, useEffect } from 'react';

// Css
import styles from './PopUp.module.scss';

export default function PopUp(props) {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (props.messages !== '') {
      setShowMessage(true);
    }
  }, [props.messages]);

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
    <div className={styles.popup}>
      {showMessage && <p className={styles.message}>{props.messages}</p>}
    </div>
  );
}
