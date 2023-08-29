import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";

const ChatContainer = ({ currentChat, currentUser }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await axios.post(getAllMessagesRoute, {
          from : currentUser._id,
          to : currentChat._id
        });
  
        setMessages(response.data);
      } catch (error) {
        
      }
    }
  
    fetchMessages();
  }, [currentChat, currentUser]);
  

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
          <div className="chat-messages">
            {
              messages.map((message) => {
                return (
                  <div>
                    <div className={`message ${message.fromSelf ? "sended" : "received"}`}>
                      <div className="content">
                        <p> {message.message} </p>
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>
          <ChatInput handleSendMessage={handleSendMessage}/>
        </MessagesContainer>
      )}
    </>
  );
};

export default ChatContainer;

const MessagesContainer = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 78% 12%;
  gap: .1rem;
  overflow: hidden;

  @media (min-width: 720px) and (max-width: 1000px) {
    grid-template-rows: 15% 70% 15%;
  }

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

  .chat-messages {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    padding: 1rem 2rem;

    .message {
      display: flex;
      align-items: center;

      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #D1D1D1;
      }
    }

    .sended {
      justify-content: flex-end;

      .content {
        background-color: #37C0FF;
        color: #FFFFFF;
      }
    }

    .received {
      justify-content: flex-start;

      .content {
        background-color: #059EE6;
      }
    }
  }
`;
