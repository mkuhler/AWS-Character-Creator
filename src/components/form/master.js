import React from 'react';
import { Container, Row, Col, ProgressBar } from 'react-bootstrap';
import GameData from './data.js';
import InfoCard from './infocard.js';
import CharacterDetails from './characterdetails.js';
import PrintPDF from "./PrintPDF.js";
import charsheet from './CharSheetData.js';
import CharacterAttributes from './characterattributes.js';
import BackgroundTalents from './backgroundtalents.js';
import UploadButton from './UploadButton.js';
import { parse } from '../../../node_modules/url/url.js';
import Journal from './journal.js';
import Powers from './powers.js';


//import the rest of form components

class MasterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      currentMajorVersion: 1,
      currentMinorVersion: 0,
      data: charsheet,
      defaultSheet: charsheet,
      fileState: null,
      fileUploadStatus: "Upload a File"
    };

  this.handleChange = this.handleChange.bind(this)
  this.dataChange = this.dataChange.bind(this)
  this.onFileChange = this.onFileChange.bind(this)
  }

  nextStep = () => {
    const { step } = this.state
    this.setState({
      step: step + 1,
      data: charsheet
    })
  }

  prevStep = () => {
    const { step } = this.state
    this.setState({
      step: step - 1,
      data: charsheet

    })
  }


  onFileChange = event => {

      //console.log(event.target.files[0])
      //this.fileState = { selectedFile: event.target.files[0] };
      //this.fileState.nameofFile = String(this.fileState.selectedFile.name);
      // console.log('hello');
      const fileReader = new FileReader();

      if (event.target.files[0] != null) {

          console.log("Event target file: " + event.target.files[0].name);

          var allowedFileTypes = /(\.txt)$/i;         // /(\.txt|\.doc|\.docx)$/i;
          if (allowedFileTypes.exec(event.target.files[0].name))
          {
              fileReader.readAsText(event.target.files[0], "UTF-8");
              fileReader.onload = event => {
                  console.log("e.target.result", event.target.result);
                  //setFiles(event.target.result);
                  this.state.selectedFile = event.target.result;

                  var parsedFile = JSON.parse(event.target.result);

                  if (parsedFile.major_version != null && parsedFile.major_version == this.state.currentMajorVersion) {
                      console.log("parsedFile Major Version # ", parsedFile.major_version);

                      //var keysMatch = this.checkfileCompatibility(parsedFile);

                      var keysMatch = true;
                      var mismatchedKey = "";


                      if (keysMatch)
                      {

                          Object.assign(this.state.data, parsedFile);


                          //console.log(parsedFile);
                          console.log(this.state.data);
                          //console.log("Charsheet: " + this.state.data);
                          //console.log("Character name: " + this.state.data.basic_info.name);

                          let statusLabel = document.getElementById('fileStatus');
                          statusLabel.innerText = "File Uploaded";


                          this.forceUpdate()

                      }
                      else // key mismatch
                      {
                          let statusLabel = document.getElementById('fileStatus');
                          statusLabel.innerText = "Key: " + mismatchedKey + " does not match expected input";
                      }

                      //CharacterDetails.render();
                  }
                  else // version numbers dont match
                  {
                      let statusLabel = document.getElementById('fileStatus');
                      statusLabel.innerText = "Missing file version";

                      if (parsedFile.major_version != null && parsedFile.minor_version != null)
                      {
                          statusLabel.innerText = "Incompatible file version: " + parsedFile.major_version + "." + parsedFile.minor_version;
                      }
                  }
              };
          }
          else // file extensions incorrect
          {
              let statusLabel = document.getElementById('fileStatus');
              statusLabel.innerText = "Incorrect file extension";
          }
      }
      else // no file selected
      {
          let statusLabel = document.getElementById('fileStatus');
          statusLabel.innerText = "No File Selected";
      }

      this.forceUpdate()
    }






  handleChange(event) {
      const { name, value } = event.target

      console.log(event)

    //Custom attributes need to be grabbed from the DOM api
    const category = event.target.id
    const subcategory = event.target.getAttribute('subcategory')
    const arrayindex = event.target.getAttribute('arrayindex')

    if (subcategory != null) {
      this.state.data.[category].[subcategory].[name] = value

    } else if (category === "ability_scores"){
      this.state.data.[category].[name] = parseInt(value)
    } else if(arrayindex != null){
      this.state.data.[category].[name][arrayindex] = value
    }else {
      this.state.data.[category].[name] = value
    }
    this.forceUpdate()

    if (name == "class") {

      const class_list = GameData.classes
      var result = class_list.find(game_class => game_class.name === value);
      if (typeof(result) === 'undefined' || value == null) {
        this.state.data.[category].class_bonus_options = []
      } else {
        this.state.data.[category].class_bonus_options = result.class_bonus
      }
      this.state.data.[category].class_bonus_chosen = ""
    }

    if (name == "race") {
      const race_list = GameData.races
      var result = race_list.find(game_race => game_race.name === value);
      if (typeof(result) === 'undefined' || value == null) {
        this.state.data.[category].race_bonus_options = []
      } else {
        this.state.data.[category].race_bonus_options = result.race_bonus
      }
      this.state.data.[category].race_bonus_chosen = ""

      const class_list = GameData.classes
      var result = class_list.find(game_class => {
        if(game_class.name === value) {
          this.state.data.[category].class_bonus_options = game_class.class_bonus
          console.log(game_class.class_bonus)
        }
      })
    }

    if (name == "race") {
      const race_list = GameData.races
      var result = race_list.find(game_race => {
        if(game_race.name === value) {
          this.state.data.[category].race_bonus_options = game_race.race_bonus
          console.log(game_race.race_bonus)
        }
      })
    }
    // console.log(event.target.id)
    //console.log(subcategory)
    //console.log(category)
    //this.state.data.[category].[name] = value
    //console.log(this.state.data.basic_info)
    // console.log(this.state.data.character_attributes)
      // console.log(this.state.data.ability_scores)

  }







  //Literally only updates ability score values for backend
  dataChange(value){
    var data = {...this.state.data}
    data.ability_scores = value
    this.state.data.ability_scores = value

    this.forceUpdate()
    console.log(this.state.data.ability_scores)
  }

  //Function that takes in an event to check if its value contains only numerical input
  //returns true if it contains on numbers and calls handleChange to handle backend changes
  onlyNum = (event) => {
    const re = /^[0-9\b]+$/;

    //checks if value is blank and then checks if the value contains only numerical input
    if (event.target.value === '' || re.test(event.target.value)) {
      this.handleChange(event)
      return true
    }
    else
      return false
  }

  render() {
    const { step } = this.state;
    switch (step) {
      case 1:
        return <Container>
          <ProgressBar now={0} />
          <Row>

            <Col xs={8}>
              <CharacterDetails
                nextStep = {this.nextStep}
                handleChange = {this.handleChange}
                dataChange = {this.dataChange}
                data = {this.state.data}
                onlyNum = {this.onlyNum}
                />
            </Col>
            <Col xs={4}>
              <InfoCard
                data={this.state.data}
                name= "class"
                handleChange={this.handleChange}
              />
              <InfoCard
                data={this.state.data}
                name= "race"
                handleChange={this.handleChange}
              />
            </Col>
              <UploadButton
              onChange={this.onFileChange}
              />
            <PrintPDF
              data={this.state.data}
            />
          </Row>

        </Container>
      case 2:
        <h3>Background Information Page Two</h3>
        return <Container>
          <ProgressBar now={25} />
          <Row>

            <Col xs={10}>
              <CharacterAttributes
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                handleChange={this.handleChange}
                data={this.state.data}
              />
            </Col>

            <PrintPDF
              data={this.state.data}
            />

          </Row>

        </Container>
      case 3:
        <h3>Background Information Page Three</h3>
        return <Container>
          <ProgressBar now={50} />
          <Row>

            <Col xs={10}>
              <BackgroundTalents
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                handleChange={this.handleChange}
                data={this.state.data}
              />
            </Col>
            <PrintPDF
              data={this.state.data}
            />
          </Row>

        </Container>


      case 4:
        <h3> Inventory & Journal </h3>
        return <Container>
          <ProgressBar now={75} />
          <Row>

            <Col xs={10}>
              <Journal
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                handleChange={this.handleChange}
                data={this.state.data}
              />
            </Col>
            <PrintPDF
              data={this.state.data}
            />
          </Row>

        </Container>

      case 5:
        <h3> Powers </h3>
        return <Container>
          <ProgressBar now={100} />
          <Row>

            <Col xs={10}>
              <Powers
                prevStep={this.prevStep}
                handleChange={this.handleChange}
                data={this.state.data}
              />
            </Col>
            <PrintPDF
              data={this.state.data}
            />
          </Row>

        </Container>


    }
  }
}

export default MasterForm;
