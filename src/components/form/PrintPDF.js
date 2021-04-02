import React from 'react';
import CharacterDetails from './characterdetails.js';
import {Button, Form, Col, Figure} from 'react-bootstrap';
import { jsPDF } from 'jspdf';
import charsheet from './CharSheetData.js';
import { lengthy_entry, get_ellispis } from './FontFunctions.js';
import { shield, attack_information, intitive } from './encodebase64.js';
import FileSaver from 'file-saver';
import axios from 'axios';
import { parse } from '../../../node_modules/querystring/index.js';


export default class PrintPDF extends  React.Component{

    fileState = {
        selectedFile: null,
    };

  pdfGenerator = () =>{
    var doc = new jsPDF('p', 'pt');

    var name = this.props.data.basic_info.name;
    var race_and_class = this.props.data.basic_info.race + " - " +this.props.data.basic_info.class;
    var height_and_weight = this.props.data.basic_info.height + "  -  " +this.props.data.basic_info.weight;
    var age_and_gender = this.props.data.basic_info.age + "  -  " +this.props.data.basic_info.gender;
    var level = this.props.data.basic_info.level;

    doc.addImage(shield(),'PGN',170,10, 60,70);
    doc.addImage(attack_information(), 'PGN', 270, 10, 210, 90);
    doc.addImage(intitive(), 'PGN', 500, 10, 70, 90);

    doc.setFontSize(lengthy_entry(name));
    doc.text(10, 28, get_ellispis(name)); //name

    doc.setFontSize(11);
    doc.text(10, 62, race_and_class);
    doc.text(10, 92, height_and_weight);
    doc.text(180, 92, age_and_gender, 'center');
    doc.setFontSize(20).text(198, 50, level, 'center');

    doc.setFontSize(10).setFont('arialuni').setTextColor(102, 102, 102); //color : Grey
    doc.text(10, 45, "CHARACTER NAME").line(10,32,150,32);
    doc.text(10, 77, "RACE & CLASS").line(10,65,150,65);
    doc.text(10, 107, "HEIGHT & WEIGHT").line(10,95,100,95);
    doc.text(130, 107, "AGE & GENDER").line(130,95,250,95);
    doc.text(184,30, "LEVEL");

    doc.save("My_Character.pdf")
    }


    jsonGenerator = () => {

        // The user should be able to upload a file, have the contents of that file populate the fields, and be able to re-download the modified file
        // currently the user can upload and re-download a file, but any changes made after the upload do not populate in when redownloading,
        // there seems to be an issue with the distinction between charsheet and this.charsheet
        var jsonString;
        jsonString = JSON.stringify(this.props.data);

    var jsonBlob = new Blob([jsonString], { type: "text/plain;charset=utf-8" });

    FileSaver.saveAs(jsonBlob, "My_Character.txt");
  }

  render(){
    return(
      <div className="Button">
        <Button variant="outline-primary" onClick={this.pdfGenerator}>Print PDF</Button>
        <Button variant="outline-primary" onClick={this.jsonGenerator}>Download JSON</Button>

      </div>
    );
    }
}
