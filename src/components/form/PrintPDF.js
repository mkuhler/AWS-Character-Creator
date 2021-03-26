import React from 'react';
import CharacterDetails from './characterdetails.js';
import {Button, Form, Col, Figure} from 'react-bootstrap';
import { jsPDF } from 'jspdf';
import charsheet from './CharSheetData.js';
import { lengthy_entry, get_ellispis } from './FontFunctions.js';
import { basic_info } from './encodebase64.js';
import FileSaver from 'file-saver';
import axios from 'axios';
import classInfo from './data.js'

export default class PrintPDF extends  React.Component{

    fileState = {
        selectedFile: null,
        nameofFile: "Upload a file"
    };

    onFileChange = event => {
        this.fileState = { selectedFile: event.target.files[0] };
        this.fileState.nameofFile = String(this.fileState.selectedFile.name);
    };

    onFileUpload = () => {
        const formData = new FormData();

        // formData.append("myFile", this.fileState.selectedFile, this.fileState.selectedFile.name);

        //this.fileState.nameofFile = String(this.fileState.selectedFile.name);

        charsheet = JSON.parse(this.fileState.text);

        // console.log(this.state.selectedFile);

        axios.post("api/uploadfile", formData);
    };

    fileData = () => {

        if (this.fileState.selectedFile) {
            return (
                <div>
                    <h2> File Details: </h2>
                    <p> File Name: {this.fileState.selectedFile.name} </p>
                    <p> File Type: {this.fileState.selectedFile.type} </p>
                </div>
            );
        }
        else {
        }
    };

  pdfGenerator = () =>{
    var doc = new jsPDF('p', 'pt');

    var name = charsheet.basic_info.name;
    var race_and_class = charsheet.basic_info.race + " - " +charsheet.basic_info.class;
    var height_and_weight = charsheet.basic_info.height + "  -  " +charsheet.basic_info.weight;
    var age_and_gender = charsheet.basic_info.age + "  -  " +charsheet.basic_info.gender;
    var level = charsheet.basic_info.level;
    var ability_class = charsheet.basic_info.class_bonus_chosen;
    var ability_race = charsheet.basic_info.race_bonus_chosen;

    var str = charsheet.ability_scores.strength;       var str_mod = charsheet.ability_scores.strength_mod;
    var con = charsheet.ability_scores.constitution;   var con_mod = charsheet.ability_scores.constitution_mod;
    var dex = charsheet.ability_scores.dexterity;      var dex_mod = charsheet.ability_scores.dexterity_mod;
    var int = charsheet.ability_scores.intelligence;   var int_mod = charsheet.ability_scores.intelligence_mod;
    var wis = charsheet.ability_scores.wisdom;         var wis_mod = charsheet.ability_scores.wisdom_mod;
    var cha = charsheet.ability_scores.charisma;       var cha_mod = charsheet.ability_scores.charisma_mod;


    var initiative = charsheet.character_attributes.initiative;
    var hitpoints_max = charsheet.character_attributes.hitpoints_max;
    var armor_class = charsheet.character_attributes.armor_class;
    var physical_defense = charsheet.character_attributes.physical_defense;
    var mental_defense = charsheet.character_attributes.mental_defense;
    var saving_throws_easy = charsheet.character_attributes.saving_throws_easy;
    var saving_throws_medium = charsheet.character_attributes.saving_throws_medium;
    var saving_throws_hard = charsheet.character_attributes.saving_throws_hard;
    var saving_throws_optional = charsheet.character_attributes.saving_throws_optional;
    var death_saves_max = charsheet.character_attributes.death_saves_max;

    doc.addImage(basic_info(),'PNG',7,15, 570,247);

    //Character basic informatoin
    doc.setFontSize(lengthy_entry(name));
    doc.text(10, 28, get_ellispis(name)); //name


    doc.setFontSize(11);
    doc.text(10, 62, race_and_class);
    doc.text(10, 95, height_and_weight);
    doc.text(180, 95, age_and_gender, 'center');

    doc.setFontSize(20).text(210, 60, level, 'center');

    doc.setFontSize(12);
    doc.text(290, 35, str + '', 'center').text(355, 35, str_mod + '', 'center');
    doc.text(290, 65, con + '', 'center').text(355, 65, con_mod + '', 'center');
    doc.text(290, 92, dex + '', 'center').text(355, 92, dex_mod + '', 'center');

    doc.text(395, 35, int + '', 'center').text(460, 35, int_mod + '', 'center');
    doc.text(395, 65, wis + '', 'center').text(460, 65, wis_mod + '', 'center');
    doc.text(395, 92, cha + '', 'center').text(460, 92, cha_mod + '', 'center');

    //Character Attributes
    doc.setFontSize(20).text(530, 58, initiative + '', 'center');
    doc.setFontSize(20).text(105, 205, hitpoints_max + '', 'center');

    doc.setFontSize(18).text(290, 205, death_saves_max + '', 'center');

    doc.setFontSize(20).text(495, 197, armor_class + '', 'center');
    doc.setFontSize(14).text(550, 210, mental_defense + '', 'center');
    doc.setFontSize(14).text(438, 210, physical_defense + '', 'center');
    doc.setFontSize(8).text(360, 181, ": " + saving_throws_easy);
    doc.setFontSize(8).text(360, 197, ": " + saving_throws_medium);
    doc.setFontSize(8).text(360, 212, ": " + saving_throws_hard);

    if(saving_throws_optional != ""){
      doc.setFont('fantasy').setTextColor("#808080").setFontSize(8).text(328, 225, "OPTIONAL ");
      doc.setFont('').setTextColor('').text(375, 225, ": " + saving_throws_optional); //reset font and color
    }

    doc.save("My_Character.pdf");
    }


  jsonGenerator = () => {

    var jsonString = JSON.stringify(charsheet);
    var jsonBlob = new Blob([jsonString], { type: "text/plain;charset=utf-8" });

    FileSaver.saveAs(jsonBlob, "My_Character.txt");
  }

  render(){
    return(
      <div className="Button">
        <Button variant="outline-primary" onClick={this.pdfGenerator}>Print PDF</Button>
        <Button variant="outline-primary" onClick={this.jsonGenerator}>Download JSON</Button>
            <Form variant="outline-primary">
                <Form.File
                    id="custom-file"
                    label= {this.fileState.nameofFile}
                    custom
                    onChange= {this.onFileChange}
                />
            </Form>
        <Button variant="outline-primary" onClick={this.onFileUpload}>Upload File</Button>
        {this.fileData()}
      </div>
    );
    }
}
