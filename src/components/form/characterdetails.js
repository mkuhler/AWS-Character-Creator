import React from 'react';
import {Button, Form} from 'react-bootstrap';

class CharacterDetails extends React.Component{

//this.props.data.basic_info.name returns Madison

  render() {
      console.log(this.props.data.basic_info);
      return(
        <Form>
          <Form.Group controlId="basic_info">
            <Form.Label>Character Name</Form.Label>
            <Form.Control type="text"
                          name="name"
                          onChange={this.props.handleChange}/>
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

            <Form.Label>Level</Form.Label>
            <Form.Control type="text"
                          name="level"
                          placeholder="1"
                          onChange={this.props.handleChange}/>
          </Form.Group>
        <Button variant="primary">Next</Button>
      </Form>
      );

     }


}

export default CharacterDetails;
