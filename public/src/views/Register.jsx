import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

const Register = () => {

  const navigate = useNavigate();

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

  useEffect(() => {
    if (localStorage.getItem("splice-user")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(handleValidation()) {
      const { username, email, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password
      });

      if(data.status === false) {
        toast.error(data.message, toastOptions);
      }

      if(data.status === true) {
        localStorage.setItem("splice-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  }

  const handleChange = (event) => {
    setValues({...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;

    if (password!== confirmPassword) {
      toast.error("Passwords do not match", toastOptions);
      return false;
    } else if (username.length < 4) {
      toast.error("Username must be at least 9 characters", toastOptions);
      return false;
    } else if (password.length < 6) {
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
  background-color: #047BB3;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

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

    &::placeholder {
      color: #FFFFFF;
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
    transition: .3s ease-in-out;
    border: 2px solid #05B0FF;

    &:hover {
      background-color: #035880;
    }
  }

  span {
    color: white;
    text-transform: uppercase;

    a {
      color: #05B0FF;
      text-decoration: none;
      font-weight: bold;
      transition: .3s ease-in-out;

      &:hover {
        color: #047BB3;
      }
    }
  }
`;

export default Register;
