import React from 'react';
import charsheet from './CharSheetData.js';
import { Button, Form, Col, Container, ProgressBar } from 'react-bootstrap';
import IconRelationships from "../data/iconrelations.json";

class Powers extends React.Component {



    render() {

        return (
            <Container>
                <Form>
                    <Form.Group controlId="background_talents">
                        <h3>Background Information Page Three</h3>
                        <br />
                        <Form.Row>
                            <Col xs={5}>
                                <Form.Label>Power Name</Form.Label>
                                <Form.Control type="text"
                                    name="power_name"
                                    onChange={this.props.handleChange} />
                            </Col>
                            <Col xs={5}>
                                <Form.Label>Power Frequency</Form.Label>
                                <Form.Control as="select"
                                    name="power_frequency"
                                    onChange={this.props.handleChange}>
                                    <option>--</option>
                                    <option>At-Will</option>
                                    <option>Cyclical</option>
                                    <option>Battle-Based</option>
                                    <option>Recharge</option>
                                    <option>Daily</option>
                                    <option>Other</option>
                                </Form.Control>
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Col xs={10}>
                                <Form.Label>Power Description</Form.Label>
                                <Form.Control type="text"
                                    name="power_description"
                                    onChange={this.props.handleChange} />
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Col xs={5}>
                                <Form.Label>Power Action Type</Form.Label>
                                <Form.Control type="text"
                                    name="power_action_type"
                                    onChange={this.props.handleChange} />
                            </Col>
                            <Col xs={5}>
                                <Form.Label>Power Range</Form.Label>
                                <Form.Control type="text"
                                    name="power_range"
                                    onChange={this.props.handleChange} />
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Col xs={5}>
                                <Form.Label>Power Target</Form.Label>
                                <Form.Control type="text"
                                    name="power_target"
                                    onChange={this.props.handleChange} />
                            </Col>
                            <Col xs={5}>
                                <Form.Label>Power Attack</Form.Label>
                                <Form.Control type="text"
                                    name="power_attack"
                                    onChange={this.props.handleChange} />
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Col xs={5}>
                                <Form.Label>Power Hit</Form.Label>
                                <Form.Control type="text"
                                    name="power_hit"
                                    onChange={this.props.handleChange} />
                            </Col>
                            <Col xs={5}>
                                <Form.Label>Power Miss</Form.Label>
                                <Form.Control type="text"
                                    name="power_uses"
                                    onChange={this.props.handleChange} />
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Col xs={5}>
                                <Form.Label>Power Other</Form.Label>
                                <Form.Control type="text"
                                    name="power_other"
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

export default Powers;
