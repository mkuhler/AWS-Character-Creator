import React from 'react';
import { Button, Form, Col, Container } from 'react-bootstrap';

class BackgroundTalents extends React.Component {
    render() {
        console.log(this.props.data)
        return (
            <Container>
                <Form>
                    <Form.Group controlId="background_talents">
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
                                <Form.Label>One Unique Thing</Form.Label>
                                <Form.Control type="text"
                                    name="name"
                                    onChange={this.props.handleChange} />
                            </Col>
                        </Form.Row>
                    </Form.Group>
                    <Button style={{ float: "right", marginBottom: 10 }} variant="primary" onClick={this.props.prevStep}>Previous</Button>

                </Form>
            </Container>


        );
    }
}

export default BackgroundTalents;
