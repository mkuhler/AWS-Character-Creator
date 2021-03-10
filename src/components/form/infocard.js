import React from 'react';
import { Card, Form } from 'react-bootstrap';

class InfoCard extends React.Component{
    render() {
        console.log(this.props.data)
        const itemName = this.props.name
        const infoItem = this.props.data.basic_info.[itemName]
        const selectionName = `${itemName}_bonus_chosen`
        var itemOptions = []
        var itemNamePlural = ""

        // Adds plural suffix to the itemName for use in the help url
        if (itemName === "class") {
            itemNamePlural = "classes"
            itemOptions = this.props.data.basic_info.class_bonus_options
        } else if (itemName === "race") {
            itemNamePlural = "races"
            itemOptions = this.props.data.basic_info.race_bonus_options
        }

        if (infoItem != "") {
            return(
                <Card>
                <Card.Body>
                    <Card.Title>{infoItem}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{this.props.name}</Card.Subtitle>
                    <Card.Text>
                    For this {itemName}, you recieve a bonus to an ability score. Please select your {itemName} bonus:
                    </Card.Text>
                    
                    {itemOptions.map((option, key) => (
                        <Form.Group controlId="basic_info" key={key}>
                        <Form.Check 
                            type = "radio" 
                            name = {selectionName}
                            value = {option}
                            label={`${option} (+2)`}
                            onChange={this.props.handleChange}
                        />
                        </Form.Group>
                    ))}
                    
                    <Card.Link href={`https://www.13thagesrd.com/${itemNamePlural}/${infoItem}`} target="_blank">Learn more {'>'}</Card.Link>
                </Card.Body>
                </Card>
                );
        } else {return (null)}
        
    }
}

export default InfoCard;
