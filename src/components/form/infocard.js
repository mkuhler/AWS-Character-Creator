import React from 'react';
import { Card } from 'react-bootstrap';

class InfoCard extends React.Component{
    render() {
        console.log(this.props.key)
        return(
        <Card>
        <Card.Body>
            <Card.Title>{0}</Card.Title>
            <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
            </Card.Text>
            <Card.Link href={"https://www.13thagesrd.com/classes/"} target="_blank">Learn more {'>'}</Card.Link>
        </Card.Body>
        </Card>
        );
    }
}

export default InfoCard;