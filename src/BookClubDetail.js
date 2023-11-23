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
  const [isMember, setIsMember] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const token = localStorage.getItem("access_token");
  const decodedtoken = jwtDecode(token);
  console.log(decodedtoken);

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

    const membersData = await Promise.all(
      (data.members || []).map(async (memberUrl) => {
        const memberResponse = await fetch(memberUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        });
        return memberResponse.json();
      })
    );

    const commentsResponse = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/${id}/comments/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    const commentsData = await commentsResponse.json();
    setComments(commentsData);
    setBookClub({
      ...data,
      members: membersData,
    });

    const userId = decodedtoken.user_id;
    const calculatedIsMember = data.members?.some((memberUrl) => {
      return memberUrl === `${process.env.REACT_APP_BACKEND_URL}/registration/${userId}/`;
    });
    setIsMember(calculatedIsMember);

    const calculatedIsOwner =
      data.created_by === `${process.env.REACT_APP_BACKEND_URL}/registration/${userId}/`;
    setIsOwner(calculatedIsOwner);
  };

  const joinBookClub = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/bookclubs/${id}/join/`,
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
    } else if (response.status === 400) {
    } else {
      console.error("Failed to join the book club");
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

    if (response.status === 204) {
      navigate("/bookclubs");
      console.log("Book club deleted successfully");
    } else {
      console.error("Failed to delete the book club");
    }
  };

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
  }, [id, getBookClubDetails]);

  useEffect(() => {
    console.log("Comments:", comments);
  }, [comments]);

  return (
    <>
      <div className="bookclub-body">
        <div className="book-info">
          <div className="top-info">
            <div className="book-title">
              <h1>{bookclub.name}</h1>
            </div>

            <div className="buttons-container">
              {isMember ? (
                <Button onClick={leaveBookClub}>Leave</Button>
              ) : (
                <Button onClick={joinBookClub}>Join</Button>
              )}
              {isOwner && (
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

            {isMember && (
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
