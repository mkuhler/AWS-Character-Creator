import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react";
import { jsPDF } from "jspdf";


function ProgressBar() {
  return(
    <div class="progress">
    <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
  </div>
  );

}

function CharacterSheet() {
  const [name, setName] = useState("");
  const [race, setRace] = useState("");
  const [charclass, setCharclass] = useState("");
  const [level, setLevel] = useState(1);

  function savePDF (e) {
    const doc = new jsPDF();
    /*doc.text(`Class: ${charclass}`, 10, 20);*/
    
    doc.text(`${name}`, 10, 10);
    doc.text(`${charclass}`, 10, 22);
    doc.text(`${race} - ${level}`, 70, 22);

    doc.line(10, 12, 120, 12);
    doc.line(10, 24, 50, 24);
    doc.line(70, 24, 120, 24);

    doc.setFontSize(10);
    doc.setTextColor(102, 102, 102);
    doc.text("Character Name", 10, 16);
    doc.text("Race", 10, 30);
    doc.text("Class & Level", 70, 30);
    
    doc.save(`${name}_charactersheet.pdf`);
    console.log('Saved');
  }

  return (
    <form onSubmit={savePDF}>

        <div id="cs_1" class="form-group">

          <div class="row">

            <div class="col-md-6">
              <label>Character Name</label>
              <input type="text" id="name" name="fname" onChange={e => setName(e.target.value)}></input>
            </div>

            <div class="col-md-4">
              <label>Race</label>
              <input list="races" name="race" id="race" onChange={e => setRace(e.target.value)}></input>

              <datalist id="races">
                <option value="Alleykin" />
                <option value="Arcanite" />
                <option value="Beastblooded" />
                <option value="Dark Elf" />
                <option value="Dragonic/Dragonspawn" />
                <option value="Dwarf" />
                <option value="Forgeborn/Dwarf-forged" />
                <option value="Gnome" />
                <option value="Half-elf" />
              </datalist>
            </div>

          </div>

          <div class="row">

            <div class="col-md-6">
            <label>Class</label>
              <input list="classes" name="charClass" id="charClass" onChange={e => setCharclass(e.target.value)}></input>

              <datalist id="classes">
                <option value="Barbarian" />
                <option value="Bard" />
                <option value="Cleric" />
                <option value="Fighter" />
                <option value="Paladin" />
                <option value="Ranger" />
                <option value="Rogue" />
                <option value="Sorcerer" />
                <option value="Wizard" />
              </datalist>
            </div>

            <div class="col-md-4">
              <label>Level</label>
              <input type="number" id="level" name="level" value={Math.max(0, level)} onChange={e => setLevel(Math.max(0, e.target.value))}></input>
            </div>

          </div>

          
          <br />
          <input type="submit" value="Save as PDF"></input>
        </div>
        
    </form>
  );
}


function App() {
  return (
    <div className="App">
      <header>
        <h1>13th Age Character Creator</h1>
      </header>
      <div className="content">
        <CharacterSheet />
      </div>

    </div>
  );
}

export default App;
