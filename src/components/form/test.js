import React from 'react';
import { Form, Col, Container } from 'react-bootstrap';

class Test extends React.Component {
    render() {
        console.log(this.props.data)
        return (
            <Container>
                <Form>
                    <Form.Group controlId="basic_info">
                        <Form.Row>
                            <Col xs={5}>
                                <Form.Label>One Unique Thing</Form.Label>
                                <Form.Control type="text"
                                    name="name"
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
                </Form>
            </Container>


        );
    }
}

export default Test;
