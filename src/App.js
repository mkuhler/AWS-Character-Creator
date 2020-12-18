import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react";
import { jsPDF } from "jspdf";

function App() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  function savePDF (e) {
    const doc = new jsPDF();
    doc.text(`Hello ${fname} ${lname}!`, 10, 10);
    doc.save("charactersheet.pdf");
  
    console.log('Saved');
  }

  return (
    <div className="App">
      <header>
        <h1>AWS Character Creator</h1>
      </header>
      <h2>1. Getting Started</h2>
      <form onSubmit={savePDF}>
        <label>Character Name: </label>
        <input type="text" id="fname" name="fname" onChange={e => setFname(e.target.value)}></input>
        &nbsp;
        <input type="text" id="lname" name="lname" onChange={e => setLname(e.target.value)}></input>
        <br />
        <input type="submit" value="Save as PDF"></input>
    </form>
    </div>
  );
}

export default App;
