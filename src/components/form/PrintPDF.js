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

    var str = charsheet.ability_scores.strength;
    var con = charsheet.ability_scores.constitution;
    var dex = charsheet.ability_scores.dexterity;
    var int = charsheet.ability_scores.intelligence;
    var wis = charsheet.ability_scores.wisdom;
    var cha = charsheet.ability_scores.charisma;

    doc.addImage(basic_info(),'PGN',7,15, 560,95);

    doc.setFontSize(lengthy_entry(name));
    doc.text(10, 28, get_ellispis(name)); //name


    doc.setFontSize(11);
    doc.text(10, 62, race_and_class);
    doc.text(10, 95, height_and_weight);
    doc.text(180, 95, age_and_gender, 'center');

    doc.setFontSize(20).text(210, 60, level, 'center');

    doc.setFontSize(12);
    doc.text(285, 35, str + '');
    doc.text(285, 65, con + '');
    doc.text(285, 92, dex + '');

    doc.text(390, 35, int + '');
    doc.text(390, 65, wis + '');
    doc.text(390, 92, cha + '');

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
