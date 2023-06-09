import React, {useState} from 'react';
import ChatList from '../components/ChatList';
import Chat from '../components/Chat';
import './MessagingPage.css';
import {Button} from '@mui/material';
import {AuthCheck} from '../components/AuthCheck';

function MessagingPage() {
  const [selectedChat, setSelectedChat] = useState(null);
  // addExampleChats()
  //   .then(r => console.log(r))
  //   .catch(e => console.log(e));

  return (
    <AuthCheck>
      <div className="messaging-page">
        <div className="chat-list-wrapper">
          <ChatList onSelectChat={setSelectedChat} />
        </div>
        {selectedChat ? (
          <div className="chat-wrapper">
            <Chat selectedChat={selectedChat} />
          </div>
        ) : (
          <div className="messaging-page-placeholder">
            <h2>Select a chat to start messaging!</h2>
          </div>
        )}
      </div>
    </AuthCheck>
  );
}

export default MessagingPage;
