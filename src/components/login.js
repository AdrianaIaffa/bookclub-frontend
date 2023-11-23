// Import the react JS packages
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import './registration.css'
// Define the Login function.
export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Create the submit method.
  const submit = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
    };
    // Create the POST requuest
    const { data } = await axios.post("http://localhost:8000/token/", user,
    {
      headers: { "Content-Type": "application/json" },
    },
    {
        withCredentials: true
    },
    );

    // Initialize the access & refresh token in localstorage.
    localStorage.clear();
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    axios.defaults.headers.common["Authorization"] = `Bearer ${data["access"]}`;
    window.location.href = "/bookclubs";
  };
  return (
    <>
    <div className="body-login">
      <h1>LOG IN</h1>

      <div className="form-container">

        <Form onSubmit={submit}>

          <Form.Group className="mb-3" controlId="formBasicUsername">
             <Form.Label>Username</Form.Label>
             <Form.Control 
             type="text" 
             placeholder="Enter username"
             name="username"
             value={username}
             required
             onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
            type="password" 
            placeholder="Password"
            name="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group> */}

          <Button variant="primary" type="submit">
            LOGIN
          </Button>
          <div className="text-center mt-3">
             {/* <p className="mb-0">Not a member? Join us</p> */}
             <button
                type="button"
               className="btn btn-primary redirect"
                onClick={() => {
                  // Redirect to the registration page
                 window.location.href = "/registration";
                }}
            >
                NOT A MEMBER? JOIN US
              </button>
           </div>
        </Form>
      
      </div>
    </div>
  </>
  );
};