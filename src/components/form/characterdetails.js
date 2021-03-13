import React from 'react';
import {Button, Form, Col} from 'react-bootstrap';
import charsheet from './CharSheetData.js';
import classInfo from './data.js'

class CharacterDetails extends React.Component{
  
constructor(charProps){
  super(charProps)

  this.state = { 
    //values for holding roll results
    roll1: "--", roll2: "--", roll3: "--", roll4: "--", roll5: "--", roll6: "--",
    rolled: false,

    //values for keeping track of drop down values for ability allocation
    selected1: "--", selected2: "--", selected3: "--", selected4: "--", selected5: "--", selected6: "--",
      genMethod: "Manual", rollDisplay: false,
      localChar: this.props.data

  }
  this.dropdownChange = this.dropdownChange.bind(this)
    this.abilityGenMethod = this.abilityGenMethod.bind(this)
}

  //Calculate modifiers on button click and sends values to master.js to update
  calcMod = () => {
    var ability_scoreChanges = {...this.props.data.ability_scores}
    const abilityNames = ["strength", "constitution", "dexterity", "intelligence", "wisdom", "charisma"]

    for(var i = 0; i < abilityNames.length; i++){
      var modName = abilityNames[i] + "_mod"
      ability_scoreChanges.[modName] = Math.floor((this.props.data.ability_scores.[abilityNames[i]] - 10)/2)
    }
    
    this.props.dataChange(ability_scoreChanges)
  }

  //Loops through a set number of label fields and sets the text to the result of rolling a 4d6
  abilityRoll = () => {
    this.setState({rolled: true})

    for (var i = 0; i < 6; i++) {
      var rollSum = Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 4
      var labelName = "roll" + (i+1)

      this.setState({[labelName]: [rollSum]})
    }
  }

  //Allocates abilities based on the selected ability scores from drop down menus
  abilityAllocation = () => {
    //Declaring variables needed to update changes
    var ability_scoreChanges = {...this.props.data.ability_scores}
    const abilityNames = ["strength", "constitution", "dexterity", "intelligence", "wisdom", "charisma"]
    const selected = ["selected1", "selected2", "selected3", "selected4", "selected5", "selected6"]

    //Error checking: checks if all drop down lists have been changed
    if ("--" === this.state.selected1 || "--" === this.state.selected2 || "--" === this.state.selected3 
    || "--" === this.state.selected4 || "--" === this.state.selected5 || "--" === this.state.selected6) {
      console.log("Not all ability drop down lists have been changed.")
      return
    }
    //Error checking: checks if ability scores have been rolled
    else if(!this.state.rolled){
      console.log("Didn't roll ability values yet.")
      return
    }
    //Error checking: checks if there is a duplicate drop down ability selected
    for(var i = 0; i < selected.length-1; i++) {
      var select = "selected" + (i+1)

      for(var j = i+1; j < selected.length; j++) {
        var temp = "selected" + (j+1)

        if (this.state.[select] == this.state.[temp]) {
          console.log("You're attempting to allocate your ability score to a duplicate ability.")
          return
        }
      }
    }

    //Loop to allocate values
    for (var i = 0; i < 6; i++) {
      var rollNum = "roll" + (i+1)

      //For loop for changing the abbreviation ability names to the full length to make allocating values easier
      for (var j = 0; j < abilityNames.length; j++) {
        if(this.state.[selected[i]] == abilityNames[j].substring(0,3).toUpperCase()) {
          this.state.[selected[i]] = abilityNames[j]
          break
        }
      }
      ability_scoreChanges.[this.state.[selected[i]]] = this.state.[rollNum][0]
    }
    this.props.dataChange(ability_scoreChanges)
  }

  //Specifically handles the ability score drop down selection changes for rolling
  dropdownChange(event) {
    const{name, value} = event.target
    this.state.[name] = value
  }

  //function used to hide/show different generation method fields of ability scores (Needs an update when Point Buy is implemented)
  abilityGenMethod(event) {
    this.setState({genMethod: [event.target.value]})

    //Puts all elements/fields into a list/array
    var elementList = document.getElementById("form").elements
    
    //Checks which generation method is selected
    if (event.target.value === "Roll") {
      this.setState({rollDisplay: true})

      //iterates through element list and makes elements for Rolling visible 
      //(elementList.length-8 skips the last 8 elements which are Modifier fields)
      for (var i = 15; i < elementList.length-8; i++) {
        elementList[i].style.display = 'block'
      }
    }
    else {
      this.setState({rollDisplay: false})

      //iterates through element list and makes elements for Rolling invisible
      for (var i = 15; i < elementList.length-8; i++) {
        elementList[i].style.display = 'none'
      }
    }
  }

