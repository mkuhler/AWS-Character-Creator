import React from 'react';
import charsheet from './CharSheetData.js';
import { Button, Form, Col, Container, ProgressBar } from 'react-bootstrap';

class CharacterAttributes extends React.Component {

    constructor(charProps) {
        super(charProps)

    }


    render() {
        console.log(this.props.data)

        return (

            <Container>
                <ProgressBar animated now={33} />

                <Form>
                    <Form.Group controlId="character_attributes">
                        <h3>Character Attributes</h3>

                        <Form.Row>
                            <Col xs={3}>
                                <Form.Label>Initiative</Form.Label>
                                <Form.Control type="text"
                                    name="initiative"
                                    value={this.props.data.character_attributes.initiative}
                                    onChange={this.props.handleChange} />
                            </Col>

                            <Col xs={3}>
                                <Form.Label>Initiative Description</Form.Label>
                                <Form.Control type="text"
                                    name="initiative_description"
                                    placeholder= "Level + Dex Mod"
                                    value={this.props.data.character_attributes.initiative_description}
                                    onChange={this.props.handleChange} />
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Col xs={3}>
                                <Form.Label>Hitpoints Max</Form.Label>
                                <Form.Control type="text"
                                    name="hitpoints_max"
                                    value={this.props.data.character_attributes.hitpoints_max}
                                    onChange={this.props.handleChange} />
                            </Col>
                        </Form.Row>
                        <Form.Row>

                            <Col xs={3}>
                                <Form.Label>Armor Class</Form.Label>
                                <Form.Control type="text"
                                    name="armor_class"
                                    value={this.props.data.character_attributes.armor_class}
                                    onChange={this.props.handleChange} />
                            </Col>

                            <Col xs={3}>
                                <Form.Label>Physical Defense</Form.Label>
                                <Form.Control type="text"
                                    name="physical_defense"
                                    value={this.props.data.character_attributes.physical_defense}
                                    onChange={this.props.handleChange} />
                            </Col>

                            <Col xs={3}>
                                <Form.Label>Mental Defense</Form.Label>
                                <Form.Control type="text"
                                    name="mental_defense"
                                    value={this.props.data.character_attributes.mental_defense}
                                    onChange={this.props.handleChange} />
                            </Col>
                        </Form.Row>
                        <br></br>
                        <h3>Saving Throws</h3>

                        <Form.Row>
                            <Col xs={3}>
                                <Form.Label>Easy</Form.Label>
                                <Form.Control type="text"
                                    name="saving_throws_easy"
                                    value={this.props.data.character_attributes.saving_throws_easy}
                                    onChange={this.props.handleChange} />
                            </Col>

                            <Col xs={3}>
                                <Form.Label>Medium</Form.Label>
                                <Form.Control type="text"
                                    name="saving_throws_medium"
                                    value={this.props.data.character_attributes.saving_throws_medium}
                                    onChange={this.props.handleChange} />
                            </Col>

                            <Col xs={3}>
                                <Form.Label>Hard</Form.Label>
                                <Form.Control type="text"
                                    name="saving_throws_hard"
                                    value={this.props.data.character_attributes.saving_throws_hard}
                                    onChange={this.props.handleChange} />
                            </Col>

                            <Col xs={3}>
                                <Form.Label>Optional</Form.Label>
                                <Form.Control type="text"
                                    name="saving_throws_optional"
                                    value={this.props.data.character_attributes.saving_throws_optional}
                                    onChange={this.props.handleChange} />
                            </Col>
                        </Form.Row>
                        <br></br>
                        <Form.Row>
                            <Col xs={3}>
                                <Form.Label>Death Saves Max</Form.Label>
                                <Form.Control type="text"
                                    name="death_saves_max"
                                    value={this.props.data.character_attributes.death_saves_max}
                                    onChange={this.props.handleChange} />
                            </Col>
                        </Form.Row>

                    </Form.Group>
                    <Button style={{ float: "left", marginBottom: 10 }} variant="primary" onClick={this.props.prevStep}>Previous</Button>
                    <Button style={{ float: "right", marginBottom: 10 }} variant="primary" onClick={this.props.nextStep}>Next</Button>
                </Form>
            </Container>
        );
    }
}

export default CharacterAttributes;
