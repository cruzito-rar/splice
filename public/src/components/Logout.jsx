import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BiPowerOff } from "react-icons/bi";

const Logout = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <>
      <Button onClick={handleClick}>
        <BiPowerOff />
      </Button>
    </>
  )
}

export default Logout;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: .5rem;
  border-radius: .5rem;
  background-color: #05B0FF;
  border: none;
  cursor: pointer;
  transition: .3s ease-in-out;

  &:hover {
    background-color: #035880;
  }

  svg {
    font-size: 1.3rem;
    color: #FFFFFF;
  }
`;