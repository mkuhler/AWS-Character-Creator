import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react";
import Header from './components/header.js';
import Footer from './components/footer.js';
import MasterForm from './components/form/master.js';
import { jsPDF } from "jspdf";
import charClassData from "./components/form/data.js";
import {Container, Row, Col} from "react-bootstrap";


class App extends React.Component {

  render(){
    return (
      <div>
        <Header />
        <br />
        <Container>
          <Row>
            <Col><MasterForm /></Col>
          </Row>
        </Container>
        <Footer />

      </div>

    );
  }
}

export default App;
