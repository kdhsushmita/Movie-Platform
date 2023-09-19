import React, { useRef, useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Button, Container, Form, Modal, Navbar } from 'react-bootstrap';
import MovieNavBar from '../components/MovieNavBar';

const Login = () => {
    const email = useRef();
    const password = useRef();
    const history = useHistory();
    const [modalShown, setModalShown] = useState(false);
    const [modalText, setModalText] = useState("");
    const onLoginHandler = async (e) => {
        e.preventDefault();
        const loginData = {
            "email": email.current.value,
            "password": password.current.value
        };
        try {
            const response = await axios.post("https://api.dynoacademy.com/test-api/v1/login", loginData,
                {
                    // kaile kai backend bata data aaudaina hang huncha so use lai kina akdairakne ,time set garera erro dekhaidi halne
                    timeout: 10000
                });

            console.log(response.data.accessToken);
            setModalText("Loggined In Successfully");
            setModalShown(true);

            const accessToken = response.data.accessToken;
            localStorage.setItem("Token", accessToken);
            history.replace("/");
        }

        catch (error) {
            //  console.log(error)
            //alert(error.response);

            if (error.response) {
                //alert(error.response.data.errors[0].message);
                setModalText(error.response.data.errors[0].message);
                setModalShown(true);
            }
            else {
                // alert("Unknown error occured.Try again.")
                setModalText("Unknown error occured.Try again.");
                setModalShown(true);
            }
        }
    }
    return (
        <>
            <MovieNavBar />
            <Container>
                <div style={{ padding: "10px", marginTop: "10px", fontSize: "17px" }}>
                    <b>Login Screen</b>
                    <Form action="" onSubmit={onLoginHandler}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" ref={email} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" ref={password} />
                        </Form.Group>
                        <Button variant="dark" type="submit">
                            Login
                        </Button>
                    </Form>
                </div>
            </Container>
            <Modal show={modalShown} onHide={() => {
                setModalShown(false)
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalText}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        setModalShown(false)
                    }}>
                        Close
                    </Button>
                    <Button variant="primary" >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Login
