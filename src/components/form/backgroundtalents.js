import React from 'react';
import charsheet from './CharSheetData.js';
import { Button, Form, Col, Container, ProgressBar } from 'react-bootstrap';
import IconRelationships from "../data/iconrelations.json";

class BackgroundTalents extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        official: true,
        mage: false,
        numOfIcons: 3

      };

      this.checkboxChange = this.checkboxChange.bind(this);
      this.createList = this.createList.bind(this);
      this.addOneIcon = this.addOneIcon.bind(this);
      this.subOneIcon = this.subOneIcon.bind(this);




    }




    checkboxChange(event){


      console.log(event.target.id + " checkbox was clicked");
      console.log(event.target.id + " is " + event.target.checked)
      this.setState((prevState) => {
        return{
          ...prevState,
          [event.target.id]: !this.state.[event.target.id]
        }
      })

      console.log(event.target.id + " is " + event.target.checked)


    }

    createList(){
      let options = [];
      if(this.state.official == true){
        for(var i = 0; i < IconRelationships.official.length; i++){
          var value = IconRelationships.official[i];
          options.push(<option key={options.length + 1} value={value}>{value}</option>);
        }
      }
      if(this.state.mage == true){

        for(var i = 0; i < IconRelationships.magelist.length; i++){
          var value = IconRelationships.magelist[i];
          options.push(<option key={options.length + 1} value={value}>{value}</option>);
        }
      }




      return options;
    }


    createDropDown(){
      var inputs = []
      for(var i = 0; i < this.state.numOfIcons; i++){
        inputs.push(
          <Form.Row>
                <Col xs={5} >
                    <Form.Control name="icon_relationship_names" type="text" arrayindex={i} list="icon_relationships" value={this.props.data.background_talents.icon_relationship_names[i]} onChange={this.props.handleChange} />
          </Col>
          <Col xs = {2}>
                    <Form.Control name="icon_relationship_points" type="text" arrayindex={i} value={this.props.data.background_talents.icon_relationship_points[i]} onChange={this.props.handleChange} />
          </Col>
          <Col xs = {5}>
                    <Form.Control name="icon_relationship_statuses" type="text" arrayindex={i} value={this.props.data.background_talents.icon_relationship_statuses[i]} onChange={this.props.handleChange}/>
          </Col>
          </Form.Row>)

        inputs.push()
      }
      return inputs;
    }

    addOneIcon() {
        if (this.state.numOfIcons < 10) {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    numOfIcons: prevState.numOfIcons + 1
                }
            })
        }
    }

    subOneIcon(){
      if(this.state.numOfIcons > 1){
        this.setState((prevState) => {
          return{
            ...prevState,
            numOfIcons: prevState.numOfIcons - 1
          }
        })
      }



    }



    render() {

        console.log(this.props.data.background_talents)

        return (
            <Container>


                <Form>
                    <Form.Group controlId="background_talents">
                        <h3>Background Information</h3>
                        <br />
                        <Form.Row>
                        <Col xs = {2}>
                          <Form.Group controlId="official" >
                            <Form.Check type="checkbox" label="Official" checked={this.state.official} onChange={this.checkboxChange}/>
                          </Form.Group>
                        </Col>

                          <Form.Group controlId="mage">
                            <Form.Check type="checkbox" label="Community List" checked={this.state.magelist} onChange={this.checkboxChange}/>
                          </Form.Group>
                        </Form.Row>
                        <Form.Row>
                        <Col xs={3}>
                          <Form.Label>Icon Relationship</Form.Label>
                        </Col>
                        <Col>
                          <Button variant="outline-success" size="sm" onClick={this.addOneIcon}> + </Button>{' '}

                          <Button variant="outline-danger" size="sm" onClick={this.subOneIcon}> - </Button>{' '}
                        </Col>
                        </Form.Row>



                                {this.createDropDown()}
                                <datalist name="icon_relationships" id="icon_relationships">


                                {this.createList()}
                                </datalist>





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
                    <Button style={{ float: "right", marginBottom: 10 }} variant="primary" onClick={this.props.nextStep}>Next</Button>
                </Form>
            </Container>
        );
    }
}

export default BackgroundTalents;
