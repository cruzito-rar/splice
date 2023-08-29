import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { allusersRoute, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";

const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setcurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function checkLocalStorage() {
      if (!localStorage.getItem("splice-user")) {
        navigate("/login");
      } else {
        setCurrentUser(JSON.parse(localStorage.getItem("splice-user")));
        setIsLoaded(true);
      }
    }
  
    checkLocalStorage();
  }, []);

  useEffect(() => {
    if(currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);
  
  useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          try {
            const response = await axios.get(`${allusersRoute}/${currentUser._id}`);
            setContacts(response.data);
          } catch (error) {
           
          }
        } else {
          navigate("/setAvatar");
        }
      }
    }
  
    fetchData();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setcurrentChat(chat);
  }

  return (
    <>
    <Container>
      <div className="container">
        <Contacts contacts={ contacts } currentUser={ currentUser } changeChat={ handleChatChange }/>
        {
          isLoaded && currentChat === undefined ? <Welcome currentUser={ currentUser }/> : <ChatContainer currentChat={ currentChat } currentUser={ currentUser } socket={ socket } />
        }
      </div>
    </Container>
    </>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #131324;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    border-radius: 20px;
    display: grid;
    grid-template-columns: 25% 75%;

    @media screen and (min-width: 720px) and (max-width: 1000px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;