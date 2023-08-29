import React from "react";
import styled from "styled-components";
import axios from "axios";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { sendMessageRoute } from "../utils/APIRoutes";

const ChatContainer = ({ currentChat, currentUser }) => {
  const handleSendMessage = async (message) => {
    await axios.post(sendMessageRoute, {
      from : currentUser._id,
      to : currentChat._id,
      message : message
    });
  }

  return (
    <>
      {currentChat && (
        <MessagesContainer>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt={currentChat.username} />
              </div>
              <div className="username">
                <h3> {currentChat.username} </h3>
              </div>
            </div>
            <Logout />
          </div>
          <Messages />
          <ChatInput handleSendMessage={handleSendMessage}/>
        </MessagesContainer>
      )}
    </>
  );
};

export default ChatContainer;

const MessagesContainer = styled.div`
  padding-top: 1rem;

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;

    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;

      .avatar {
        img {
          height: 3rem;
        }
      }

      .username {
        h3 {
          color: #FFFFFF;
        }
      }
    }
  }
`;
