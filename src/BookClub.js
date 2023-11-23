import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./BookClub.css";

export default function BookClub() {

  const getRandomImage = () => {
    const images = [
      "/images/Big Shoes - Torso (1).png",
      "/images/Big Shoes - Torso (2).png",
      "/images/Big Shoes - Torso (3).png",
      "/images/Big Shoes - Torso (4).png",
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };
  const [bookclubs, setBookClubs] = useState([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const token = localStorage.getItem("access_token");

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
      const bookclubsWithImages = data.map((bookclub) => ({
        ...bookclub,
        image: getRandomImage(),
      }));

      setBookClubs(bookclubsWithImages);
      // setBookClubs(data);
    };
    getBookClub();
  }, []);

  const toggleDescription = (bookclubId) => {
    console.log("Clicked book club id:", bookclubId);

    setExpandedDescriptions((prevDescriptions) => ({
      ...prevDescriptions,
      [bookclubId]: !prevDescriptions[bookclubId],
    }));
  };

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
  
        {bookclubs.map((bookclub, index) => (
          <div key={index} className="bookclub-item">

            <div className="image-container">
            <img src={bookclub.image} alt={`Image for ${bookclub.name}`} />
            </div>

            <div className="info-container">
              <h3><Link to={`/bookclubs/${bookclub.url.split("/").reverse()[1]}`}className="link-no-style">{bookclub.name}</Link></h3>
              <p className="description">

              {expandedDescriptions[bookclub.url.split("/").slice(-2, -1)[0]]
                  ? bookclub.description
                  : `${bookclub.description.slice(0, 100)}...`}
                <span
                  className="read-more"
                  onClick={() => toggleDescription(bookclub.url.split("/").slice(-2, -1)[0])}
                >
                  {expandedDescriptions[bookclub.url.split("/").slice(-2, -1)[0]] ? 'See less' : 'Read more'}
                </span>
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
