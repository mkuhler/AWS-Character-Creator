import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import gamedata from './data.js';
import InfoCard from './infocard.js';
import CharacterDetails from './characterdetails.js';
import PrintPDF from "./PrintPDF.js";
import charsheet from './CharSheetData.js';
import CharacterAttributes from './characterattributes.js';
import BackgroundTalents from './backgroundtalents.js';
import Journal from './journal.js';


//import the rest of form components

class MasterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      data: charsheet
    };

  this.handleChange = this.handleChange.bind(this)
  this.dataChange = this.dataChange.bind(this)

  }

  nextStep = () => {
    const { step } = this.state
    this.setState({
      step: step + 1,
      data: charsheet
    })
  }

  prevStep = () => {
    const { step } = this.state
    this.setState({
      step: step - 1,
      data: charsheet

    })
  }


  handleChange(event) {
    const { name, value } = event.target
    //Custom attributes need to be grabbed from the DOM api
    const category = event.target.id
    const subcategory = event.target.getAttribute('subcategory')
    const arrayindex = event.target.getAttribute('arrayindex')

    if (subcategory != null) {
      this.state.data.[category].[subcategory].[name] = value
    } else if(arrayindex != null){
      this.state.data.[category].[name].[arrayindex] = value
    }else {
      this.state.data.[category].[name] = value
    }
    this.forceUpdate()

    if (name == "class") {
      const class_list = gamedata.classes
      var result = class_list.find(game_class => {
        if(game_class.name === value) {
          this.state.data.[category].class_bonus_options = game_class.class_bonus
          console.log(game_class.class_bonus)
        }
      })
    }

    if (name == "race") {
      const race_list = gamedata.races
      var result = race_list.find(game_race => {
        if(game_race.name === value) {
          this.state.data.[category].race_bonus_options = game_race.race_bonus
          console.log(game_race.race_bonus)
        }
      })
    }
    // console.log(event.target.id)
    //console.log(subcategory)
    //console.log(category)
    //this.state.data.[category].[name] = value
    console.log(this.state.data.basic_info)
    // console.log(this.state.data.character_attributes)
    // console.log(this.state.data.ability_scores)
  }







  //Literally only updates ability score values for backend
  dataChange(value){
    var data = {...this.state.data}
    data.ability_scores = value
    this.setState({data})
    this.state.data.ability_scores = value

    console.log(this.state.data.ability_scores)
  }

  //Function that takes in an event to check if its value contains only numerical input
  //returns true if it contains on numbers and calls handleChange to handle backend changes
  onlyNum = (event) => {
    const re = /^[0-9\b]+$/;

    //checks if value is blank and then checks if the value contains only numerical input
    if (event.target.value === '' || re.test(event.target.value)) {
      event.value = "test"
      console.log(event.value)
      console.log(event.target.value)
      this.handleChange(event)
      return true
    }
    else
      return false
  }

  render() {
    const { step } = this.state;
    switch (step) {
      case 1:
        return <Container>
          <Row>

            <Col xs={8}>
              <CharacterDetails
                nextStep = {this.nextStep}
                handleChange = {this.handleChange}
                dataChange = {this.dataChange}
                data = {this.state.data}
                onlyNum = {this.onlyNum}
                />
            </Col>
            <Col xs={4}>
              <InfoCard
                data={this.state.data}
                name= "class"
                handleChange={this.handleChange}
              />
              <InfoCard
                data={this.state.data}
                name= "race"
                handleChange={this.handleChange}
              />
            </Col>
            <PrintPDF
              data={this.state.data}
            />
          </Row>

        </Container>
      case 2:
        <h3>Background Information Page Two</h3>
        return <Container>
          <Row>

            <Col xs={10}>
              <CharacterAttributes
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                handleChange={this.handleChange}
                data={this.state.data}
              />
            </Col>
            <PrintPDF
              data={this.state.data}
            />
          </Row>

        </Container>
      case 3:
        <h3>Background Information Page Three</h3>
        return <Container>
          <Row>

            <Col xs={10}>
              <BackgroundTalents
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                handleChange={this.handleChange}
                data={this.state.data}
              />
            </Col>
            <PrintPDF
              data={this.state.data}
            />
          </Row>

        </Container>

      case 4:
        <h3> Inventory & Journal </h3>
        return <Container>
          <Row>

            <Col xs={10}>
              <Journal
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                handleChange={this.handleChange}
                data={this.state.data}
              />
            </Col>
            <PrintPDF
              data={this.state.data}
            />
          </Row>

        </Container>

    }
  }
}

export default MasterForm;
