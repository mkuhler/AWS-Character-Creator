import React from 'react';
import {Button, Form, Col} from 'react-bootstrap';
import charsheet from './CharSheetData';

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

            <br></br>
            <h3>Ability Scores</h3>
            <Col xs={5}>
                  <Form.Control as="select" subcategory="class_info" name="class" onChange={this.props.abilityGenMethod}>
                          <option>Rolled/Manual</option>
                          <option>Point Buy</option>
                  </Form.Control>
            </Col>
          <Form.Row>
                <Col xs={2}>
                    <Form.Label>STR</Form.Label>
                    <Form.Control type="text"
                          name="strength"
                          defaultValue={charsheet.ability_scores.strength}
                              onChange={this.props.handleChange} />
                </Col>
                <Col xs={2}>
                    <Form.Label>CON</Form.Label>
                    <Form.Control type="text"
                          name="constitution"
                          defaultValue={charsheet.ability_scores.constitution}
                          onChange={this.props.handleChange} />
                </Col>
                <Col xs={2}>
                    <Form.Label>DEX</Form.Label>
                    <Form.Control type="text"
                          name="dexterity"
                          defaultValue={charsheet.ability_scores.dexterity}
                          onChange={this.props.handleChange} />
                </Col>
                <Col xs={2}>
                    <Form.Label>INT</Form.Label>
                    <Form.Control type="text"
                          name="intelligence"
                          defaultValue={charsheet.ability_scores.intelligence}
                          onChange={this.props.handleChange} />
                </Col>
                <Col xs={2}>
                  <Form.Label>WIS</Form.Label>
                  <Form.Control type="text"
                          name="wisdom"
                          defaultValue={charsheet.ability_scores.wisdom}
                          onChange={this.props.handleChange} />
                </Col>
                <Col xs={2}>
                    <Form.Label>CHA</Form.Label>
                    <Form.Control type="text"
                          name="charisma"
                          defaultValue={charsheet.ability_scores.charisma}
                          onChange={this.props.handleChange} />
                </Col>
            </Form.Row>

            <br></br>
            <Form.Row>
                <Col xs={2}>
                    <Form.Label>--</Form.Label>
                    <Form.Control as="select" onChange={this.props.abilitySelectionHandler}>
                        <option>--</option>
                        <option>STR</option>
                        <option>CON</option>
                        <option>DEX</option>
                        <option>INT</option>
                        <option>WIS</option>
                        <option>CHA</option>
                    </Form.Control>
            </Col>
            <Col xs={2}>
                    <Form.Label>--</Form.Label>
                    <Form.Control as="select" onChange={this.props.abilitySelectionHandler}>
                        <option>--</option>
                        <option>STR</option>
                        <option>CON</option>
                        <option>DEX</option>
                        <option>INT</option>
                        <option>WIS</option>
                        <option>CHA</option>
                    </Form.Control>
            </Col>
            <Col xs={2}>
                    <Form.Label>--</Form.Label>
                    <Form.Control as="select" onChange={this.props.abilitySelectionHandler}>
                        <option>--</option>
                        <option>STR</option>
                        <option>CON</option>
                        <option>DEX</option>
                        <option>INT</option>
                        <option>WIS</option>
                        <option>CHA</option>
                    </Form.Control>
            </Col>
            <Col xs={2}>
                    <Form.Label>--</Form.Label>
                    <Form.Control as="select" onChange={this.props.abilitySelectionHandler}>
                        <option>--</option>
                        <option>STR</option>
                        <option>CON</option>
                        <option>DEX</option>
                        <option>INT</option>
                        <option>WIS</option>
                        <option>CHA</option>
                    </Form.Control>
            </Col>
            <Col xs={2}>
                    <Form.Label>--</Form.Label>
                    <Form.Control as="select" onChange={this.props.abilitySelectionHandler}>
                        <option>--</option>
                        <option>STR</option>
                        <option>CON</option>
                        <option>DEX</option>
                        <option>INT</option>
                        <option>WIS</option>
                        <option>CHA</option>
                    </Form.Control>
            </Col>
            <Col xs={2}>
                    <Form.Label>--</Form.Label>
                    <Form.Control as="select" onChange={this.props.abilitySelectionHandler}>
                        <option>--</option>
                        <option>STR</option>
                        <option>CON</option>
                        <option>DEX</option>
                        <option>INT</option>
                        <option>WIS</option>
                        <option>CHA</option>
                    </Form.Control>
                </Col>
            </Form.Row>
          <Button style={{ width: "100px", marginTop: 20, backgroundColor: "#12A924", marginLeft: 305}}>Roll</Button>
          </Form.Group>
              <Button style={{float:"right"}} variant="primary">Next</Button>
      </Form>
      );

     }


}

export default CharacterDetails;
