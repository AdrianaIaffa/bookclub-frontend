import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBookClub() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("access_token");
  console.log("Token:", token);
  const [clubData, setClubData] = useState({
    name: "",
    description: "",
    discussion: "",
  });

  useEffect(() => {
    const fetchBookClubDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/bookclubs/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setClubData({
            name: data.name,
            description: data.description,
            discussion: data.discussion,
          });
        } else {
          console.error("Error fetching book club details");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchBookClubDetails();
  }, [id]);

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
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/bookclubs/${id}/update_bookclub/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({
            ...clubData,
            discussion: formattedDiscussion,
          }),
        }
      );

      if (response.ok) {
        console.log("Book club updated successfully");
        navigate(`/bookclubs/${id}`);
      } else {
        console.error("Error updating book club");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="body-editbookclub">
        <h1>EDIT BOOK CLUB</h1>
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
              UPDATE CLUB
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}
