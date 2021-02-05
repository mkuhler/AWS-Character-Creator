import React from 'react';
import {Button, Form, Col} from 'react-bootstrap';

class CharacterDetails extends React.Component{

//this.props.data.basic_info.name returns Madison

  render() {
      console.log(this.props.data.basic_info);
      return(
        <Form>
          <Form.Group controlId="basic_info">
            <h3>Basic Information</h3>
            <Form.Row>
              <Col xs={5}>
                <Form.Label>Character Name</Form.Label>
                <Form.Control type="text"
                            name="name"
                            onChange={this.props.handleChange}/>
              </Col>
              <Col xs={5}>
                <Form.Label>Race</Form.Label>
                <Form.Control as="select" subcategory="race_info" name="race" onChange={this.props.handleChange}>
                  <option>Alleykin</option>
                  <option>Arcanite</option>
                  <option>Beastblooded</option>
                  <option>Dark Elf</option>
                  <option>Dragonic/Dragonspawn</option>
                  <option>Dwarf</option>
                  <option>Forgeborn/Dwarf-forged</option>
                  <option>Gnome</option>
                  <option>Half-elf</option>
                </Form.Control>
              </Col>
            </Form.Row>
            
            <Form.Row>
              <Col xs={5}>
                <Form.Label>Class</Form.Label>
                <Form.Control as="select" subcategory="class_info" name="class" onChange={this.props.handleChange}>
                  <option>Barbarian</option>
                  <option>Bard</option>
                  <option>Cleric</option>
                  <option>Fighter</option>
                  <option>Paladin</option>
                  <option>Dwarf</option>
                  <option>Ranger</option>
                  <option>Rogue</option>
                  <option>Sorcerer</option>
                  <option>Wizard</option>
                </Form.Control>
              </Col>
              <Col xs={5}>
                <Form.Label>Level</Form.Label>
                <Form.Control type="text"
                            name="level"
                            placeholder="1"
                            onChange={this.props.handleChange}/>
              </Col>
            </Form.Row>
            <Form.Row>

              <Col xs={2}>
                <Form.Label>Height</Form.Label>
                <Form.Control type="text"
                              name="height"
                              onChange={this.props.handleChange}/>
              </Col>

              <Col xs={2}>
                <Form.Label>Weight</Form.Label>
                <Form.Control type="text"
                                name="weight"
                                onChange={this.props.handleChange}/>
              </Col>

              <Col xs={2}>
                <Form.Label>Age</Form.Label>
                <Form.Control type="text"
                                  name="age"
                                  onChange={this.props.handleChange}/>
              </Col>

              <Col xs={2}>
                <Form.Label>Gender</Form.Label>
                <Form.Control type="text"
                                  name="gender"
                                  onChange={this.props.handleChange}/>
              </Col>
            </Form.Row>
          </Form.Group>
        <Button variant="primary">Next</Button>
      </Form>
      );

     }


}

export default CharacterDetails;
