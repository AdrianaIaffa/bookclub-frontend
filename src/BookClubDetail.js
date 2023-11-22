import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BookClubDetail() {
  const { id } = useParams();
  const [bookclub, setBookClub] = useState({});
  const token = localStorage.getItem("access_token");
  console.log("Token:", token);

  const getBookClubDetails = async () => {
    const response = await fetch(`http://localhost:8000/bookclubs/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    // Assuming `members` field contains member URLs
    const membersData = await Promise.all(
      data.members.map(async (memberUrl) => {
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

    setBookClub({
      ...data,
      members: membersData,
    });
  };

  const joinBookClub = async () => {
    const response = await fetch(`http://localhost:8000/bookclubs/${id}/join/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      // Successfully joined, update the book club details
      getBookClubDetails();
    } else {
      // Handle error, show a message, etc.
      console.error("Failed to join the book club");
    }
  };

  const leaveBookClub = async () => {
    const response = await fetch(`http://localhost:8000/bookclubs/${id}/leave/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      // Successfully left, update the book club details
      getBookClubDetails();
    } else {
      // Handle error, show a message, etc.
      console.error("Failed to leave the book club");
    }
  };

  useEffect(() => {
    getBookClubDetails();
  }, [id]);

  return (
    <div>
      <h1>{bookclub.name}</h1>
      <p>{bookclub.description}</p>
      <div className="members-list">
        <h2>Members:</h2>
        <ul>
          {bookclub.members &&
            bookclub.members.map((member, index) => (
              <li key={index}>{member.username}</li>
            ))}
        </ul>
      </div>
      <button onClick={joinBookClub}>Join</button>
      <button onClick={leaveBookClub}>Leave</button>
    </div>
  );
}
