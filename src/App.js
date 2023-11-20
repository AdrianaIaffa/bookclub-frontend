
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/login";
import Home from "./components/home";
// import { Navigation } from "./components/navigation";
import  {Navigation}  from './components/navigation';
import { Logout } from "./components/logout";
import BookClub from './BookClub';
import  Registration  from './components/registration';
// import NavBar from './NavBar/NavBar';

// function App() {
//   return (
//     <div className="App">
//      <NavBar>
//      </NavBar>
//       <BookClub />
//     </div>
//   );
// }

// export default App;
function App() {
  return (
    <BrowserRouter>
      <Navigation></Navigation>
      <Routes>
       
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/bookclubs" element={<BookClub />} />
        <Route path="/registration" element ={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;