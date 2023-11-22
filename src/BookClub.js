import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./BookClub.css";

export default function BookClub() {
  const [bookclubs, setBookClubs] = useState([]);
  const token = localStorage.getItem("access_token");
  console.log("Token:", token);


  useEffect(() => {
    const getBookClub = async () => {
      const response = await fetch(`http://localhost:8000/bookclubs/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setBookClubs(data);
    };
    getBookClub();
  }, []);
  return (
    <div>
      <div className="join-banner">
        <img
          className="join-banner-img"
          src="/images/Hands - Book.png"
          alt="open book"
        />
        <h1>Join a BookClub!</h1>
        <img
          className="join-banner-img"
          src="/images/Big Shoes - Torso.png"
          alt="person reading a book"
        />
      </div>

      <div className="bookclub-body">
        {bookclubs.map((bookclub) => (
          <div key={bookclub.id} className="bookclub-item">
            <div className="image-container">
              <img src={bookclub.imageSrc} alt={`Image for ${bookclub.name}`} />
            </div>
            <div className="info-container">
              <h3 className="bookclub-title">Bookclub</h3>
              <Link to={`/bookclubs/${bookclub.url.split("/").reverse()[1]}`}>{bookclub.name}</Link>
              {/* <h3>{bookclub.name}</h3> */}
              <p>{bookclub.description}</p>
              <p>members:{bookclub.members.length}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
