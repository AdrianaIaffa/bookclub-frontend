import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import "./NavBar.css";

export default function NavBar() {
  const [isAuth, setIsAuth] = useState(false);
  
  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);

  return (
    <Navbar className="bg-body-tertiary">
    <div>
      <Navbar.Brand className="navbar-brand" href="#home">The Book Club</Navbar.Brand>
    </div>
    <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item>
          {isAuth ? <Nav.Link href="/">Home</Nav.Link> : null}
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Bookclubs</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            Disabled
          </Nav.Link>
        </Nav.Item>
        {isAuth ? (
            <Nav.Link href="/logout">Logout</Nav.Link>
          ) : (
            <Nav.Link href="/login">Login</Nav.Link>
          )}
      </Nav>
  </Navbar>
  )
}
