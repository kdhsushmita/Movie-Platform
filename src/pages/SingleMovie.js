import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';
import MovieNavBar from '../components/MovieNavBar';
import { Card, Container } from 'react-bootstrap';

const SingleMovie = () => {
    const [movieData, setMovieData] = useState({});
    const getparams = useParams();
    const getId = getparams.id;
    console.log(getId);
    const viewMovieDetails = async () => {
        const response = await axios.get(`https://api.dynoacademy.com/test-api/v1/movie/${getId}`);
        console.log(response.data.singleMovieData);
        setMovieData(response.data.singleMovieData);

    }
    const imageStyle = {
        height: "200px",
        width: "150px"
    }
    useEffect(() => {
        viewMovieDetails();
    }, [])
    return (
        <>
            <MovieNavBar />
            <Container className='mt-2' >
                <h3>    {movieData.name}</h3>
                <img src={movieData.image} alt="failed to load" style={imageStyle} /> <br /> <br />
                <Card className='p-3'><b> Movie Info:</b> {movieData.info} <br /></Card> <br />
                <Card className='p-3' ><b> Movie Description:</b> {movieData.desc} <br /> </Card> <br />
                <Card className='p-3'> <b> Movie Rating:</b> {movieData.rating}</Card>
            </Container>
        </>
    )
}

export default SingleMovie
