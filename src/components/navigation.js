import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./navigation.css";

export function Navigation() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);

  const handleHomeClick = () => {
    if (isAuth) {
      navigate("/bookclubs");
    }
  };

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <div>
          <Navbar.Brand className="navbar-brand" href="/landingpage">
            The Book Club
          </Navbar.Brand>
        </div>
        <Nav className="justify-content-center" activeKey="/home">
          <Nav.Item>
            {!isAuth && <Nav.Link onClick={handleHomeClick}></Nav.Link>}
          </Nav.Item>
          {isAuth ? (
            <>
              <Nav.Item>
                <Nav.Link href="/create_bookclub">ADD BOOK CLUB</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/bookclubs">ALL BOOKCLUBS</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link href="/logout">LOGOUT</Nav.Link>
              </Nav.Item>
            </>
          ) : (
            <>
              <Nav.Item>
                <Nav.Link href="/registration">SIGN UP</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link href="/login">LOGIN</Nav.Link>
              </Nav.Item>
            </>
          )}
        </Nav>
      </Navbar>
    </>
  );
}
