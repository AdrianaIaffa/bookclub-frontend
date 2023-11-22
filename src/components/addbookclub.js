import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Addbookclub() {
    const token = localStorage.getItem("access_token");
    console.log("Token:", token);
    const [clubData, setClubData] = useState({
        name: '',
        description: '',
        discussion: ''
      });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setClubData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
    try {
        const response = await fetch('http://localhost:8000/create_bookclub/', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            body: JSON.stringify(clubData),
        });
    
        if (response.ok) {
            // Handle success, e.g., redirect to a success page
            console.log('Book club created successfully');
        } else {
            // Handle errors
            console.error('Error creating book club');
        }
        } catch (error) {
        console.error('Error:', error);
        }
    };

  return (
    <>
    <div className="body-addbookclub">
      <h1>ADD BOOK CLUB</h1>
      <div className="form-container">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Club Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter club name"
              name="name"
              value={clubData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter club description"
              name="description"
              value={clubData.description}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Add more fields as needed */}

          <Button variant="primary" type="submit">
            CREATE CLUB
          </Button>
        </Form>
      </div>
    </div>
  </>
);
  
}
