import { useState, useEffect, useCallback } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import mockData from './mockData';
import TypingIndicator from '../compoents/typingIndicator/typingIndicator';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

const MachineChat = ({ username = 'you' }) => {
  const currentTime =
    new Date(Date.now()).getHours() +
    ':' +
    new Date(Date.now()).getMinutes() +
    ':' +
    new Date(Date.now()).getSeconds();
  const [currentMessage, setCurrentMessage] = useState('');
  const [mockDataCount, setMockDataCount] = useState(1);
  const [typingIndicator, setTypingIndicator] = useState(false);
  const [messageList, setMessageList] = useState([
    {
      author: 'Machine',
      message: mockData.start[0],
      time: currentTime,
    },
  ]);

  useEffect(() => {
    let timer = setTimeout(() => {
      setTypingIndicator(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const timeTick = useCallback(() => {
    let timer;
    if (currentMessage === '') {
      timer = setTimeout(() => {
        if (mockDataCount <= mockData.start.length - 1) {
          setMockDataCount(mockDataCount + 1);
          setMessageList([
            ...messageList,
            {
              author: 'Machine',
              message: mockData.start[mockDataCount],
              time: currentTime,
            },
          ]);
        }
        setTypingIndicator(true);
      }, 5000);
      setTimeout(() => {
        setTypingIndicator(false);
      }, 10000);
    }
    return timer;
  }, [currentMessage, currentTime, messageList, mockDataCount]);

  useEffect(() => {
    const timer = timeTick();
    return () => clearTimeout(timer);
  }, [messageList, mockDataCount, timeTick]);

  const sendMessage = () => {
    setMessageList([
      ...messageList,
      {
        author: username,
        message: currentMessage,
        time: currentTime,
      },
    ]);
    setCurrentMessage('');
  };

  const chatHeader = () => {
    return (
      <div className="chat-header">
        <div className="chat-header--title">Machine Chat</div>
        <button className="chat-header--closeIcon">
          <CloseIcon />
        </button>
      </div>
    );
  };

  const chatBody = () => {
    return (
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, idx) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? 'other' : 'you'}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                  {messageContent.author === 'Machine' &&
                    typingIndicator &&
                    idx === messageList.length - 1 &&
                    messageContent.message[
                      messageContent.message.length - 1
                    ] !== '~' && <TypingIndicator />}
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
    );
  };

  const footer = () => {
    return (
      <div className="chat-footer">
        <textarea
          type="text"
          placeholder="How can we help you?"
          value={currentMessage}
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === 'Enter' && sendMessage();
          }}
        />
        {/* <input
          type="text"
          placeholder="How can we help you?"
          value={currentMessage}
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === 'Enter' && sendMessage();
          }}
        /> */}
        <button onClick={sendMessage}>
          <SendIcon style={{ fontSize: '24px' }} />
        </button>
      </div>
    );
  };

  return (
    <div className="App">
      <div className="chat-window">
        {chatHeader()}
        {chatBody()}
        {footer()}
      </div>
    </div>
  );
};

export default MachineChat;
