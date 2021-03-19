import React from 'react';
import { Card, Form, Col } from 'react-bootstrap';

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

        var abilityScores = ["Str", "Con", "Dex", "Int", "Wis", "Cha"];
        abilityScores = abilityScores.filter((score) => !itemOptions.includes(score));

        console.log(abilityScores);

        if (infoItem != "") {
            return(
                <Card>
                <Card.Body>
                    <Card.Title>{infoItem}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{this.props.name}</Card.Subtitle>
                    <hr />
                    <Card.Text>
                    For this {itemName}, you recieve a bonus to an ability score (standard bonuses are bold). Please select your {itemName} bonus:
                    </Card.Text>
                    
                    <Form.Group controlId="basic_info">
                        <Form.Row>
                            <Col>
                            {itemOptions.map((option, key) => (
                                <strong>
                                <Form.Check 
                                type = "radio" 
                                name = {selectionName}
                                value = {option}
                                label={`${option} (+2)`}
                                onChange={this.props.handleChange}
                                />
                                </strong>
                            ))}
                            </Col>

                            <Col>
                            {abilityScores.map((abilityScore, key) => (
                                <Form.Check 
                                type = "radio" 
                                name = {selectionName}
                                value = {abilityScore}
                                label={`${abilityScore} (+2)`}
                                onChange={this.props.handleChange}
                                />
                            ))} 
                            </Col>
                        </Form.Row>
                    
                                 
                    </Form.Group>
                    <Card.Link href={`https://www.13thagesrd.com/${itemNamePlural}/${infoItem}`} target="_blank">Learn more {'>'}</Card.Link>
                </Card.Body>
                </Card>
                );
        } else {return (null)}
        
    }
}

export default InfoCard;
