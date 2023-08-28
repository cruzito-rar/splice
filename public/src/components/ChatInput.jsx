import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";


const ChatInput = () => {
  return (
    <>
      <ChatInputContainer>
        <div className="button-container">
          <div className="emoji">
            <BsEmojiSmileFill />
          </div>
        </div>

        <form className="input-container">
          <input type="text" placeholder="Write a message" />
          <button className="submit">
            <IoMdSend />
          </button>
        </form>
      </ChatInputContainer>
    </>
  )
}

export default ChatInput;

const ChatInputContainer = styled.div`
  height: 10.3%;
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #4A4A64;
  padding: 0 2rem;
  padding-bottom: .3rem;
  
  .button-container {
    display: flex;
    align-items: center;
    justify-items: center;
    color: #FFFFFF;
    gap: 1rem;

    .emoji {
      position: relative;

      svg {
        font-size: 1.5rem;
        color: #05B0FF;
        cursor: pointer;
      }
    }
  }

  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-content: center;
    gap: 2rem;
    background-color: #FFFFFF34;

    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: #FFFFFF;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #918673;
      }

      &:focus {
        outline: none;
      }
    }

    button {
      padding: .3rem 2rem;
      border-radius: 2rem;
      display: flex;
      background-color: #50C8FF;
      border: none;
      
      svg {
        font-size: 2rem;
        color: #FFFFFF;
      }
    }
  }
`;