import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";

const Contacts = ({ contacts, currentUser, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  
  useEffect(() => {
    console.log(contacts);
    if (currentUser) {
      setCurrentUserName(currentUser.username);
      setCurrentUserImage(currentUser.avatarImage);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  }

  return (
    <>
    {currentUserImage && currentUserName && (
      <ContactsContainer>
        <div className="brand">
          {/* <img src={Logo} alt="Logo" /> */}
          <h3>Splice</h3>
        </div>
        <div className="contacts">
          {contacts.length > 0 ? (
            contacts.map((contact, index) => {
              return (
                <div className={`contact ${index === currentSelected ? "selected" : ""}`} key={index}>
                <div className="avatar">
                  <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt={contact.username} />
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
              )
            })
          ) : (
            <p style={{"color" : "#FFFFFF"}}>No contacts available.</p>
          )}
        </div>
        <div className="current-user">
          <div className="avatar">
            <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt={currentUserName} />
          </div>
          <div className="username">
            <h2>{currentUserName}</h2>
          </div>
        </div>
      </ContactsContainer>
    )}
    </>
  )
}

export default Contacts;

const ContactsContainer = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflw: hidden;
  background-color: #080420;

  .brand {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 2rem;
    }
    h3 {
      color: #FFFFFF;
      text-transform: uppercase;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: .8rem;
    
    &::webkit-scrollbar {
      width: .2rem;

      &-thumb {
        background-color: #FFFFFF39;
        width: .1rem;
        border-radius: 1rem;
      }
    }

    .contact {
      display: flex;
      background-color: #FFFFFF39;
      min-height: 5rem;
      width: 95%;
      cursor: pointer; 
      padding: .4rem;
      gap: 1rem;
      align-items: center;
      border-radius: 20px;
      transition: all .5s ease-in-out;

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

    .selected {
      background-color: #DAF3FF;
    }
  }

  .current-user {
    display: flex;
    background-color: #4A4A64;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%
      }
    }

    .username {
      h2 {
        color: #FFFFFF;
      }
    }

    @media screen and (min-width: 720px) and (max-width: 1000px) {
      gap: .5rem;

      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
