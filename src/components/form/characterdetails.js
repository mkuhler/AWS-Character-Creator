import React from 'react';
import {Button, Form} from 'react-bootstrap';

class CharacterDetails extends React.Component{

//this.props.data.basic_info.name returns Madison

  render() {
      console.log(this.props.data.basic_info);
      return(
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Character Name</Form.Label>
            <Form.Control type="text"
                          name="name"
                          category="basic_info"
                          onChange={this.props.handleChange}/>
            <Form.Label>Race</Form.Label>
            <Form.Control as="select" category="basic_info" subcategory="race_info" name="race" onChange={this.props.handleChange}>
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
          </Form.Group>
        <Button variant="primary">Next</Button>
      </Form>
      );

     }


}

export default CharacterDetails;
