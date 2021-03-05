import React from 'react';
import { Card, Form } from 'react-bootstrap';

class InfoCard extends React.Component{
    render() {
        console.log(this.props.data)
        const infoItem = this.props.data.basic_info.class
        const itemOptions = this.props.data.basic_info.class_bonus_options
        return(
        <Card>
        <Card.Body>
            <Card.Title>{infoItem}</Card.Title>
            <Card.Subtitle>Class</Card.Subtitle>
            <Card.Text>
            For this class, you recieve a bonus to an ability score. Please select your class bonus:
            {itemOptions.map((option) => (
                <Form.Check 
                    type = "radio" 
                    name = "class"
                    label={`${option} (+2)`}
                />

            ))}
            </Card.Text>
            <Card.Link href={"https://www.13thagesrd.com/classes/" + this.props.data.basic_info.class} target="_blank">Learn more {'>'}</Card.Link>
        </Card.Body>
        </Card>
        );
    }
}

export default InfoCard;
