import React from 'react';
import { Button, Form, Col, Container, ProgressBar } from 'react-bootstrap';

class TestForm extends React.Component {
    render() {
        console.log(this.props.data)

        return (

            <Container>
                <ProgressBar animated now={33} />

                <Form>
                    <Form.Group controlId="background_talents">
                        <h3>Background Information Page Two</h3>

                        <Form.Row>
                            <Col xs={5}>
                                <Form.Label>One Unique Thing</Form.Label>
                                <Form.Control type="text"
                                    name="one_unique_thing"
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
                    <Button style={{ float: "right", marginBottom: 10 }} variant="primary" onClick={this.props.nextStep}>Next</Button>
                </Form>
            </Container>
        );
    }
}

export default TestForm;
