import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react";
import Header from './components/header.js';
import Hello from './components/hello.js'
import MasterForm from './components/form/master.js'
import { jsPDF } from "jspdf";
import charClassData from "./data";
import {Container, Row, Col} from "react-bootstrap"


class App extends React.Component {




  render(){
    return (
      <div>
        <Header />
        <Container>
          <Row>
            <Col><MasterForm /></Col>
          </Row>
        </Container>


      </div>

    );
  }
}

export default App;
