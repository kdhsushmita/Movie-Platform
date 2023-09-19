import React, { useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import MovieNavBar from '../components/MovieNavBar';
import { Button, Container, Form } from 'react-bootstrap';

const AddMovie = () => {
    const movie_name_reference = useRef();
    const movie_rating = useRef();
    const movie_description = useRef();
    const history = useHistory();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const movieData = {
            movie_name: movie_name_reference.current.value,
            rating: movie_rating.current.value,
            description: movie_description.current.value
        };
        try {
            const response = await axios.post("https://api.dynoacademy.com/test-api/v1/movies", movieData,
                {
                    // kaile kai backend bata data aaudaina hang huncha so use lai kina akdairakne ,time set garera erro dekhaidi halne
                    timeout: 10000
                });

            //  console.log(response)
            alert(response.data.message);
            history.push("/");
        }

        catch (error) {
            //  console.log(error)
            //alert(error.response);

            if (error.response) {
                alert(error.response.data.errors[0].message);
            }
            else {
                alert("Unknown error occured.Try again.")
            }
        }
    }
    return (
        <div>
            <MovieNavBar />
            <Container className='mt-3'>
                <Form onSubmit={onSubmitHandler}>
                    <h5>Add a Movie</h5>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label> Movie Name</Form.Label>
                        <Form.Control type="text" placeholder='Movie Name' ref={movie_name_reference} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>  Rating</Form.Label>
                        <Form.Control type="text" placeholder='Rating' ref={movie_rating} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" cols="40" rows="10" ref={movie_description} />
                    </Form.Group>
                    <Button variant="dark" type="submit">
                        Add A Movie
                    </Button>
                </Form>
            </Container>
        </div>
    )
}

export default AddMovie
