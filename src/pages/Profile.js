import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import MovieNavBar from '../components/MovieNavBar';
import { Button, Container, Modal } from 'react-bootstrap';

const Profile = () => {
    const [showModal, setShowModal] = useState(false);
    const history = useHistory();

    const getProfile = async () => {
        try {
            const getaccessToken = localStorage.getItem("Token");
            const response = await axios.get(`https://api.dynoacademy.com/test-api/v1/me`, {
                timeout: 10000,
                headers: {
                    Authorization: `Bearer ${getaccessToken}`
                }
            });
            console.log(response)

        }
        catch (e) {
            console.log(e)
        }
    }

    const onLogoutHandler = () => {

        setShowModal(true);

    }

    useEffect(() => {
        getProfile();
    }, [])

    return (
        <div>
            <MovieNavBar />
            <Container className='mt-2'>
                <Button variant="danger" onClick={onLogoutHandler}>Logout</Button>{' '}
                <Modal show={showModal} onHide={() => { setShowModal(false) }}>

                    <Modal.Body>Are you sure you want to Logout?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => {
                            localStorage.removeItem("Token");
                            setShowModal(false)
                            history.replace("/");
                        }}>
                            LogOut
                        </Button>
                        <Button variant="secondary" onClick={() => {
                            setShowModal(false)
                        }}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    )
}

export default Profile
