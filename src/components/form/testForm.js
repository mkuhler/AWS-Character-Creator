import React from 'react';
import { Button, Form, Col, Container, ProgressBar, FormControl } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';

class TestForm extends React.Component {
    render() {
        console.log(this.props.data)

        return (

            <Container>
                <ProgressBar animated now={33} />

                <Form>
                    <Form.Group controlId="background_talents">
                        <h3>Character Attributes</h3>

                        <Form.Row>
                            <Col xs={2}>
                                <Form.Label>Initiative</Form.Label>
                                <Form.Control type="text"
                                    name="initiative"
                                    onChange={this.props.handleChange} />
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Col xs={2}>
                                <Form.Label>Hitpoints  Max</Form.Label>
                                <InputGroup className="mb-3" >
                                    <FormControl
                                        type="text"
                                        name="hitpoints_max"
                                        onChange={this.props.handleChange}
                                    />
                                    <InputGroup.Append>
                                        <Button variant="outline-secondary" size="sm">Roll</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Col>
                            <Col xs={2}>
                                <Form.Label>Hitpoints Current</Form.Label>
                                <Form.Control type="text"
                                    name="hitpoints_current"
                                    onChange={this.props.handleChange} />
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col xs={2}>
                                <Form.Label>Physical Defense</Form.Label>
                                <Form.Control type="text"
                                    name="physical_defense"
                                    onChange={this.props.handleChange} />
                            </Col>
                            <Col xs={2}>
                                <Form.Label>Mental Defense</Form.Label>
                                <Form.Control type="text"
                                    name="mental_defense"
                                    onChange={this.props.handleChange} />
                            </Col>
                        </Form.Row>
                        <br></br>
                        <h3>Saving Throws</h3>

                        <Form.Row>
                            <Col xs={2}>
                                <Form.Label>Easy</Form.Label>
                                <Form.Control type="text"
                                    name="saving_throws_easy"
                                    onChange={this.props.handleChange} />
                            </Col>
                            <Col xs={2}>
                                <Form.Label>Medium</Form.Label>
                                <Form.Control type="text"
                                    name="saving_throws_medium"
                                    onChange={this.props.handleChange} />
                            </Col>
                            <Col xs={2}>
                                <Form.Label>Hard</Form.Label>
                                <Form.Control type="text"
                                    name="saving_throws_hard"
                                    onChange={this.props.handleChange} />
                            </Col>
                            <Col xs={2}>
                                <Form.Label>Optional</Form.Label>
                                <Form.Control type="text"
                                    name="saving_throws_optional"
                                    onChange={this.props.handleChange} />
                            </Col>
                        </Form.Row>
                        <br></br>
                        <Form.Row>
                            <Col xs={2}>
                                <Form.Label>Death Saves Max</Form.Label>
                                <Form.Control type="text"
                                    name="death_saves_max"
                                    onChange={this.props.handleChange} />
                            </Col>
                            <Col xs={2}>
                                <Form.Label>Death Saves Current</Form.Label>
                                <Form.Control type="text"
                                    name="death_saves_current"
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

export default TestForm;
