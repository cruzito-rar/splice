import React from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

const Welcome = ({ currentUser }) => {
  return (
    <>
      <WelcomeContainer>
        <img src={Robot} alt="robot" />
        <h1>Welcome, <span> { currentUser.username }! </span> </h1>
        <h3> Start a new conversation </h3>
      </WelcomeContainer>
    </>
  )
}

export default Welcome;

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #FFFFFF;

  img {
    height: 20rem;
  }

  span {
    color: #05B0FF;
  }

`;