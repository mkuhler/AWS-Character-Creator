import React from 'react';
import { Button, Form, Col, Container, ProgressBar } from 'react-bootstrap';
import IconRelationships from "../data/iconrelations.json";

class Journal extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        official: true,
          mage: false,
          numOfInventory: Math.max(this.props.data.inventory_feats_and_journal.inventory.length, 3),
          numOfMagicItems: Math.max(this.props.data.inventory_feats_and_journal.magic_items.length, 3),
          numOfFeats: Math.max(this.props.data.inventory_feats_and_journal.feats.length, 3),

      };

      this.checkboxChange = this.checkboxChange.bind(this);
      this.addOneInventory = this.addOneInventory.bind(this);
      this.subOneInventory = this.subOneInventory.bind(this);
      this.addOneMagicItems = this.addOneMagicItems.bind(this);
      this.subOneMagicItems = this.subOneMagicItems.bind(this);
      this.createInventoryList = this.createInventoryList.bind(this);
      this.createMagicItemList = this.createMagicItemList.bind(this);
      this.createFeatList = this.createFeatList.bind(this);
      this.addOneFeat = this.addOneFeat.bind(this);
      this.subOneFeat = this.subOneFeat.bind(this);




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




    createInventoryList(){
      var inputs = []
      for(var i = 0; i < this.state.numOfInventory; i++){
        inputs.push(
          <Form.Row>
                <Col xs={12} >
                    <Form.Control name="inventory" type="text" placeholder="Item" arrayindex={i} value={this.props.data.inventory_feats_and_journal.inventory[i]} onChange={this.props.handleChange} />
          </Col>
          </Form.Row>)
        inputs.push()
      }
      return inputs;
    }


    createMagicItemList(){
      var inputs = []
      for(var i = 0; i < this.state.numOfMagicItems; i++){
        inputs.push(
          <Form.Row>
                <Col xs={12} >
                    <Form.Control name="magic_items" type="text" placeholder="Magic item" arrayindex={i} value={this.props.data.inventory_feats_and_journal.magic_items[i]} onChange={this.props.handleChange} />
          </Col>
          </Form.Row>)
        inputs.push()
      }
      return inputs;
    }

    createFeatList() {
        var inputs = []

        for (var i = 0; i < this.state.numOfFeats; i++) {

            inputs.push(
                <Form.Row>
                    <Col xs={12} >
                        <Form.Control name="feats" type="text" placeholder="Feat" arrayindex={i} value={this.props.data.inventory_feats_and_journal.feats[i]} onChange={this.props.handleChange} />
                    </Col>
                </Form.Row>)
            inputs.push()
        }
        return inputs;
    }

    addOneInventory() {
        if (this.state.numOfInventory < 50) {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    numOfInventory: prevState.numOfInventory + 1
                }
            })
        }
    }

    subOneInventory(){
      if(this.state.numOfInventory > 1){
        this.props.data.inventory_feats_and_journal.inventory.pop()
        this.setState((prevState) => {
          return{
            ...prevState,
            numOfInventory: prevState.numOfInventory - 1
          }
        })
      }



    }


    addOneMagicItems() {
        if (this.state.numOfInventory < 30) {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    numOfMagicItems: prevState.numOfMagicItems + 1
                }
            })
        }
    }

    subOneMagicItems(){
      if(this.state.numOfMagicItems > 1){
        this.props.data.inventory_feats_and_journal.magic_items.pop()
        this.setState((prevState) => {
          return{
            ...prevState,
            numOfMagicItems: prevState.numOfMagicItems - 1
          }
        })
      }



    }

    addOneFeat() {
        if (this.state.numOfInventory < 30) {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    numOfFeats: prevState.numOfFeats + 1
                }
            })
        }
    }

    subOneFeat(){
      if(this.state.numOfFeats > 1){
        this.props.data.inventory_feats_and_journal.feats.pop()
        this.setState((prevState) => {
          return{
            ...prevState,
            numOfFeats: prevState.numOfFeats - 1
          }
        })
      }



    }



    render() {

        console.log(this.state.numOfIcons)
        console.log(this.props.data.inventory_feats_and_journal)

        return (
            <Container>


                <Form>
                    <Form.Group controlId="inventory_feats_and_journal">
                        <h3>Inventory & Journal</h3>
                        <br />
                      <Form.Row>
                        <Col xs={3}>
                          <Form.Label>Inventory</Form.Label>
                        </Col>
                        <Col>
                          <Button variant="outline-success" size="sm" onClick={this.addOneInventory}> + </Button>{' '}
                          <Button variant="outline-danger" size="sm" onClick={this.subOneInventory}> - </Button>{' '}
                        </Col>
                        <Col xs={12}>
                            {this.createInventoryList()}
                        </Col>
                        </Form.Row>

                        <hr />

                      <Form.Row>
                      <Col xs={3}>
                        <Form.Label>Magic Items</Form.Label>
                      </Col>
                      <Col>
                        <Button variant="outline-success" size="sm" onClick={this.addOneMagicItems}> + </Button>{' '}

                        <Button variant="outline-danger" size="sm" onClick={this.subOneMagicItems}> - </Button>{' '}

                      </Col>
                      </Form.Row>
                        {this.createMagicItemList()} 
                        <hr />
                        <Form.Row>

                            <Col xs={12}>
                          <Form.Label>Journal & Background Story</Form.Label>
                          <Form.Control as="textarea" rows={3}
                                name="journal_and_background_story"
                                value={this.props.data.inventory_feats_and_journal.journal_and_background_story}
                                    onChange={this.props.handleChange} />
                            </Col>
                        </Form.Row>

                        <hr />
                        <Form.Row>

                        <Col xs={3}>
                          <Form.Label>Feats</Form.Label>
                        </Col>
                        <Col>
                          <Button variant="outline-success" size="sm" onClick={this.addOneFeat}> + </Button>{' '}

                          <Button variant="outline-danger" size="sm" onClick={this.subOneFeat}> - </Button>{' '}

                        </Col>
                        </Form.Row>

                          {this.createFeatList()}

                    </Form.Group>
                    <Button style={{ float: "left", marginBottom: 10 }} variant="primary" onClick={this.props.prevStep}>Previous</Button>
                    <Button style={{ float: "right", marginBottom: 10 }} variant="primary" onClick={this.props.nextStep}>Next</Button>
                </Form>
            </Container>
        );
    }
}

export default Journal;
