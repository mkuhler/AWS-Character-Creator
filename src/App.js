import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect, Component} from 'react';
import { jsPDF } from 'jspdf';
import charsheet from './CharSheetData';
import charClassData from './data';

class Form extends React.Component {
  render() {
    return(
      <form>
        <h1>{this.props.charName}</h1>
        <input type='text' onChange={this.props.updateName}/>
      </form>
      
    )
  }
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
        <Form charName = {this.state.data.name} updateName={this.updateName} />
      </div>
    );
  }

  updateCharsheet = e => this.setState({data : e.target.value})
  updateName = e => this.setState(
    {data : {
      name: e.target.value
    }})
};

export default App;
