import React from 'react';
import CharacterDetails from './characterdetails.js';
import {Button, Form, Col, Figure} from 'react-bootstrap';
import { jsPDF } from 'jspdf';
import charsheet from './CharSheetData.js';
import { lengthy_entry, get_ellispis } from './FontFunctions.js';
import FileSaver from 'file-saver';


export default class PrintPDF extends  React.Component{

  pdfGenerator = () =>{
    var doc = new jsPDF('p', 'pt');
    var name = charsheet.basic_info.name;

    doc.setFontSize(lengthy_entry(name));
    doc.text(10, 28, get_ellispis(name));

    doc.setFontSize(12);
    doc.text(10, 68, charsheet.basic_info.race_info.race);
    // doc.text(10, 22, "CHARACTER");
    // doc.text(70, 22, "RACE-LEVEL");
    //
    // doc.line(10, 12, 120, 12);
    // doc.line(10, 24, 50, 24);
    // doc.line(70, 24, 120, 24);
    //
    doc.setFontSize(15).setFont('truesdell').setTextColor(102, 102, 102);
    doc.text(10, 45, "CHARACTER NAME").line(10,32,150,32);
    doc.text(10, 85, "RACE").line(10,72,150,72);
    // doc.text(70, 30, "Class & Level");

    doc.save("My_Character.pdf")
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
      </div>
    );
    }
}
