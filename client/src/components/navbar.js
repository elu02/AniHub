import React from 'react'
import logo from '../images/logo.png'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'

const myNavbar = () => {
    return (<Navbar bg="light" variant="light">
              <Navbar.Brand to="/">
                <img src={logo} alt="logo" height="50px"></img>
              </Navbar.Brand>
              <Nav className="mr-auto">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/my-list" className="nav-link">My List</Link>
                <Link to="/about" className="nav-link">About</Link>
              </Nav>
              <Nav className="justify-content-end">
               <Link to="/login" className="nav-link">Login</Link>
               <Link to="/register" className="nav-link">Register</Link>
               <Link to="/logout" className="nav-link">Logout</Link>
              </Nav>
            </Navbar>)
}

export default myNavbar