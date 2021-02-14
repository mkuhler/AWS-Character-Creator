import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import InfoCard from './infocard.js';
import BackgroundTalents from './background_talents.js';
import CharacterDetails from './characterdetails.js';
import PrintPDF from "./PrintPDF.js";
import charsheet from './CharSheetData.js';
//import the rest of form components

class MasterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      data: charsheet
    };

    this.handleChange = this.handleChange.bind(this)
    console.log(this.state.step)


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
      step: step - 1

    })
  }

  helloWorld(componentName) {
    console.log("This is the " + componentName)
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
    }
    console.log(event.target.id)

    //console.log(subcategory)
    //console.log(category)
    //this.state.data.[category].[name] = value
    console.log(this.state.data.background_talents)
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
                helloWorld={this.helloWorld}
              />
            </Col>
            <Col xs={4}>
              <InfoCard data={this.state.data.basic_info.class_info} />
            </Col>
            <PrintPDF
              data={this.state.data}
            />
          </Row>

        </Container>
      case 2:
        return <BackgroundTalents
          nextStep={this.nextStep}
          prevStep={this.prevStep}
          handleChange={this.handleChange}
          data={this.state.data}
          helloWorld={this.helloWorld}
        />

    }
  }
}

export default MasterForm;
