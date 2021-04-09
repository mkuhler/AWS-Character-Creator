import React from 'react';
import charsheet from './CharSheetData.js';
import { Button, Form, Col, Container, ProgressBar } from 'react-bootstrap';
import IconRelationships from "../data/iconrelations.json";

class Powers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            numOfPowers: 1
        };
        this.addOnePower = this.addOnePower.bind(this);
        this.subOnePower = this.subOnePower.bind(this);
        this.createPowers = this.createPowers.bind(this);
    }

    addOnePower() {
        this.setState((prevState) => {
            return {
                ...prevState,
                numOfPowers: prevState.numOfPowers + 1
            }
        })
    }

    subOnePower() {
        if (this.state.numOfPowers > 1) {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    numOfPowers: prevState.numOfPowers - 1
                }
            })
        }
    }

    createPowers() {
        var inputs = []
        for (var i = 0; i < this.state.numOfPowers; i++) {
            inputs.push(
                <>                    <h3>Power {i}</h3>

                    <Form.Row>

                        <Col xs={5}>
                            <Form.Label>Power Name</Form.Label>
                            <Form.Control type="text"
                                name="power_name"
                                arrayindex={i}
                                onChange={this.props.handleChange} />
                        </Col>
                        <Col xs={5}>
                            <Form.Label>Power Frequency</Form.Label>
                            <Form.Control as="select"
                                name="power_frequency"
                                arrayindex={i}
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
                        <Col xs={5}>
                            <Form.Label>Power Action Type</Form.Label>
                            <Form.Control as="select"
                                name="power_frequency"
                                arrayindex={i}
                                onChange={this.props.handleChange}>
                                <option>--</option>
                                <option>Melee Attack</option>
                                <option>Momentum Attack</option>
                                <option>Ranged</option>
                                <option>Standard Action</option>

                            </Form.Control>
                        </Col>
                        <Col xs={5}>
                            <Form.Label>Power Range</Form.Label>
                            <Form.Control type="text"
                                name="power_range"
                                arrayindex={i}
                                onChange={this.props.handleChange} />
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col xs={5}>
                            <Form.Label>Power Target</Form.Label>
                            <Form.Control type="text"
                                name="power_target"
                                arrayindex={i}
                                onChange={this.props.handleChange} />
                        </Col>
                        <Col xs={5}>
                            <Form.Label>Power Attack</Form.Label>
                            <Form.Control type="text"
                                name="power_attack"
                                arrayindex={i}
                                onChange={this.props.handleChange} />
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col xs={2}>
                            <Form.Label>Power Hit</Form.Label>
                            <Form.Control type="text"
                                name="power_hit"
                                arrayindex={i}
                                onChange={this.props.handleChange} />
                        </Col>
                        <Col xs={2}>
                            <Form.Label>Power Miss</Form.Label>
                            <Form.Control type="text"
                                name="power_uses"
                                arrayindex={i}
                                onChange={this.props.handleChange} />
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col xs={5}>
                            <Form.Label>Power Other</Form.Label>
                            <Form.Control type="text"
                                name="power_other"
                                arrayindex={i}
                                onChange={this.props.handleChange} />
                        </Col>
                    </Form.Row>
                </>)
        }
        return inputs
    }

    render() {

        return (

            <Container>
                <Form>
                    <Button variant="outline-success" size="sm" onClick={this.addOnePower}> + </Button>{' '}
                    <Button variant="outline-danger" size="sm" onClick={this.subOnePower}> - </Button>{' '}
                    <Form.Group controlId="power_description">
                        <h3>Background Information Page Three</h3>
                        <br />

                        {this.createPowers()}

                    </Form.Group>

                    <Button style={{ float: "left", marginBottom: 10 }} variant="primary" onClick={this.props.prevStep}>Previous</Button>
                </Form>
            </Container >
        );
    }
}

export default Powers;
