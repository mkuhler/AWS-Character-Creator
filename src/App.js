import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react";
import { jsPDF } from "jspdf";
import data from "./data.js";

function App() {

  function savePDF (e) {
    const doc = new jsPDF();
    doc.text("Hello World!", 10, 10);
    doc.save("charactersheet.pdf");

    console.log('Saved');
  }

  return (
    <div className="App">
      <header>
        <h1>AWS Character Creator</h1>
      </header>
      <button onClick={savePDF}>Create PDF</button>
    </div>
  );
}

export default App;
