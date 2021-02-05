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
      step: step - 1

    })
  }


  handleChange(event){
    const{name, value} = event.target
    //Custom attributes need to be grabbed from the DOM api
    const category = event.target.id
    const subcategory = event.target.getAttribute('subcategory')

    if(subcategory != null){
      this.state.data.[category].[subcategory].[name] = value
    }else{
      this.state.data.[category].[name] = value
    }
    console.log(event.target.id)

    //console.log(subcategory)
    //console.log(category)
    //this.state.data.[category].[name] = value
    console.log(this.state.data.basic_info)
  }






  render(){

      const {step} = this.state;
      switch(step){
        case 1:
          return <CharacterDetails
                  nextStep = {this.nextStep}
                  handleChange = {this.handleChange}
                  data = {this.state.data}
                  />
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
