import React from 'react';
import CharacterDetails from './characterdetails.js';

import charsheet from './CharSheetData.js';
//import the rest of form components

class MasterForm extends React.Component{
  constructor(props){
    super(props);

    this.state={
      step: 1,
      data: charsheet
    };
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

  handleChange = input => event => {
    this.setState({ [input ]  : event.target.value })
  }

  render(){

      const {step} = this.state;
      switch(step){
        case 1:
          return <CharacterDetails
                  nextStep = {this.nextStep}
                  handleChange = {this.handleChange}
                  data = {this.state.data}/>
        // case 2:
        //   return <Test
        //           nextStep = {this.nextStep}
        //           handleChange = {this.handleChange}
        //           data = {this.state.data}
        //           />

                }




  }
}

export default MasterForm;