  //Changes value of ability scores
  abilityHandler(event) {
    const{name, value} = event.target
    var ability_scoreChanges = {...this.props.data.ability_scores}

    const re = /^[0-9\b]+$/;

    //checks if value is blank and then 
    if (event.target.value === '' || re.test(event.target.value)) {
      ability_scoreChanges.[name] = value
      this.props.dataChange(ability_scoreChanges)
      this.props.handleChange(event)
    }
  }

//this.props.data.basic_info.name returns Madison
    //changeHandler() {
     //   this.state.localChar = this.props.data;
    //}


  render() {
      console.log(this.props.data.basic_info);
      return(
        <Form id="form">
          <Form.Group controlId="basic_info">
            <h3>Basic Information</h3>
            <Form.Row>
              <Col xs={5}>
                <Form.Label>Character Name</Form.Label>
                          <Form.Control type="text"
                              name="name"
                              value={this.props.data.basic_info.name}
                              onChange={this.props.handleChange}
                          />
              </Col>
              <Col xs={5}>
                          <Form.Label>Race</Form.Label>
                          <Form.Control name="race" type="text" list="races" value={this.props.data.basic_info.race} onChange={this.props.handleChange} />
                  <datalist name="race" id="races">
                      {classInfo.races.map((option) =>
                        <option value={option.name}></option>
                      )}
                  </datalist>
              </Col>
            </Form.Row>
            
            <Form.Row>
              <Col xs={5}>
                <Form.Label>Class</Form.Label>
                          <Form.Control name="class" type="text" list="classes" value={this.props.data.basic_info.class} onChange={this.props.handleChange}/>
                  <datalist name="class" id="classes">
                      {classInfo.classes.map((option) =>
                        <option value={option.name}></option>
                      )}
                  </datalist>
              </Col>
              <Col xs={5}>
                <Form.Label>Level</Form.Label>
                <Form.Control type="text"
                              name="level"
                              value={this.props.data.basic_info.level}
                            placeholder="1"
                            onChange={this.props.handleChange}/>
              </Col>
            </Form.Row>

            <Form.Row>

              <Col xs={2}>
                <Form.Label>Height</Form.Label>
                <Form.Control type="text"
                              name="height"
                              value={this.props.data.basic_info.height}
                              onChange={this.props.handleChange}/>
              </Col>

              <Col xs={2}>
                <Form.Label>Weight</Form.Label>
                <Form.Control type="text"
                              name="weight"
                              value={this.props.data.basic_info.weight}
                                onChange={this.props.handleChange}/>
              </Col>

              <Col xs={2}>
                <Form.Label>Age</Form.Label>
                <Form.Control type="text"
                              name="age"
                              value={this.props.data.basic_info.age}
                                  onChange={this.props.handleChange}/>
              </Col>

              <Col xs={2}>
                <Form.Label>Gender</Form.Label>
                <Form.Control type="text"
                              name="gender"
                              value={this.props.data.basic_info.gender}
                                  onChange={this.props.handleChange}/>
              </Col>
            </Form.Row>
        </Form.Group>
        <Form.Group controlId="ability_scores" name="Manual"> 
            <br></br>
            <h3>Ability Scores</h3>
            <Form.Row name="genMethod">
                <Col xs={5}>
                  <Form.Control as="select" onChange={this.abilityGenMethod}>
                          <option>Manual</option>
                          <option>Roll</option>
                          <option>Point Buy</option>
                  </Form.Control>
                </Col>
          </Form.Row>
          <br></br>
            <Form.Row name="Scores">
                <Col xs={2}>
                  <Form.Label style={{marginLeft:40, fontSize: 15}}>STR</Form.Label>
                  <Form.Control type="text"
                          name="strength"
                              value={this.props.data.ability_scores.strength}
                              style={{textAlign: "center"}}
                              onChange={e => {this.abilityHandler(e)}} />
                </Col>
                <Col xs={2}>
                  <Form.Label style={{ marginLeft: 40, fontSize: 15 }}>CON</Form.Label>
                  <Form.Control type="text"
                          name="constitution"
                              value={this.props.data.ability_scores.constitution}
                              style={{ textAlign: "center" }}
                          onChange={e => {this.abilityHandler(e)}} />
                </Col>
                <Col xs={2}>
                  <Form.Label style={{ marginLeft: 40, fontSize: 15 }}>DEX</Form.Label>
                  <Form.Control type="text"
                          name="dexterity"
                              value={this.props.data.ability_scores.dexterity}
                              style={{ textAlign: "center" }}
                          onChange={e => {this.abilityHandler(e)}} />
                </Col>
                <Col xs={2}>
                  <Form.Label style={{ marginLeft: 40, fontSize: 15 }}>INT</Form.Label>
                  <Form.Control type="text"
                          name="intelligence"
                              value={this.props.data.ability_scores.intelligence}
                              style={{ textAlign: "center" }}
                          onChange={e => {this.abilityHandler(e)}} />
                </Col>
                <Col xs={2}>
                  <Form.Label style={{ marginLeft: 40, fontSize: 15 }}>WIS</Form.Label>
                  <Form.Control type="text"
                          name="wisdom"
                              value={this.props.data.ability_scores.wisdom}
                              style={{ textAlign: "center" }}
                          onChange={e => {this.abilityHandler(e)}} />
                </Col>
                <Col xs={2}>
                  <Form.Label style={{ marginLeft: 40, fontSize: 15 }}>CHA</Form.Label>
                  <Form.Control type="text"
                          name="charisma"
                              value={this.props.data.ability_scores.charisma}
                              style={{ textAlign: "center" }}
                          onChange={e => {this.abilityHandler(e)}} />
                </Col>
            </Form.Row>

            <br></br>
            <Form.Row name="selectors">
                <Col xs={2}>
                  {this.state.rollDisplay ? <Form.Label style={{ marginLeft: 40, fontWeight: "bold", fontSize: 20}}>{this.state.roll1}</Form.Label> : null}
                  <Form.Control as="select" name="selected1" onChange={this.dropdownChange} style={{display: "none"}}>
                            <option>--</option>
                            <option>STR</option>
                            <option>CON</option>
                            <option>DEX</option>
                            <option>INT</option>
                            <option>WIS</option>
                            <option>CHA</option>
                  </Form.Control>
                </Col>
                <Col xs={2}>
                {this.state.rollDisplay ? <Form.Label style={{ marginLeft: 40, fontWeight: "bold", fontSize: 20}}>{this.state.roll2}</Form.Label> : null}
                  <Form.Control as="select" name="selected2" onChange={this.dropdownChange} style={{display: "none"}}>
                            <option>--</option>
                            <option>STR</option>
                            <option>CON</option>
                            <option>DEX</option>
                            <option>INT</option>
                            <option>WIS</option>
                            <option>CHA</option>
                  </Form.Control>
                </Col>
                <Col xs={2}>
                {this.state.rollDisplay ? <Form.Label style={{ marginLeft: 40, fontWeight: "bold", fontSize: 20}}>{this.state.roll3}</Form.Label> : null}
                  <Form.Control as="select" name="selected3" onChange={this.dropdownChange} style={{display: "none"}}>
                            <option>--</option>
                            <option>STR</option>
                            <option>CON</option>
                            <option>DEX</option>
                            <option>INT</option>
                            <option>WIS</option>
                            <option>CHA</option>
                  </Form.Control>
                </Col>
                <Col xs={2}>
                {this.state.rollDisplay ? <Form.Label style={{ marginLeft: 40, fontWeight: "bold", fontSize: 20}}>{this.state.roll4}</Form.Label> : null}
                  <Form.Control as="select" name="selected4" onChange={this.dropdownChange} style={{display: "none"}}>
                            <option>--</option>
                            <option>STR</option>
                            <option>CON</option>
                            <option>DEX</option>
                            <option>INT</option>
                            <option>WIS</option>
                            <option>CHA</option>
                  </Form.Control>
                </Col>
                <Col xs={2}>
                {this.state.rollDisplay ? <Form.Label style={{ marginLeft: 40, fontWeight: "bold", fontSize: 20}}>{this.state.roll5}</Form.Label> : null}
                  <Form.Control as="select" name="selected5" onChange={this.dropdownChange} style={{display: "none"}}>
                            <option>--</option>
                            <option>STR</option>
                            <option>CON</option>
                            <option>DEX</option>
                            <option>INT</option>
                            <option>WIS</option>
                            <option>CHA</option>
                  </Form.Control>
                </Col>
                <Col xs={2}>
                {this.state.rollDisplay ? <Form.Label style={{ marginLeft: 40, fontWeight: "bold", fontSize: 20}}>{this.state.roll6}</Form.Label> : null}
                  <Form.Control as="select" name="selected6" onChange={this.dropdownChange} style={{display: "none"}}>
                            <option>--</option>
                            <option>STR</option>
                            <option>CON</option>
                            <option>DEX</option>
                            <option>INT</option>
                            <option>WIS</option>
                            <option>CHA</option>
                  </Form.Control>
                </Col>
            </Form.Row>
            <Form.Row>
            <Button style={{ display: "none", width: "100px", marginTop: 20, marginLeft: 305, backgroundColor: "#12A924", borderColor: "#12A924" }} onClick={this.abilityRoll}>Roll</Button>
            <Button style={{ display: "none", width: "100px", marginTop: 20, marginLeft: 210, backgroundColor: "#12A924", borderColor: "#12A924" }} onClick={this.abilityAllocation}>Apply</Button>
            </Form.Row>

            <br></br>
            <h3>Modifiers</h3>
            <Form.Row>
              <Col xs={2}>
                 <Form.Label style={{ marginLeft: 40, fontSize: 15 }}>STR</Form.Label>
                 <Form.Control type="text"
                              name="strength_mod"
                              value={this.props.data.ability_scores.strength_mod}
                              style={{ textAlign: "center" }}
                              onChange={e => {this.abilityHandler(e)}} />
              </Col>
              <Col xs={2}>
                 <Form.Label style={{ marginLeft: 40, fontSize: 15 }}>CON</Form.Label>
                 <Form.Control type="text"
                              name="constitution_mod"
                              value={this.props.data.ability_scores.constitution_mod}
                              style={{ textAlign: "center" }}
                              onChange={e => {this.abilityHandler(e)}} />
              </Col>
              <Col xs={2}>
                 <Form.Label style={{ marginLeft: 40, fontSize: 15 }}>DEX</Form.Label>
                 <Form.Control type="text"
                              name="dexterity_mod"
                              value={this.props.data.ability_scores.dexterity_mod}
                              style={{ textAlign: "center" }}
                              onChange={e => {this.abilityHandler(e)}} />
              </Col>
              <Col xs={2}>
                 <Form.Label style={{ marginLeft: 40, fontSize: 15 }}>INT</Form.Label>
                 <Form.Control type="text"
                              name="intelligence_mod"
                              value={this.props.data.ability_scores.intelligence_mod}
                              style={{ textAlign: "center" }}
                              onChange={e => {this.abilityHandler(e)}} />
              </Col>
              <Col xs={2}>
                 <Form.Label style={{ marginLeft: 40, fontSize: 15 }}>WIS</Form.Label>
                 <Form.Control type="text"
                              name="wisdom_mod"
                              value={this.props.data.ability_scores.wisdom_mod}
                              style={{ textAlign: "center" }}
                              onChange={e => {this.abilityHandler(e)}} />
              </Col>
              <Col xs={2}>
                 <Form.Label style={{ marginLeft: 40, fontSize: 15 }}>CHA</Form.Label>
                 <Form.Control type="text"
                              name="charisma_mod"
                              value={this.props.data.ability_scores.charisma_mod}
                              style={{ textAlign: "center" }}
                              onChange={e => {this.abilityHandler(e)}} />
              </Col>
            </Form.Row>
            <Button style={{ width: "100px", marginTop: 20, marginLeft: 305, backgroundColor: "#12A924", borderColor: "#12A924" }} onClick={this.calcMod}>Calculate</Button>
          </Form.Group>
          <Button style={{float:"right", marginBottom: 10}} variant="primary" onClick={this.props.nextStep}>Next</Button>
      </Form>
      );

     }


}

export default CharacterDetails;