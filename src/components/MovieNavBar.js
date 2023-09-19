import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const MovieNavBar = () => {
    return (
        <div>
            <Navbar className="bg-black">
                <Container>
                    <Link to={"/"} > <Navbar.Brand href="#home" className='text-white'>Movie Suggestor</Navbar.Brand>
                        <Navbar.Toggle /></Link>
                    <Navbar.Collapse className="justify-content-end gap-2">
                        <Navbar.Text>
                            <Link to={"/add"} className='text-white' >Add Movie  </Link>
                        </Navbar.Text>
                        <Navbar.Text>
                            {localStorage.getItem("Token") ? <><Link to={"/profile"} className='text-white' >Profile</Link> <br /></> : <> <Link to={"/login"} className='text-white'>Login</Link><br /></>}
                        </Navbar.Text>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default MovieNavBar
