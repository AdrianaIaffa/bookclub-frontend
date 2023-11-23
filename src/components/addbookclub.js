import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export default function Addbookclub() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  console.log("Token:", token);
  const [clubData, setClubData] = useState({
    name: "",
    description: "",
    discussion: "",
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
    const formattedDiscussion = clubData.discussion.replace(/\n/g, "<br>");
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/create_bookclub/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({
          ...clubData,
          discussion: formattedDiscussion,
        }),
      });

      if (response.ok) {
        console.log("Book club created successfully");
        navigate("/bookclubs");
      } else {
        console.error("Error creating book club");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="body-addbookclub">
        <h1>ADD BOOK CLUB</h1>
        <div>
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

            <Form.Group className="mb-3" controlId="formBasicDiscussion">
              <Form.Label>Discussion</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter your discussion topics or questions"
                name="discussion"
                value={clubData.discussion}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              CREATE CLUB
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}
