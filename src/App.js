import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect, Component} from 'react';
import { jsPDF } from 'jspdf';
import charsheet from './CharSheetData';
import charClassData from './data';

class Step1 extends React.Component {
  render() {
    if (this.props.currentStep !== 1){
      return null
    }
    console.log(this.props.charSheet.name);
    return(
        <form onSubmit={this.props.nextStep}>
            <label>{this.props.charSheet.basic_info.name}</label>
        <input type='text' onChange={this.props.updateCharsheet}/>

        <input type='submit' value='Next'/>
      </form>
      
    )}
};

class Step2 extends React.Component {
  render() {
    if (this.props.currentStep !== 2){
      return null
    }
    return(
      <form onSubmit={this.props.nextStep}>
        <label>{this.props.charSheet.name}</label>
      </form>
  )}
};

class CharCreatorForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { currentStep : 1 }
  }
  nextStep = () => {
    this.setState(prevState => {
       return { currentStep: prevState.currentStep + 1 }
    })
}

  render() {
    console.log(this.props.charSheet);
    return (
      <div>
        <Step1 
          charSheet = {this.props.charSheet} 
          updateCharsheet = {this.props.updateName} 
          nextStep={this.nextStep}
          currentStep={this.state.currentStep} />
        <Step2 
          charSheet = {this.props.charSheet} 
          updateCharsheet = {this.props.updateName} 
          nextStep={this.nextStep}
          currentStep={this.state.currentStep} />
      </div>
  )}
};

class App extends Component {
  /* Initializing local state */
  constructor(props) {
    super(props)
    this.state = { data : charsheet }
  }

  render() {
    return(
      <div>
        <CharCreatorForm charSheet = {this.state.data} updateName={this.updateCharsheet} />
      </div>
    );
  }

  updateCharsheet = e => this.setState({data : e.target.value})
  updateName = e => this.setState(
      {
          data: {
              basic_info: {
                  name: e.target.value
              }
          }
      }
  )
};

export default App;
