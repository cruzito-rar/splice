import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Buffer } from "buffer";
import { setAvatarRoute } from "../utils/APIRoutes";

const SetAvatar = () => {
  const avatarAPI = "https://api.multiavatar.com/4567895";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  };

  const setProfilePicture = async () => {};
    
  useEffect(async () => {
    const data = [];
    
    for (let n = 0; n < 4; n++) {
      const response = await axios.get(`${avatarAPI}/${Math.round(Math.random() * 1000)}`);
      const buffer = Buffer.from(response.data, "base64");
      
      data.push(buffer);
    }
    
    setAvatars(data);
    setIsLoading(false);
  }, []);

  return (
    <>
      <SetAvatarContainer>
        <div className="title-container">
          <h1>Choose your profile picture</h1>
        </div>
        <div className="avatars"> {
          avatars.map((avatar, index) => {
            return (
              <div className={`avatar ${setSelectedAvatar(avatar) === index} ? "selected" : ""`} key={index}>
                <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={() => setSelectedAvatar(index) } />
              </div>
            );
          })
        } </div>
        <button class="submit-btn" onClick={() => setProfilePicture()}>Set as profile picture</button>
      </SetAvatarContainer>
      <ToastContainer />
    </>
  );
}

const SetAvatarContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #131324;
  justify-content: center;
  align-items: center;
  gap: 3rem

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    color: #FFFFFF;
  }

  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: .4rem solid transparent;
      padding: .4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: .5 ease-in-out;

      img {
        height: 6rem;
      }
    }

    .selected {
      border: .4rem solid #05B0FF;
    }
  }

  button {
    background-color: #05B0FF;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;

    &:hover {
      background-color: #05B0FF;
    }
  }
`;

export default SetAvatar;