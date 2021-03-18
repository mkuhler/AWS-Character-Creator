import React from 'react';
import charsheet from './CharSheetData.js';
import { Button, Form, Col, Container, ProgressBar } from 'react-bootstrap';

class BackgroundTalents extends React.Component {
    render() {
        console.log(this.props.data)
        return (
            <Container>
                <ProgressBar animated now={66} />

                <Form>
                    <Form.Group controlId="background_talents">
                        <h3>Background Information Page Three</h3>
                        <Form.Row>
                            <Col xs={5}>
                                <Form.Label>Icon Relationship</Form.Label>
                                <Form.Control as="select" name="icon_relationships" onChange={this.props.handleChange}>
                                    <option>Mageflame</option>
                                    <option>Conqueror</option>
                                    <option>Tempter</option>
                                    <option>Lord of the Forge</option>
                                    <option>Elven Court</option>
                                    <option>Ivory Throne</option>
                                    <option>Gatekeeper</option>
                                    <option>Wildwalker</option>
                                    <option>Deathless One</option>
                                    <option>Devourer</option>
                                    <option>Godspeaker</option>
                                    <option>Faceless</option>
                                    <option>Council of Scales</option>
                                    <option>Dweller Below</option>


                                    <option>Archmage</option>
                                    <option>Crusader</option>
                                    <option>Diabolist</option>
                                    <option>Dwarf King</option>
                                    <option>Elf Queen</option>
                                    <option>Emperor</option>
                                    <option>Great Gold Wyrm</option>
                                    <option>High Druid</option>
                                    <option>Lich King</option>
                                    <option>Orc Lord</option>
                                    <option>Priestess</option>
                                    <option>Prince of Shadows</option>
                                    <option>The Three</option>

                                </Form.Control>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col xs={5}>
                                <Form.Label>One Unique Thing</Form.Label>
                                <Form.Control type="text"
                                    name="one_unique_thing"
                                    value={this.props.data.background_talents.one_unique_thing}
                                    onChange={this.props.handleChange} />
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Col xs={5}>
                                <Form.Label>Feature Name</Form.Label>
                                <Form.Control type="text"
                                    //not sure of what name yet
                                    name="featName"
                                    onChange={this.props.handleChange} />
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col xs={5}>
                                <Form.Label>Feature Description</Form.Label>
                                <Form.Control type="text"
                                    //not sure what name yet either
                                    name="featDescription"
                                    onChange={this.props.handleChange} />
                            </Col>
                        </Form.Row>
                    </Form.Group>
                    <Button style={{ float: "left", marginBottom: 10 }} variant="primary" onClick={this.props.prevStep}>Previous</Button>
                </Form>
            </Container>
        );
    }
}

export default BackgroundTalents;
