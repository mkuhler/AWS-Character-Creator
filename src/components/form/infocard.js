import React from 'react';
import { Card, Form } from 'react-bootstrap';

class InfoCard extends React.Component{
    render() {
        console.log(this.props.data)
        const itemName = this.props.name
        const infoItem = this.props.data.basic_info.[itemName]
        const itemOptions = this.props.data.basic_info.class_bonus_options
        if (infoItem != "") {
            return(
                <Card>
                <Card.Body>
                    <Card.Title>{infoItem}</Card.Title>
                    <Card.Subtitle>{this.props.name}</Card.Subtitle>
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
                    <Card.Link href={"https://www.13thagesrd.com/classes/" + infoItem} target="_blank">Learn more {'>'}</Card.Link>
                </Card.Body>
                </Card>
                );
        } else {return (null)}
        
    }
}

export default InfoCard;
