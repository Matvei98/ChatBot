import { sendMessage } from '../components/Data/data';
import { IMessage } from '../components/Data/message';
import { Chat } from '../components/Chat/Chat';
import { ChatInput } from '../components/ChatInput/ChatInput'
import styles from './App.module.scss';
import { useState } from 'react';



const firstMessage: IMessage = {
  message: 'Hello! I’m BotHub, AI-based bot designed to answer all your questions.',
  owner: 'bot'
}

function App() {
  const [messagesList, setMessagesList] = useState<IMessage[]>([firstMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const send = (message: string) => {
    setIsLoading(true);
    setMessagesList(prevMessagesList => [
      ...prevMessagesList,
      { message, owner: 'user' }
    ]);
    sendMessage(message)
      .then((res) => {
        setMessagesList(prevMessagesList => [
          ...prevMessagesList,
          { message: res, owner: 'bot' }
        ]);
      })
      .finally(() => {
        setIsLoading(false);
      })
  };
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Bot Chat</h1>
      <p className={styles.description}>AI-based service</p>
      <Chat messagesList={messagesList} isLoading={isLoading} />
      <ChatInput send={send} />
    </main>
  );
}

export default App;
