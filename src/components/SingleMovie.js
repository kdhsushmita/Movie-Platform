import React from 'react'
import { Button, Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SingleMovie = ({ el }) => {
    const imageStyle = {
        height: "150px",
        width: "150px"
    }
    return (
        <Col>
            <Card style={{ width: '16rem', minHeight: "730px" }}>
                <Card.Img variant="top" src={el.image} alt="Failed To Load" style={{ maxWidth: "300px" }} />
                <Card.Body>
                    <Card.Title>
                        <span style={{ fontWeight: "bold" }}> {el.name}</span></Card.Title>
                    <Card.Text>
                        Info: {el.info}
                    </Card.Text>
                    <Link to={`/SingleMovie/${el.id}`}>
                        <Button variant="dark">View Details</Button>
                    </Link>
                </Card.Body>
            </Card>


            {/* <div>
                <Link to={`/SingleMovie/${el.id}`}>
                <span style={{ fontWeight: "bold" }}> {el.name}</span> 
                <br /></Link>
                <img src={el.image} alt="Failed To Load" style={imageStyle} /> <br />
                Info: {el.info}
                <br />
                Rating: {el.rating}
                <br /> <br /><br />
            </div> */}
        </Col>
    )
}

export default SingleMovie
