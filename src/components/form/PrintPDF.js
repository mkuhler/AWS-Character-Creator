import React from 'react';
import CharacterDetails from './characterdetails.js';
import {Button, Form, Col, Figure} from 'react-bootstrap';
import { jsPDF } from 'jspdf';
import charsheet from './CharSheetData.js';
import { lengthy_entry, get_ellispis, createTextBox, createTitle, createParagraph, add_items, expand_textfield, createPower, add_jounrnal_page, add_page_number } from './PDFFunctions.js';
import { font, page, feat_magic_gear } from './PDFConstants.js';
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
    doc.page = 1;

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
    // var icon_relationships = charsheet.background_talents.icon_relationships;
    var icon_names = charsheet.background_talents.icon_relationship_names;
    var icon_points = charsheet.background_talents.icon_relationship_points;
    var icon_statuses = charsheet.background_talents.icon_relationship_statuses;
    var icon_relationships_other = charsheet.background_talents.icon_relationships_other;
    var backgrounds = charsheet.background_talents.backgrounds;
    var feat_name = charsheet.background_talents.talents_and_features_names;
    var feat_description = charsheet.background_talents.talents_and_features_descriptionss;
    //var powers = charsheet.character_powers.powers;

    doc.addImage(basic_info(),'PNG',7,15, 570,247);

    //Character basic informatoin
    doc.setFontSize(lengthy_entry(name, 120, 175));
    doc.text(10, 28, get_ellispis(name, 175)); //name


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
      doc.setFont('arial').setTextColor('').text(375, 225, ": " + saving_throws_optional); //reset font and color
    }

    var sectionText = "";
    var i;
    var offset = (page.PAGE_MARGIN / 2);
    var boxWidth = (page.PAGE_WIDTH / 3) - offset - 40;
    var height = 280;
    var line = "";

    // for (i = 0; i < 3; i++) {
    //   var sectionText = [];

    //   switch(i) {
    //     case 0:
    //       sectionTitle = "Icon Relationships";
          
    //       // Loop through relationships and add to array of strings
    //       // ICON_RELATIONSHIP OBJ WITH ARRAYS IN EACH
    //       /*for(relationship in icon_relationships) {
    //         line = relationship.name + ": " + relationship.points + " " + relationship.status;
    //         sectionText.push(line);
    //       }*/

    //       break;
    //     case 1:
    //       sectionTitle = "One Unique Thing";
    //       // sectionText = createParagraph(doc, charsheet.background_talents.one_unique_thing, boxWidth - page.DEFAULT_PADDING);
    //       break;
    //     case 2:
    //       sectionTitle = "Backgrounds";
          
    //       // Loop through backgrounds and add to array of strings
    //       /*var j; 
    //       for (j = 0; j < backgrounds.length; j++) {
    //         var background = backgrounds[j];
    //         line = background[0] + " " + background[1];
    //         console.log(background);
    //         sectionText.push(line);
    //       }*/
    //       break;
    //   }

    //   // TODO: Figure out how to make the boxes full-width without the -25 in width for line 121
    //   createTitle(doc, offset + (page.PAGE_WIDTH / 3 * i), height, sectionTitle);
    //   createTextBox(doc, offset + (page.PAGE_WIDTH / 3 * i), height + font.LINE_HEIGHT, (page.PAGE_WIDTH / 3) - offset - 40, 75, sectionText);

    // }

    // createTitle(doc, offset + (page.PAGE_WIDTH / 3 * 0), height, "Icon Relationships");
    // createTitle(doc, offset + (page.PAGE_WIDTH / 3 * 1), height, "One Unique Thing");
    // createTitle(doc, offset + (page.PAGE_WIDTH / 3 * 2), height, "Backgrounds");


    // add_items(feat_name, doc, 10, 230, 75, 75)
    // createTextBox(doc, offset + (page.PAGE_WIDTH / 3 * 0), 285, (page.PAGE_WIDTH / 3) - offset - 40, 75 + feat_magic_gear.HEIGHT_DIFFER, sectionText);


    var currentRow = 0;
    var currentCol = 0;
    var colSpace_0 = powers.Y;
    var colSpace_1 = powers.Y;
    var currentHeight = colSpace_0;
    var powerHeight = 0;
    let power_arr = [ 
      {power_name: "Cleave", power_frequency_1: "Daily", power_description: {power_action_type: "Maneuver"}},
      {power_name: "Melee Basic Attack", 
      power_frequency_1: "At-Will", 
      power_description: {power_action_type: "Standard Action", 
                          power_target: "One Engaged Creature",
                          power_effect: "Make a fighter melee attack. You may move to engage first if your move action is available."}},
                          
      {power_name: "Vitality Drain", power_frequency_1: "Cyclical", power_description: {power_action_type: "Standard Action"}},
      {power_name: "Test Test", power_frequency_1: "Battle-Based", power_description: {power_action_type: "Standard Action"}}];
    
      /*let power_arr = [ 
              {power_name: "Cleave", power_frequency_1: "Daily", power_description: {power_action_type: "Maneuver"}},
              {power_name: "Melee Basic Attack", 
              power_frequency_1: "At-Will", 
              power_description: {power_action_type: "Standard Action", 
                                  power_target: "One Engaged Creature",
                                  power_effect: "Make a fighter melee attack. You may move to engage first if your move action is available."}},
                                  
              {power_name: "Vitality Drain", power_frequency_1: "Cyclical", power_description: {power_action_type: "Standard Action"}},
              {power_name: "Melee Basic Attack", 
              power_frequency_1: "At-Will", 
              power_description: {power_action_type: "Standard Action", 
                                  power_target: "One Engaged Creature",
                                  power_effect: "Make a fighter melee attack. You may move to engage first if your move action is available."}},
                                  {power_name: "Melee Basic Attack", 
              power_frequency_1: "At-Will", 
              power_description: {power_action_type: "Standard Action", 
                                  power_target: "One Engaged Creature",
                                  power_effect: "Make a fighter melee attack. You may move to engage first if your move action is available."}},
                                  {power_name: "Melee Basic Attack", 
              power_frequency_1: "At-Will", 
              power_description: {power_action_type: "Standard Action", 
                                  power_target: "One Engaged Creature",
                                  power_effect: "Make a fighter melee attack. You may move to engage first if your move action is available."}},
                                  {power_name: "Melee Basic Attack", 
              power_frequency_1: "At-Will", 
              power_description: {power_action_type: "Standard Action", 
                                  power_target: "One Engaged Creature",
                                  power_effect: "Make a fighter melee attack. You may move to engage first if your move action is available."}},
                                  {power_name: "Melee Basic Attack", 
              power_frequency_1: "At-Will", 
              power_description: {power_action_type: "Standard Action", 
                                  power_target: "One Engaged Creature",
                                  power_effect: "Make a fighter melee attack. You may move to engage first if your move action is available."}},
                                  {power_name: "Melee Basic Attack", 
              power_frequency_1: "At-Will", 
              power_description: {power_action_type: "Standard Action", 
                                  power_target: "One Engaged Creature",
                                  power_effect: "Make a fighter melee attack. You may move to engage first if your move action is available."}},
                                  {power_name: "Melee Basic Attack", 
              power_frequency_1: "At-Will", 
              power_description: {power_action_type: "Standard Action", 
                                  power_target: "One Engaged Creature",
                                  power_effect: "Make a fighter melee attack. You may move to engage first if your move action is available."}},
                                  {power_name: "Melee Basic Attack", 
              power_frequency_1: "At-Will", 
              power_description: {power_action_type: "Standard Action", 
                                  power_target: "One Engaged Creature",
                                  power_effect: "Make a fighter melee attack. You may move to engage first if your move action is available."}},
              {power_name: "Test Test", power_frequency_1: "Battle-Based", power_description: {power_action_type: "Standard Action"}}];
    */
    let power_overflow = [];
    
    // Generate Powers
    power_arr.map((power, key) => {
      currentCol = key % 2;
      currentRow = (key !== 0 && currentCol === 0) ? currentRow + 1 : currentRow;
      currentHeight = (currentCol === 0) ? colSpace_0 : colSpace_1; 
      
      if ((currentHeight + powers.header.HEIGHT + powers.body.HEIGHT) > page.PAGE_HEIGHT) {
        // ADD TO ARRAY OF POWERS NOT PRESENT ON FIRST PAGE, RELEGATE TO ANOTHER
        power_overflow.push(power);
      } else {
        powerHeight = createPower(doc, currentRow, currentCol, currentHeight, power);

        if (currentCol === 0) {
          colSpace_0 = powerHeight + powers.header.HEIGHT;    // Add a buffer space the size of the power's header
        } else {
          colSpace_1 = powerHeight + powers.header.HEIGHT;
        }
      }
      
    });


    ////////////////////////////////////////////////////////////////////////////////
    //SECOND PAGE INFORMATION
    ////////////////////////////////////////////////////////////////////////////////

    var feats = charsheet.inventory_feats_and_journal.feats;
    var inventory = charsheet.inventory_feats_and_journal.inventory;
    var magic = charsheet.inventory_feats_and_journal.magic_items;
    var background = charsheet.inventory_feats_and_journal.journal_and_background_story;
    var inventory_height = 35;
    var journal_ycord = 0;

    doc.addPage();
    add_page_number(doc);
    createTitle(doc, offset + (page.PAGE_WIDTH / 3 * 0), inventory_height - 5, "FEATS"); 
    createTitle(doc, offset + (page.PAGE_WIDTH / 3 * 1), inventory_height - 5, "GEAR EQUIPMENT & MONEY");
    createTitle(doc, offset + (page.PAGE_WIDTH / 3 * 2), inventory_height - 5, "MAGIC ITEMS");

    add_items(feats, doc, 10, 50, feat_magic_gear.FIXED_HEIGHT, 180);
    add_items(inventory, doc, 215, 50, feat_magic_gear.FIXED_HEIGHT, 180);
    add_items(magic, doc, 418, 50, feat_magic_gear.FIXED_HEIGHT, 180);

    createTextBox(doc, offset + (page.PAGE_WIDTH / 3 * 0), inventory_height, (page.PAGE_WIDTH / 3) - offset - 40, 170 + feat_magic_gear.HEIGHT_DIFFER, sectionText);
    createTextBox(doc, offset + (page.PAGE_WIDTH / 3 * 1), inventory_height, (page.PAGE_WIDTH / 3) - offset - 40, 170 + feat_magic_gear.HEIGHT_DIFFER, sectionText);
    createTextBox(doc, offset + (page.PAGE_WIDTH / 3 * 2), inventory_height, (page.PAGE_WIDTH / 3) - offset - 40, 170 + feat_magic_gear.HEIGHT_DIFFER, sectionText);

    //Height difference save to
    journal_ycord = feat_magic_gear.HEIGHT_DIFFER 
    doc.addImage(sword_image(),'PNG',7,230 + journal_ycord, 570,30);  
  
    let paragraphlength = createParagraph(doc, background, offset + (page.PAGE_WIDTH / 3 * 0) + 5, 300 + journal_ycord, 570, '', 10 );
    
    
    createTitle(doc, offset + (page.PAGE_WIDTH / 3 * 0),280 + journal_ycord, "JOURNAL");
    
    let new_page = expand_textfield(doc,paragraphlength, 285 + journal_ycord, 150, 150, 13, 500);
    
    createTextBox(doc, offset + (page.PAGE_WIDTH / 3 * 0), 285 + journal_ycord, (page.PAGE_WIDTH / 3) + 360, 150 + feat_magic_gear.HEIGHT_DIFFER, sectionText);
            
    if(new_page == true) { add_jounrnal_page(doc, offset, page.PAGE_WIDTH); }

    doc.save("My_Character.pdf");
    feat_magic_gear.FIXED_HEIGHT = 180;

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
