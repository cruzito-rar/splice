import React from "react";
import styled from "styled-components";

const ChatContainer = ({ currentChat }) => {
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
          </div>
          <div className="chat-messages"></div>
          <div className="chat-input"></div>
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
