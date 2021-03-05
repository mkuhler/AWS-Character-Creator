import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import gamedata from './data.js';
import InfoCard from './infocard.js';
import CharacterDetails from './characterdetails.js';
import PrintPDF from "./PrintPDF.js";
import charsheet from './CharSheetData.js';
import CharacterAttributes from './characterattributes.js';
import BackgroundTalents from './backgroundtalents.js';


//import the rest of form components

class MasterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      data: charsheet
    };

    this.handleChange = this.handleChange.bind(this)

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

    if (subcategory != null) {
      this.state.data.[category].[subcategory].[name] = value
    } else {
      this.state.data.[category].[name] = value

      //Calculate modifiers based on ability score ranges
      if (category == "ability_scores") {
        var modName = name + "_mod"
        var modValue = Math.floor((this.state.data.[category].[name] - 10) / 2)

        this.state.data.[category].[modName] = modValue
      }
      this.forceUpdate()
    }

    if (name == "class") {
      const class_list = gamedata.classes
      var result = class_list.find(game_class => {
        if(game_class.name === value) {
          this.state.data.[category].class_bonus_options = game_class.class_bonus
          console.log(game_class.class_bonus)
        }
      })
    } 

    // console.log(event.target.id)

    //console.log(subcategory)
    //console.log(category)
    //this.state.data.[category].[name] = value
    // console.log(this.state.data.basic_info)
    // console.log(this.state.data.character_attributes)
    // console.log(this.state.data.ability_scores)
  }


  render() {
    const { step } = this.state;
    switch (step) {
      case 1:
        return <Container>
          <Row>

            <Col xs={8}>
              <CharacterDetails
                nextStep={this.nextStep}
                handleChange={this.handleChange}
                data={this.state.data}
              />
            </Col>
            <Col xs={4}>
              <InfoCard data={this.state.data} />
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

    }
  }
}

export default MasterForm;
