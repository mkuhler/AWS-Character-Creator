import React from 'react';
import CharacterDetails from './characterdetails.js';
import {Button, Form, Col, Figure} from 'react-bootstrap';
import { jsPDF } from 'jspdf';
import charsheet from './CharSheetData.js';
import { lengthy_entry, get_ellispis, createTextBox, createTitle, createParagraph, extend_textfield, createPower } from './PDFFunctions.js';
import { font, page, feat_magic_gear, powers } from './PDFConstants.js';
import { basic_info, sword_image } from './encodebase64.js';
import FileSaver from 'file-saver';
import axios from 'axios';
import { parse } from '../../../node_modules/querystring/index.js';
import { renderToString } from "react-dom/server";

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
    var icon_relationships = charsheet.background_talents.icon_relationships;
    var icon_names = icon_relationships.name;
    var icon_points = icon_relationships.points;
    var icon_statuses = icon_relationships.status;
    var icon_relationships_other = charsheet.background_talents.icon_relationship_other;
    var backgrounds = charsheet.background_talents.backgrounds;
    var powers = charsheet.character_powers.powers;

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

    var sectionTitle;
    var i;
    var offset = (page.PAGE_MARGIN / 2);
    var boxWidth = (page.PAGE_WIDTH / 3) - offset - 40;
    var height = 280;
    var line = "";

    for (i = 0; i < 3; i++) {
      var sectionText = [];

      switch(i) {
        case 0:
          sectionTitle = "Icon Relationships";
          
          // Loop through relationships and add to array of strings
          // ICON_RELATIONSHIP OBJ WITH ARRAYS IN EACH
          /*for(relationship in icon_relationships) {
            line = relationship.name + ": " + relationship.points + " " + relationship.status;
            sectionText.push(line);
          }*/

          break;
        case 1:
          sectionTitle = "One Unique Thing";
          sectionText = createParagraph(doc, charsheet.background_talents.one_unique_thing, boxWidth - page.DEFAULT_PADDING);
          break;
        case 2:
          sectionTitle = "Backgrounds";
          
          // Loop through backgrounds and add to array of strings
          /*var j; 
          for (j = 0; j < backgrounds.length; j++) {
            var background = backgrounds[j];
            line = background[0] + " " + background[1];
            console.log(background);
            sectionText.push(line);
          }*/
          break;
      }

      // TODO: Figure out how to make the boxes full-width without the -25 in width for line 121
      createTitle(doc, offset + (page.PAGE_WIDTH / 3 * i), height, sectionTitle);
      createTextBox(doc, offset + (page.PAGE_WIDTH / 3 * i), height + font.LINE_HEIGHT, (page.PAGE_WIDTH / 3) - offset - 40, 75, sectionText);
    }

    var currentRow = 0;
    var currentCol = 0;
    var colSpace_0 = page.PAGE_HEIGHT - powers.X;
    var colSpace_1 = page.PAGE_HEIGHT - powers.X;
    var heightRemaining = colSpace_0;
    var powerHeight = 0;
    powers = [{power_name: "Melee Basic Attack", 
              power_frequency_1: "At-Will", 
              power_description: {power_action_type: "Standard Action", 
                                  power_target: "One Engaged Creature",
                                  power_effect: "Make a fighter melee attack. You may move to engage first if your move action is available."}}, 
              {power_name: "Cleave", power_frequency_1: "Daily", power_description: {power_action_type: "Maneuver"}},
              {power_name: "Vitality Drain", power_frequency_1: "Cyclical", power_description: {power_action_type: "Standard Action"}},
              {power_name: "Test Test", power_frequency_1: "Battle-Based", power_description: {power_action_type: "Standard Action"}}];

    // Generate Powers
    powers.map((power, key) => {
      currentCol = key % 2;
      currentRow = (key !== 0 && currentCol === 0) ? currentRow + 1 : currentRow;
      heightRemaining = (currentCol === 0) ? colSpace_0 : colSpace_1; 
      
      powerHeight = createPower(doc, currentRow, currentCol, power);
      
      if (currentCol === 0) {
        colSpace_0 -= powerHeight;
      } else {
        colSpace_1 -= powerHeight;
      }
      
    });


    ////////////////////////////////////////////////////////////////////////////////
    //SECOND PAGE INFORMATION
    ////////////////////////////////////////////////////////////////////////////////

    doc.addPage();
    doc.setFont('fantasy').setTextColor("#808080").setFontSize(11);
    doc.text(7,30,"FEATS").text(205,30,"GEAR EQUIPMENT & MONEY").text(405,30,"MAGIC ITEMS");
    doc.setFont('').setTextColor(''); //reset font and color

    var feats = charsheet.inventory_feats_and_journal.feats;
    var inventory = charsheet.inventory_feats_and_journal.inventory;
    var magic = charsheet.inventory_feats_and_journal.magic_items;

    extend_textfield(feats, doc, 10);
    extend_textfield(inventory, doc, 208);
    extend_textfield(magic, doc, 408);


    doc.rect(7, 35, 170, feat_magic_gear.FIXED_HEIGHT);      //FEATS
    doc.rect(205, 35, 170, feat_magic_gear.FIXED_HEIGHT);    //GEAR EQUIPMENT & MONEY
    doc.rect(405, 35, 170, feat_magic_gear.FIXED_HEIGHT);    //MAGIC ITEMS

    
    //BACKSTORY
    doc.rect(7, 285 + feat_magic_gear.HEIGHT_DIFFER, 570, 510);


    doc.setFont('fantasy').setTextColor("#808080").setFontSize(11);
    doc.text(7,280 + feat_magic_gear.HEIGHT_DIFFER, "JOURNAL / BACKSTORY");
    doc.addImage(sword_image(),'PNG',7,225 + feat_magic_gear.HEIGHT_DIFFER, 570,30);

    doc.save("My_Character.pdf");
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
