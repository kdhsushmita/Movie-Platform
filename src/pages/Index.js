import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import MovieNavBar from '../components/MovieNavBar';
import SingleMovie from '../components/SingleMovie';
import { Row, Form, Container, Spinner } from 'react-bootstrap';

const Index = () => {
    const [film, setFilm] = useState([]);
    const [isError, setIsError] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [searchMovie, setSearchMovie] = useState("");
    const [searchError, setSearchError] = useState("");
    const [loading, setLoading] = useState();
    const [firstRun, setFirstRun] = useState(true);
    const history = useHistory();
    const fetchAllMovies = async () => {
        //fetch resource
        //api ko data fetch garna

        //making this asynchronous process synchronous
        //making a promise
        //await banayesi yo execute nabhai tala ko execute hunna
        //eslai await garna mathi function async huna parcha
        setLoading(true);
        try {
            const response = await axios.get(
                `https://api.dynoacademy.com/test-api/v1/movies?search=${searchMovie}`
            );
            setFilm(response.data.moviesData);
            setLoading(false);
            setFirstRun(false);
        }
        catch (e) {
            setIsError(true);
            //get ma custom error rakhda ni kei bhayena because fetch garda khasai kei farak pardaina
            //ki ta internet ki ta server kai problem bhako huncha so static custom msg rkhda ni huncha
            setErrorText(e.message);
            setLoading(false);
            // alert(e.message);
            setFirstRun(false);
        }
    };

    //one time
    useEffect(() => {
        fetchAllMovies();
    }, []);

    useEffect(() => {
        if (!firstRun) {
            const fetchTimer = setTimeout(() => {
                if (searchMovie && searchMovie.length > 2) {
                    fetchAllMovies();
                    setSearchError("");
                }
                else if (searchMovie.length < 1) {
                    fetchAllMovies();
                    setSearchError("");
                }
                else {
                    setSearchError("Please enter at least 3 characters to search movie.");
                }
                // fetchAllMovies();
            }, 2000);
            //cleanup
            return () => {
                clearTimeout(fetchTimer);
            };
        }
    }, [searchMovie]);
    //monitors every component change
    // useEffect(() => {
    // fetchAllMovies();
    //     console.log("Something is updated.")
    // })
    //Updated when film is changed
    // useEffect(() => {
    //     fetchAllMovies();
    //     console.log("Something is updated.")
    // }, [film])

    return (
        <>
            <MovieNavBar />
            {isError ? <div style={{ color: "white", backgroundColor: "red", padding: "5px", margin: "10px" }}>
                {errorText}
            </div> : <div >
                <Container>
                    <Form.Group className="mt-3" controlId="formBasicEmail">
                        <Form.Control type="text" value={searchMovie} placeholder='Search Movie' onChange={(e) => (setSearchMovie(e.target.value))} />
                    </Form.Group>
                </Container>
                <span style={{ color: "red" }}>{searchError}</span> <br />
                <div style={{
                    backgroundColor: "#e7e7e7",
                    padding: "5px",
                    margin: "10px",
                    marginTop: "-5px"
                }}>
                    {loading ?
                        <>
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </>
                        :
                        <>

                        </>}
                    <br />
                    {!loading && film.length < 1 ? (<>No movie found.</>) :
                        (<>
                            <Row>
                                {
                                    film.map((el) =>
                                        <>
                                            <SingleMovie el={el} />
                                        </>
                                    )
                                }
                            </Row>
                        </>)
                    }
                </div>

            </div>
            }
        </>
    )
}
export default Index
