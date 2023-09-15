import { useEffect, useRef } from 'react';
import { IMessage } from '../Data/message';
import { Message } from '../Message/Message';
import styles from '../Chat/Chat.module.scss';

interface ChatProps {
  messagesList: IMessage[];
  isLoading: boolean;
}

export const Chat: React.FC<ChatProps> = ({ messagesList, isLoading }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [messagesList]);

  return (
    <div className={styles.container} ref={containerRef}>
      {messagesList.map((message, index) => (
        <Message key={index} message={message} />
      ))}
      {isLoading && <Message message={{ message: '', owner: 'bot' }} isLoading />}
    </div>
  );
};



