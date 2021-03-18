import React from 'react';
import {Button, Form, Col} from 'react-bootstrap';
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

    classBonus: "", raceBonus: ""
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
    const abilityABR = ["STR", "CON", "DEX", "INT", "WIS", "CHA"]
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

    //Checks for bonuses selected
    if(this.props.data.basic_info.class_bonus_chosen.length == 3) {
      this.state.classBonus = abilityNames[abilityABR.indexOf(this.props.data.basic_info.class_bonus_chosen.toUpperCase())]
    }
    if(this.props.data.basic_info.race_bonus_chosen.length == 3) {
      this.state.raceBonus = abilityNames[abilityABR.indexOf(this.props.data.basic_info.race_bonus_chosen.toUpperCase())]
    }

    //Loop to allocate values
    for (var i = 0; i < 6; i++) {
      var rollVal = this.state.["roll" + (i+1)][0]

      //For loop for changing the abbreviation ability names to the full length to make allocating values easier
      for (var j = 0; j < abilityNames.length; j++) {
        if(this.state.[selected[i]] == abilityNames[j].substring(0,3).toUpperCase()) {
          this.state.[selected[i]] = abilityNames[j]
          break
        }
      }

      //Applies class and race bonuses to corresponding abilities
      if(this.state.[selected[i]] === this.state.classBonus)
            rollVal += 2
      if(this.state.[selected[i]] === this.state.raceBonus)
            rollVal += 2

      ability_scoreChanges.[this.state.[selected[i]]] = rollVal
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

    //checks for numerical input then changes props and fields accordingly
    if (this.props.onlyNum(event)) {
      ability_scoreChanges.[name] = value
      this.props.dataChange(ability_scoreChanges)
    }
  }

//this.props.data.basic_info.name returns Madison

  render() {
      console.log(this.props.data.basic_info);

      //Variables used to allocate values to labels and fields
      const abilityNames = [["strength", "STR"], ["constitution", "CON"], ["dexterity", "DEX"], ["intelligence", "INT"], ["wisdom", "WIS"], ["charisma", "CHA"]]
      const selectedAndRoll = [["selected1", "roll1"], ["selected2", "roll2"], ["selected3", "roll3"], ["selected4", "roll4"], ["selected5", "roll5"], ["selected6", "roll6"]]
      const modifierNames = [["strength_mod", "STR"], ["constitution_mod", "CON"], ["dexterity_mod", "DEX"], ["intelligence_mod", "INT"], ["wisdom_mod", "WIS"], ["charisma_mod", "CHA"]]
      
      return(
        <Form id="form">
          <Form.Group controlId="basic_info">
            <h3>Basic Information</h3>
            <Form.Row>
              <Col xs={5}>
                <Form.Label>Character Name</Form.Label>
                <Form.Control type="text"
                            name="name"
                            onChange={this.props.handleChange}/>
              </Col>
              <Col xs={5}>
                <Form.Label>Race</Form.Label>
                <Form.Control name = "race" type="text" list="races" onChange={this.props.handleChange}/>
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
                <Form.Control name = "class" type="text" list="classes" onChange={this.props.handleChange}/>
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
                            placeholder="1"
                            onChange={this.props.handleChange}/>
              </Col>
            </Form.Row>

            <Form.Row>
              <Col xs={2}>
                <Form.Label>Height</Form.Label>
                <Form.Control type="text"
                              name="height"
                              onChange={this.props.handleChange}/>
              </Col>

              <Col xs={2}>
                <Form.Label>Weight</Form.Label>
                <Form.Control type="text"
                                name="weight"
                                onChange={this.props.handleChange}/>
              </Col>

              <Col xs={2}>
                <Form.Label>Age</Form.Label>
                <Form.Control type="text"
                                  name="age"
                                  onChange={this.props.handleChange}/>
              </Col>

              <Col xs={2}>
                <Form.Label>Gender</Form.Label>
                <Form.Control type="text"
                                  name="gender"
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
              {abilityNames.map((option) =>
                <Col xs={2}>
                <Form.Label style={{marginLeft:40, fontSize: 15}}>{option[1]}</Form.Label>
                <Form.Control type="text"
                              name={option[0]}
                              value={this.props.data.ability_scores.[option[0]]}
                              style={{textAlign: "center"}}
                              onChange={e => {this.abilityHandler(e)}} />
                </Col>
              )}
            </Form.Row>

            <br></br>
            <Form.Row name="selectors">
              {selectedAndRoll.map((option) =>
                <Col xs={2}>
                  {this.state.rollDisplay ? <Form.Label style={{ marginLeft: 40, fontWeight: "bold", fontSize: 20}}>{this.state.[option[1]]}</Form.Label> : null}
                  <Form.Control as="select" name={option[0]} onChange={this.dropdownChange} style={{display: "none"}}>
                          <option>--</option>
                          <option>STR</option>
                          <option>CON</option>
                          <option>DEX</option>
                          <option>INT</option>
                          <option>WIS</option>
                          <option>CHA</option>
                  </Form.Control>
                </Col>
              )}
            </Form.Row>

            <Form.Row>
              <Button style={{ display: "none", width: "100px", marginTop: 20, marginLeft: 305, backgroundColor: "#12A924", borderColor: "#12A924" }} onClick={this.abilityRoll}>Roll</Button>
              <Button style={{ display: "none", width: "100px", marginTop: 20, marginLeft: 210, backgroundColor: "#12A924", borderColor: "#12A924" }} onClick={this.abilityAllocation}>Apply</Button>
            </Form.Row>

            <br></br>
            <h3>Modifiers</h3>
            <Form.Row>
              {modifierNames.map((option) =>
              <Col xs={2}>
                <Form.Label style={{ marginLeft: 40, fontSize: 15 }}>{option[1]}</Form.Label>
                <Form.Control type="text"
                              name="strength_mod"
                              value={this.props.data.ability_scores.[option[0]]}
                              style={{ textAlign: "center" }}
                              onChange={e => {this.abilityHandler(e)}} />
              </Col>
              )}
            </Form.Row>
            <Button style={{ width: "100px", marginTop: 20, marginLeft: 305, backgroundColor: "#12A924", borderColor: "#12A924" }} onClick={this.calcMod}>Calculate</Button>
          </Form.Group>
          <Button style={{float:"right", marginBottom: 10}} variant="primary" onClick={this.props.nextStep}>Next</Button>
      </Form>
      );

     }


}

export default CharacterDetails;