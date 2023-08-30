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
  const avatarAPI = "https://api.multiavatar.com";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    async function checkLocalStorage() {
      if (!localStorage.getItem("splice-user")) {
        navigate("/login");
      }
    }
  
    checkLocalStorage();
  }, []);  

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("splice-user"))
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar]
      });

      if(data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("splice-user", JSON.stringify(user));
        toast.success("Avatar set", toastOptions);
        navigate("/");
      } else {
        toast.error("Failed to set avatar", toastOptions);
      }
    }
  };

  useEffect(() => {
    const fetchAvatars = async () => {
      const data = [];
      
      for (let n = 0; n < 6; n++) {
        try {
          const response = await axios.get(`${avatarAPI}/${Math.round(Math.random() * 1000)}`);
          const buffer = new Buffer(response.data);
          data.push(buffer.toString("base64"));
        } catch (error) {
          if (error.response && error.response.status === 429) {
            //* Handle rate limiting, wait for a while and then retry
            await new Promise(resolve => setTimeout(resolve, 3000)); //* Wait for 3 seconds
            n--; //* Retry the same iteration
          } else {
            console.error("Error fetching avatars:", error);
          }
        }
      }

      setAvatars(data);
      setIsLoading(false);
    }

    fetchAvatars();
  }, []);

  return (
    <>
    {
      isLoading ? <SetAvatarContainer>
        <img className="loader" src={loader} alt="Loading..." />
      </SetAvatarContainer> : (
        <SetAvatarContainer>
        <div className="title-container">
          <h1>Choose your profile picture</h1>
        </div>
        <div className="avatars">
          {avatars.map((avatar, index) => (
            <div className={`avatar ${selectedAvatar === index ? "selected" : ""}`} key={index} onClick={() => setSelectedAvatar(index)}>
              <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" key={avatar} onClick={() => setSelectedAvatar(index)} />
            </div>
          ))}
        </div>
        <button className="submit-btn" onClick={setProfilePicture}> Set as profile picture </button>
      </SetAvatarContainer>
      )
    }
      <ToastContainer />
    </>
  );
};

const SetAvatarContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #047BB3;
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
    margin-top: 25px;

    .avatar {
      border: .4rem solid transparent;
      padding: .4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: .5 ease-in-out;
      cursor: pointer;

      img {
        height: 6rem;
      }
    }

    .selected {
      border: .4rem solid #50C8FF;
    }
  }

  .submit-btn {
    background-color: #05B0FF;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    margin-top: 25px;
    transition: .3s ease-in-out;
    border: 2px solid #05B0FF;

    &:hover {
      background-color: #035880;
    }
  }
`;

export default SetAvatar;