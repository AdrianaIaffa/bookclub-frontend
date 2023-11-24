import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./BookClubDetails.css";

export default function BookClubDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [bookclub, setBookClub] = useState({});
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const token = localStorage.getItem("access_token");
  const decodedtoken = jwtDecode(token);
  const userId = decodedtoken.user_id;

  // eslint-disable-next-line
  const getBookClubDetails = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/bookclubs/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    const commentsResponse = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/bookclubs/${id}/comments/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      }
    );
  
    const commentsData = await commentsResponse.json();
    const created_by = data.created_by.split('/registration/')[1].replace('/','');
    const memberNumbers = data.members.map(memberUrl => {
      const memberId = memberUrl.split('/registration/')[1].replace('/', '');
      return parseInt(memberId);
    });
    setComments(commentsData);
    setBookClub({
      ...data,
      members: data.members,
      created_by: created_by,
      member_id: memberNumbers
    
    });
  }
  const joinBookClub = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/bookclubs/${id}/join/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          }
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Joined book club successfully:", data);
        getBookClubDetails();
      } else {
        const errorData = await response.json();
        console.error("Error joining book club:", errorData);
      }
    } catch (error) {
      console.error("Error joining book club:", error.message);
    }
  };

  const leaveBookClub = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/bookclubs/${id}/leave/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      getBookClubDetails();
    } else {
      console.error("Failed to leave the book club");
    }
  };

  const deleteBookClub = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/bookclubs/${id}/delete_bookclub/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    getBookClubDetails();
    navigate("/bookclubs");
  }
  //   if (response.status === 204) {
  //     getBookClubDetails();
  //     navigate("/bookclubs");
  //     window.location.href = "/bookclubs";
  //     console.log("Book club deleted successfully");
  //   } else {
  //     console.error("Failed to delete the book club");
  //   }
  // };

  const submitComment = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/bookclubs/${id}/add_comment/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: newComment }),
      }
    );

    if (response.status === 201) {
      getBookClubDetails();
      setNewComment("");
    } else {
      console.error("Failed to add the comment");
    }
  };
  const editBookClub = () => {
    navigate(`/bookclubs/${id}/update_bookclub`);
  };
  useEffect(() => {
    getBookClubDetails();
    // eslint-disable-next-line
  }, [id]);

  return (
    <>
      <div className="bookclub-body">
        <div className="book-info">
          <div className="top-info">
            <div className="book-title">
              <h1>{bookclub.name}</h1>
            </div>

            <div className="buttons-container">
              {bookclub.member_id?.includes(userId)? (
                <Button onClick={leaveBookClub}>Leave</Button>
              ) : (
                <Button onClick={joinBookClub}>Join</Button>
              )} 
            {/* eslint-disable-next-line */}
              {bookclub.created_by == userId && (
                <>
                  <Button onClick={editBookClub}>Edit</Button>
                  <Button onClick={deleteBookClub}>Delete</Button>
                </>
              )}
            </div>
          </div>

          <div className="members-list">
            <h6>Members: {bookclub.members?.length}</h6>
          </div>

          <div className="discussion-questions">
            <div>
              <h5>Discussion Questions:</h5>
            </div>
            <div>
              {bookclub.discussion?.split("<br>").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>

          <div className="comments-section">
            <h5>Your Thoughts:</h5>
            {comments && comments.length > 0 ? (
              <div className="speech-bubbles-container">
                {[...comments].reverse().map((comment) => (
                  <div key={comment.id} className="speech-bubble">
                    {comment.comment}
                  </div>
                ))}
              </div>
            ) : (
              <p>No comments available.</p>
            )}

            { bookclub.member_id?.includes(userId) && (
              <div className="add-comment-container">
                <Form.Group controlId="formBasicComment">
                  <Form.Control
                    as="textarea"
                    placeholder="Write your comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                </Form.Group>
                <Button onClick={submitComment}>Submit Comment</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
