import { useEffect, useState } from 'react';
import { IMessage } from '../Data/message';
import { Loader } from '../Loader/Loader';
import styles from './Message.module.scss';
interface MessageProps {
    message: IMessage;
    isLoading?: boolean;
}


export const Message: React.FC<MessageProps> = ({ message, isLoading }) => {
    const [displayedMessage, setDisplayedMessage] = useState('');
  
    useEffect(() => {
      let timeoutId: NodeJS.Timeout | null = null;
      let currentIndex = 0;
  
      const displayMessage = () => {
        if (currentIndex < message.message.length) {
          setDisplayedMessage((prevMessage) => prevMessage + message.message[currentIndex]);
          currentIndex++;
          timeoutId = setTimeout(displayMessage, 10);
        }
      };
  
      if (message.owner === 'bot') {
        displayMessage();
      } else {
        setDisplayedMessage(message.message);
      }
  
      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }, [message]);
  
    return (
      <div className={styles[message.owner]}>
        <span className={styles.avatar}>T</span>
        {isLoading ? <Loader /> : <p className={styles.text}>{displayedMessage}</p>}
      </div>
    );
  };