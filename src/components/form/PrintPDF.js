import React from 'react';
import CharacterDetails from './characterdetails.js';
import {Button, Form, Col, Figure} from 'react-bootstrap';
import { jsPDF } from 'jspdf';
import charsheet from './CharSheetData.js';
import { lengthy_entry, get_ellispis } from './FontFunctions.js';
import { basic_info, sword_image } from './encodebase64.js';
import FileSaver from 'file-saver';
import axios from 'axios';
import { parse } from '../../../node_modules/querystring/index.js';

var FIXED_HEIGHT = 180; //fixed size for FEATS, GEAR EQUIPMENT & MONEY, MAGIC ITEMS
var HEIGHT_DIFFER = 0;     //will be used to calculate the hight difference if the textfield change in size

export default class PrintPDF extends  React.Component
{

    fileState = {
        selectedFile: null,
    };


  pdfGenerator = () =>{
    var doc = new jsPDF('p', 'pt');

    var name = charsheet.basic_info.name;
    var race_and_class = charsheet.basic_info.race + " - " + charsheet.basic_info.class;
    var height_and_weight = charsheet.basic_info.height + "  -  " + charsheet.basic_info.weight;
    var age_and_gender = charsheet.basic_info.age + "  -  " + charsheet.basic_info.gender;
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


    doc.setFontSize(lengthy_entry(race_and_class)).text(10, 62, race_and_class);
    doc.setFontSize(11).text(10, 95, height_and_weight);
    doc.setFontSize(11).text(180, 95, age_and_gender, 'center');

    doc.setFontSize(20).text(210, 60, level, 'center');

    doc.setFontSize(12);
    doc.text(290, 35, str + '', 'center').text(355, 35, str_mod + '', 'center');
    doc.text(290, 65, con + '', 'center').text(355, 65, con_mod + '', 'center');
    doc.text(290, 92, dex + '', 'center').text(355, 92, dex_mod + '', 'center');

    doc.text(395, 35, int + '', 'center').text(460, 35, int_mod + '', 'center');
    doc.text(395, 65, wis + '', 'center').text(460, 65, wis_mod + '', 'center');
    doc.text(395, 92, cha + '', 'center').text(460, 92, cha_mod + '', 'center');

    //Character Attributes
    if(initiative != 0){ doc.setFontSize(20).text(530, 58, initiative + '', 'center'); }
    if(hitpoints_max != 0){ doc.setFontSize(20).text(105, 205, hitpoints_max + '', 'center'); }

    if(death_saves_max != 0){ doc.setFontSize(18).text(290, 205, death_saves_max + '', 'center'); }

    if(armor_class != 0){
      doc.setFontSize(20).text(495, 197, armor_class + '', 'center');
    }
    if(mental_defense != 0){
      doc.setFontSize(14).text(550, 210, mental_defense + '', 'center');
    }
    if(physical_defense != 0){
      doc.setFontSize(14).text(438, 210, physical_defense + '', 'center');
    }

    doc.setFontSize(8).text(360, 181, ": " + saving_throws_easy);
    doc.setFontSize(8).text(360, 197, ": " + saving_throws_medium);
    doc.setFontSize(8).text(360, 212, ": " + saving_throws_hard);

    if(saving_throws_optional != ""){
      doc.setFont('fantasy').setTextColor("#808080").setFontSize(8).text(328, 225, "OPTIONAL ");
      doc.setFont('').setTextColor('').text(375, 225, ": " + saving_throws_optional); //reset font and color
    }

    ////////////////////////////////////////////////////////////////////////////////
    //SECOND PAGE INFORMATION
    ////////////////////////////////////////////////////////////////////////////////

    doc.addPage();
    doc.setFont('fantasy').setTextColor("#808080").setFontSize(11);
    doc.text(7,30,"FEATS").text(205,30,"GEAR EQUIPMENT & MONEY").text(405,30,"MAGIC ITEMS");
    doc.setFont('').setTextColor(''); //reset font and color

    var feats = charsheet.inventory_feats_and_journal.feats;
    var inventory = charsheet.inventory_feats_and_journal.inventory;
    var magic = charsheet.inventory_feats_and_journal.magic_items
    ;
    this.extend_textfield(feats, doc, 10);
    this.extend_textfield(inventory, doc, 208);
    this.extend_textfield(magic, doc, 408);

    doc.rect(7, 35, 170, FIXED_HEIGHT);      //FEATS
    doc.rect(205, 35, 170, FIXED_HEIGHT);    //GEAR EQUIPMENT & MONEY
    doc.rect(405, 35, 170, FIXED_HEIGHT);    //MAGIC ITEMS

    //BACKSTORY
    doc.rect(7, 285 + HEIGHT_DIFFER, 570, 510);


    doc.setFont('fantasy').setTextColor("#808080").setFontSize(11);
    doc.text(7,280 + HEIGHT_DIFFER, "JOURNAL / BACKSTORY");
    doc.addImage(sword_image(),'PNG',7,225 + HEIGHT_DIFFER, 570,30);

    doc.save("My_Character.pdf");
    }

  /**
  * Adds items from array to pdf while checking
  * to see if strings exceed space from text field.
  *
  * @param  items   the list that will be added to document
  * @param  doc     the pdf document
  * @param  x_Cord  the cordinate to start place the string
  * @return         void
  */
  extend_textfield = (items, doc, x_Cord) => {
    HEIGHT_DIFFER = 180;

    var y_Cord = 50;
    for(var i = 0; i <items.length; i++)
    {
      doc.text(x_Cord, y_Cord, items[i]);
      if(y_Cord > FIXED_HEIGHT){
        FIXED_HEIGHT += 15
      }
      y_Cord += 15;
    }
      HEIGHT_DIFFER = FIXED_HEIGHT - HEIGHT_DIFFER;
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
    );
    }
}
