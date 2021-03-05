import React from 'react';
import { Card } from 'react-bootstrap';

class InfoCard extends React.Component{
    render() {
        console.log(this.props.data)
        return(
        <Card>
        <Card.Body>
            <Card.Title>{this.props.data.basic_info.class}</Card.Title>
            <Card.Subtitle>Class</Card.Subtitle>
            <Card.Text>
            For this class, you recieve a bonus to an ability score. Please select your class bonus:
            </Card.Text>
            <Card.Link href={"https://www.13thagesrd.com/classes/" + this.props.data.basic_info.class} target="_blank">Learn more {'>'}</Card.Link>
        </Card.Body>
        </Card>
        );
    }
}

export default InfoCard;
