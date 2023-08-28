import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allusersRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";

const Chat = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setcurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    async function checkLocalStorage() {
      if (!localStorage.getItem("splice-user")) {
        navigate("/login");
      } else {
        const userData = JSON.parse(localStorage.getItem("splice-user"));
        setCurrentUser(userData);
      }
    }
  
    checkLocalStorage();
  }, []);
  
  useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          try {
            const response = await axios.get(`${allusersRoute}/${currentUser._id}`);
            setContacts(response.data);
          } catch (error) {
            // Manejar errores aquí
          }
        } else {
          navigate("/setAvatar");
        }
      }
    }
  
    fetchData();
  }, [currentUser]);
  

  return (
    <>
    <ChatContainer>
      <div className="container">
        <Contacts contacts={ contacts } currentUser={ currentUser }/>
      </div>
    </ChatContainer>
    </>
  )
}

const ChatContainer = styled.div`
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
    display: grid;
    grid-template-columns: 25% 75%;

    @media screen and (min-width: 720px) and (max-width: 1000px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;