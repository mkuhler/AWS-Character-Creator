import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react";
import Header from './components/header.js';
import Hello from './components/hello.js'
import MasterForm from './components/form/master.js'
import { jsPDF } from "jspdf";
import charClassData from "./data";


class App extends React.Component {




  render(){
    return (
      <div>
        <Header />

        <MasterForm />
      </div>

    );
  }
}

export default App;
