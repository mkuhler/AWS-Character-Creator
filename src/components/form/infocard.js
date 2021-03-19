import React from 'react';
import { Card, Form, Col } from 'react-bootstrap';

class InfoCard extends React.Component{
    render() {
        console.log(this.props.data)
        const itemName = this.props.name
        const infoItem = this.props.data.basic_info.[itemName]
        const selectionName = `${itemName}_bonus_chosen`
        const optionsName = `${itemName}_bonus_options`
        var itemOptions = this.props.data.basic_info.[optionsName]
        var selectedOption = this.props.data.basic_info.[selectionName]
        var itemNamePlural = ""
        var otherBonus = ""
        
        // Adds plural suffix to the itemName for use in the help url
        if (itemName === "class") {
            itemNamePlural = "classes"
            otherBonus = this.props.data.basic_info.race_bonus_chosen
        } else if (itemName === "race") {
            itemNamePlural = "races"
            otherBonus = this.props.data.basic_info.class_bonus_chosen
        }

        var abilityScores = ["Str", "Con", "Dex", "Int", "Wis", "Cha"];
        abilityScores = abilityScores.filter((score) => !itemOptions.includes(score));

        if (infoItem !== "") {
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
                            {(itemOptions && itemOptions.length) ? 
                            (<Col>
                                {itemOptions.map((option, key) => (
                                    (option === otherBonus) 
                                        ? <strong>
                                            <Form.Check 
                                            type = "radio" 
                                            name = {selectionName}
                                            value = {option}
                                            label={`${option} (+2)`}
                                            onChange={this.props.handleChange}
                                            />
                                            </strong>
                                        : 
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
                            </Col>)
                            : (null)
                            } 

                            <Col>
                            {abilityScores.map((abilityScore, key) => (
                                (abilityScore === otherBonus) 
                                ? (<Form.Check 
                                disabled
                                type = "radio" 
                                name = {selectionName}
                                value = {abilityScore}
                                label={`${abilityScore} (+2)`}
                                onChange={this.props.handleChange}
                                />)
                                : (<Form.Check 
                                
                                type = "radio" 
                                name = {selectionName}
                                value = {abilityScore}
                                label={`${abilityScore} (+2)`}
                                onChange={this.props.handleChange}
                                />)
                                
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
