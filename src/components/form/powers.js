import React from 'react';
import charsheet from './CharSheetData.js';
import { Button, Form, Col, Container, ProgressBar } from 'react-bootstrap';
import powerdata from "../data/powerdata.json";
import powerobj from './PowerObjectData.js';


class Powers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          //  numOfPowers: Math.max(this.props.data.power_description.power_name.length, 2),
          numOfPowers: 1
        };
        this.addOnePower = this.addOnePower.bind(this);
        this.subOnePower = this.subOnePower.bind(this);
        this.createPowers = this.createPowers.bind(this);
        //this.powerHandleChange = this.powerHandleChange.bind(this);
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
                <>
                <br/>
                <h5>Power {i+1} </h5>
                    <Form.Row>
                        <Col xs={5}>
                            <Form.Label>Power Name</Form.Label>
                            <Form.Control type="text"
                                name="power_name"
                                arrayindex={i}
                                value={this.props.data.power}
                                onChange={this.props.handleChange} />
                        </Col>

                    </Form.Row>

                    <Form.Row>
                        <Col xs={5}>
                            <Form.Label>Power Frequency 1</Form.Label>
                            <Form.Control type="text"
                                name="power_frequency_1"
                                //value={this.props.data.power_description.power_frequency_1[i]}
                                arrayindex={i}
                                onChange={this.props.handleChange}
                                list ="frequency"
                                />


                        </Col>

                        <Col xs={2}>
                            <Form.Label>Power Uses 1</Form.Label>
                            <Form.Control type="text"
                                name="power_uses_1"
                                //value={this.props.data.power_description.power_uses_1[i]}
                                arrayindex={i}
                                onChange={this.props.handleChange} />
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col xs={5}>
                            <Form.Label>Power Frequency 2</Form.Label>
                            <Form.Control type="select"
                                name="power_frequency_2"
                                arrayindex={i}
                              //  value={this.props.data.power_description.power_frequency_2[i]}
                                onChange={this.props.handleChange}
                                list="frequency"/>



                        </Col>

                        <Col xs={2}>
                            <Form.Label>Power Uses 2</Form.Label>
                            <Form.Control type="text"
                                name="power_uses_2"
                                arrayindex={i}
                              //  value={this.props.data.power_description.power_uses_2[i]}
                                onChange={this.props.handleChange} />
                        </Col>
                    </Form.Row>

                     <Form.Row>
                        <Col xs={5}>
                            <Form.Label>Power Action Type</Form.Label>
                            <Form.Control type="text"
                                name="power_action_type"
                                arrayindex={i}
                              //  value = { this.props.data.power_description.power_action_type[i] }
                                onChange={this.props.handleChange}
                                list = "action_type" />

                        </Col>
                        <Col xs={5}>
                            <Form.Label>Power Range</Form.Label>
                            <Form.Control type="text"
                                name="power_range"
                                //value = { this.props.data.power_description.power_range[i] }
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
                              //  value = { this.props.data.power_description.power_target[i] }
                                onChange={this.props.handleChange} />
                        </Col>
                        <Col xs={5}>
                            <Form.Label>Power Attack</Form.Label>
                            <Form.Control type="text"
                                name="power_attack"
                              //  value = { this.props.data.power_description.power_attack[i] }
                                arrayindex={i}
                                onChange={this.props.handleChange} />
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col xs={2}>
                            <Form.Label>Power Hit</Form.Label>
                            <Form.Control type="text"
                                name="power_hit"
                              //  value = { this.props.data.power_description.power_hit[i] }
                                arrayindex={i}
                                onChange={this.props.handleChange} />
                        </Col>
                        <Col xs={2}>
                            <Form.Label>Power Miss</Form.Label>
                            <Form.Control type="text"
                                name="power_miss"
                              //  value = { this.props.data.power_description.power_miss[i] }
                                arrayindex={i}
                                onChange={this.props.handleChange} />
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col xs={5}>
                            <Form.Label>Power Other</Form.Label>
                            <Form.Control type="text"
                                name="power_other"
                              //  value = { this.props.data.power_description.power_other[i] }
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
                <br />
                    <h3>Powers</h3>
                    <text>Leave Frequencies or Uses blank if not applicable</text>
                    <br />
                <Button variant="outline-success" size="sm" onClick={this.addOnePower}> + </Button>{' '}
                <Button variant="outline-danger" size="sm" onClick={this.subOnePower}> - </Button>{' '}
                    <Form.Group controlId="power_description">
                        {console.log("Power obj:")}
                        {console.log(powerobj)}

                        {this.createPowers()}
                        <datalist name ="frequency" id="frequency">
                          {powerdata.frequency.map((frequency) =>
                            <option key={frequency} value={frequency}></option>
                          )}
                        </datalist>

                        <datalist name ="action_type" id="action_type">
                          {powerdata.action_type.map((action_type) =>
                            <option key={action_type} value={action_type}></option>
                          )}
                        </datalist>

                    </Form.Group>

                    <Button style={{ float: "left", marginBottom: 10 }} variant="primary" onClick={this.props.prevStep}>Previous</Button>
                </Form>
            </Container >
        );
    }
}


                    // for the other approach to powers, replace the "power description" block of text with this
                    // probably make action types a data list to allow for mosre options or custom options

                    // <Form.Row>
                    //    <Col xs={5}>
                    //        <Form.Label>Power Action Type</Form.Label>
                    //        <Form.Control as="select"
                    //            name="power_action_type"
                    //            arrayindex={i}
                    //            value = { this.props.data.power_description.power_action_type[i] }
                    //            onChange={this.props.handleChange}>
                    //            <option>--</option>
                    //            <option>Melee Attack</option>
                    //            <option>Momentum Attack</option>
                    //            <option>Ranged</option>
                    //        </Form.Control>
                    //    </Col>
                    //    <Col xs={5}>
                    //        <Form.Label>Power Range</Form.Label>
                    //        <Form.Control type="text"
                    //            name="power_range"
                    //            value = { this.props.data.power_description.power_range[i] }
                    //            arrayindex={i}
                    //            onChange={this.props.handleChange} />
                    //    </Col>
                    //</Form.Row>

                    //<Form.Row>
                    //    <Col xs={5}>
                    //        <Form.Label>Power Target</Form.Label>
                    //        <Form.Control type="text"
                    //            name="power_target"
                    //            arrayindex={i}
                    //            value = { this.props.data.power_description.power_target[i] }
                    //            onChange={this.props.handleChange} />
                    //    </Col>
                    //    <Col xs={5}>
                    //        <Form.Label>Power Attack</Form.Label>
                    //        <Form.Control type="text"
                    //            name="power_attack"
                    //            value = { this.props.data.power_description.power_attack[i] }
                    //            arrayindex={i}
                    //            onChange={this.props.handleChange} />
                    //    </Col>
                    //</Form.Row>

                    //<Form.Row>
                    //    <Col xs={2}>
                    //        <Form.Label>Power Hit</Form.Label>
                    //        <Form.Control type="text"
                    //            name="power_hit"
                    //            value = { this.props.data.power_description.power_hit[i] }
                    //            arrayindex={i}
                    //            onChange={this.props.handleChange} />
                    //    </Col>
                    //    <Col xs={2}>
                    //        <Form.Label>Power Miss</Form.Label>
                    //        <Form.Control type="text"
                    //            name="power_miss"
                    //            value = { this.props.data.power_description.power_miss[i] }
                    //            arrayindex={i}
                    //            onChange={this.props.handleChange} />
                    //    </Col>
                    //</Form.Row>

                    //<Form.Row>
                    //    <Col xs={5}>
                    //        <Form.Label>Power Other</Form.Label>
                    //        <Form.Control type="text"
                    //            name="power_other"
                    //            value = { this.props.data.power_description.power_other[i] }
                    //            arrayindex={i}
                    //            onChange={this.props.handleChange} />
                    //    </Col>
                    // </Form.Row>




                    // Or, to have powers just use one large text box rather than individual ones, use this

                    //<Form.Row>
                    //    <Form.Label>Power Description</Form.Label>
                    //    <Form.Control as="textarea" rows={3}
                    //        name="power_text"
                    //        arrayindex={i}
                    //        value={this.props.data.power_description.power_text[i]}
                    //        onChange={this.props.handleChange} />
                    //</Form.Row>




export default Powers;
