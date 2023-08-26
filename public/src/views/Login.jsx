import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

const Login = () => {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: ""
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
      const { data } = await axios.post(loginRoute, {
        username,
        email,
        password
      });

      if(data.status === false) {
        toast.error(data.message, toastOptions);
      }

      if(data.status === true) {
        localStorage.setItem("splice-user", JSON.stringify(data.loginUser));
        navigate("/");
      }
    }
  }

  const handleChange = (event) => {
    setValues({...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { username, password } = values;

    if (username.length === "") {
      toast.error("Username and password are required", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Username and password are required", toastOptions);
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
          <input type="text" name="username" onChange={(e) => handleChange(e)} min="4" placeholder="Username"/>
          <input type="password" name="password" onChange={(e) => handleChange(e)} placeholder="Password"/>
          <button type="submit">Log In</button>
          <span>You don't have an account? <Link to="/register">Register</Link> </span>
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

export default Login;
