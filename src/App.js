import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react";
import { jsPDF } from "jspdf";

import charClassData from "./data";

function InfoCard(props) {
  /* Search for the selected class in charClass data and retrieve information */
  const charClassInfo = charClassData.find(charClass => charClass.name === props.name);

  if (charClassInfo) {
    return (
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{props.name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">+2 Class Bonus</h6>

            {charClassInfo.class_bonus.map(class_bonus => 
               <div class="form-check">
                <input class="form-check-input" type="radio" name="classBonus" id={class_bonus} value={class_bonus} />
                <label class="form-check-label" for="classBonus">{class_bonus}</label>
              </div>
            )}

          <h6 class="card-subtitle mb-2 text-muted">Backgrounds</h6>
          <ul>{charClassInfo.backgrounds.map(background => <li>{background}</li>)}</ul>
          <a href={"https://www.13thagesrd.com/classes/" + props.name} class="card-link" target="_blank">Learn more {'>'}</a>
        </div>
      </div>
    );
  } else {
    return (<div></div>);
  }
}

function CharacterSheet() {
  const [name, setName] = useState("");
  const [race, setRace] = useState("");
  const [charclass, setCharclass] = useState("");
  const [level, setLevel] = useState(1);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [abilityScores, setAbilityScores] = useState([{ability: 'str', score:0, modifier:0}, 
                                                      {ability: 'con', score:0, modifier:0}, 
                                                      {ability: 'dex', score:0, modifier:0}, 
                                                      {ability: 'int', score:0, modifier:0}, 
                                                      {ability: 'wis', score:0, modifier:0}, 
                                                      {ability: 'cha', score:0, modifier:0}]);

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
    <div id="cs_1" class="container-fluid">
        <div class="row">
        <form class="col-8" onSubmit={savePDF}>
          <h4>Basic Information</h4>
          <div class="form-row">
            <div class="form-group col-sm-6">
              <label for="name">Character Name</label>
              <input type="text" class="form-control" id="name" name="fname" onChange={e => setName(e.target.value)}></input>
            </div>

            <div class="form-group col-sm-6">
              <label>Race</label>
              <input list="races" class="form-control" name="race" id="race" onChange={e => setRace(e.target.value)}></input>

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
          </div> {/* END FORM ROW */}

          <div class="form-row">
            <div class="form-group col-sm-6">
            <label>Class</label>
              <input list="classes" class="form-control" name="charClass" id="charClass" onChange={e => setCharclass(e.target.value)}></input>

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

            <div class="form-group col-sm-6">
              <label>Level</label>
              <input type="number" class="form-control" id="level" name="level" value={Math.max(0, level)} onChange={e => setLevel(Math.max(0, e.target.value))}></input>
            </div>
          </div> {/* END FORM ROW */}

          <div class="form-row">
            <div class="form-group col-sm-3">
              <label>Height</label>
              <input type="text" class="form-control" id="height" name="height" onChange={e => setHeight(e.target.value)}></input>
            </div>

            <div class="form-group col-sm-3">
              <label>Weight</label>
              <input type="text" class="form-control" id="weight" name="weight" onChange={e => setWeight(e.target.value)}></input>
            </div>

            <div class="form-group col-sm-3">
              <label>Age</label>
              <input type="text" class="form-control" id="age" name="age" onChange={e => setAge(e.target.value)}></input>
            </div>

            <div class="form-group col-sm-3">
              <label>Gender</label>
              <input type="text" class="form-control" id="gender" name="gender" onChange={e => setGender(e.target.value)}></input>
            </div>
          </div> {/* END FORM ROW */}

          <hr />
          <div class="form-row">
            <div class="form-group col-sm-3">
              <h4>Ability Scores</h4> 
            </div>
            <div class="form-group col-sm-3">
              <button type="button" class="btn btn-outline-secondary">Roll</button>
            </div>
          </div>

          <div class="form-row">
            {abilityScores.map((abilityScore, index) => 
                <div class="form-group col">
                <label>{abilityScore.ability}</label>
                <input type="number" class="form-control" id={abilityScore.ability} name={abilityScore.ability} value = {abilityScore.score}></input>
              </div>
            )} 
          </div> {/* END FORM ROW */}

          <div class="form-row">
            {abilityScores.map((abilityScore, index) => 
                <div class="form-group col">
                <input type="number" class="form-control" id={abilityScore.ability} name={abilityScore.ability} value = {abilityScore.modifier}></input>
              </div>
            )} 
          </div> {/* END FORM ROW */}

          <input type="submit" class="btn btn-primary" value="Save as PDF"></input>
        </form>

        <div id="info" class="col-sm">
          <InfoCard name={race} />
          <InfoCard name={charclass} />
        </div> {/* END INFO */}
      </div> {/* END ROW */}
    </div> 
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
