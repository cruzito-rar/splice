import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/logo.png";

const Register = () => {

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(handleValidation()) {
      const {username, email, password, confirmPassword} = values;
      const {data} = await axios.post();
    }
  }

  const handleChange = (event) => {
    setValues({...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const {username, email, password, confirmPassword} = values;

    if (password!== confirmPassword) {
      toast.error("Passwords do not match", toastOptions);
      return false;
    } else if (username.length < 9 ) {
      toast.error("Username must be at least 9 characters", toastOptions);
      return false;
    } else if (password.length < 10) {
      toast.error("Password must be at least 10 characters", toastOptions);
      return false;
    } else if(email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    }
    return true;
  }

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            {/* <img src={Logo} alt="Logo"/> */}
            <h1>Splice</h1>
          </div>
          <input type="text" name="username" onChange={(e) => handleChange(e)} placeholder="Username"/>
          <input type="email" name="email" onChange={(e) => handleChange(e)} placeholder="E-mail"/>
          <input type="password" name="password" onChange={(e) => handleChange(e)} placeholder="Password"/>
          <input type="password" name="confirmPassword" onChange={(e) => handleChange(e)} placeholder="Confirm Password"/>
          <button type="submit">Create account</button>
          <span>Alredy have an account? <Link to="/login">Login</Link> </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 5rem;
    }

    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }

  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #05B0FF;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;

    &:focus {
      border: 0.1rem solid #82D8FF;
      outline: none;
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

  span {
    color: white;
    text-transform: uppercase;

    a {
      color: #05B0FF;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Register;
