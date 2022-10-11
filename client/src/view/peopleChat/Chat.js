import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import SendIcon from '@mui/icons-material/Send';
import './index.css';

const Chat = ({ socket, username, room }) => {
  const currentTime =
    new Date(Date.now()).getHours() +
    ':' +
    new Date(Date.now()).getMinutes() +
    ':' +
    new Date(Date.now()).getSeconds();
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: currentTime,
      };

      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((list) => [...list, data]);
    });
    return () => {
      socket.off('receive_message');
    };
  }, [socket]);

  const chatHeader = () => {
    return (
      <div className="chat-header">
        <div>Live Chat</div>
      </div>
    );
  };

  const chatBody = () => {
    return (
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
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
          <SendIcon />
        </button>
      </div>
    );
  };

  return (
    <div className="chat-window">
      {chatHeader()}
      {chatBody()}
      {footer()}
    </div>
  );
};

export default Chat;
