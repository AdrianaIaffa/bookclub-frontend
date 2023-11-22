import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React, { useState, useEffect } from "react";
import './navigation.css'

export function Navigation() {

  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);
  return (
    <>
    <Navbar className="bg-body-tertiary">
    <div>
      <Navbar.Brand className="navbar-brand" href="#home">The Book Club</Navbar.Brand>
    </div>
    <Nav className="justify-content-center" activeKey="/home">

        <Nav.Item>
          {isAuth ? <Nav.Link href="/">HOME</Nav.Link> : null}
        </Nav.Item>

        {/* <Nav.Item>
          <Nav.Link eventKey="link-1">Link</Nav.Link>
        </Nav.Item>
        
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>Disabled</Nav.Link>
        </Nav.Item> */}

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