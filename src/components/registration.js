import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './registration.css'

export default function Registration() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/registration/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("User registered:", data);
      window.location.href = "/";
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <>
      <div className="body-signup">

        <h1>SIGN UP</h1>

        <div className="form-container">

          <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="formBasicUsername">
               <Form.Label>Username</Form.Label>
               <Form.Control 
               type="text" 
               placeholder="Enter username"
               name="username"
               value={formData.username}
               onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
              type="email" 
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange} />
              {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
              type="password" 
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange} />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}

            <Button variant="primary" type="submit">
              JOIN US
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}
