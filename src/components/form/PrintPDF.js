import React from 'react';
import CharacterDetails from './characterdetails.js';
import {Button, Form, Col, Figure} from 'react-bootstrap';
import { jsPDF } from 'jspdf';
import charsheet from './CharSheetData.js';
import { lengthy_entry, get_ellispis, createTextBox, createTitle, createParagraph, createJournalParagraph, add_items, expand_textfield, createPower, add_jounrnal_page, add_page_number, createList } from './PDFFunctions.js';
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
    var initiative_description = charsheet.character_attributes.initiative_description;
    var hitpoints_max = charsheet.character_attributes.hitpoints_max;
    var recoveries = charsheet.character_attributes.recoveries;
    var recovery_description = charsheet.character_attributes.recoveries_optional;
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
    var init_description = createParagraph(doc, initiative_description, page.descriptions.SIZE, page.descriptions.MAX_LINES)
    doc.setFontSize(8).setTextColor("#808080").text(532, 85, init_description, 'center');

    if(initiative != 0){ doc.setFontSize(20).text(530, 58, initiative + '', 'center'); }
    doc.setFontSize(8).setTextColor("#808080").text(532, 85, init_description, 'center');


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

    //recoveries
    var recoveryDescription = createParagraph(doc, recovery_description, page.descriptions.SIZE, page.descriptions.MAX_LINES)

    doc.setFontSize(10).text(170, 185, recoveries, 'center');
    doc.setFontSize(8).setTextColor("#808080").text(172,210, recoveryDescription, 'center');


    doc.setFontSize(8).text(360, 182, ": " + saving_throws_easy);
    doc.setFontSize(8).text(360, 197, ": " + saving_throws_medium);
    doc.setFontSize(8).text(360, 212, ": " + saving_throws_hard);

    if(saving_throws_optional != ""){
      doc.setFont('fantasy').setTextColor("#808080").setFontSize(8).text(328, 225, "OPTIONAL ");
      doc.setFont('arial').setTextColor('').text(375, 225, ": " + saving_throws_optional); //reset font and color
    }

    // Icon Relationships, One Unique Thing, Backgrounds
    var icon_names = charsheet.background_talents.icon_relationship_names;
    var icon_points = charsheet.background_talents.icon_relationship_points;
    var icon_statuses = charsheet.background_talents.icon_relationship_statuses;
    var icon_relationships_other = charsheet.background_talents.icon_relationships_other;
    var one_unique_thing = charsheet.background_talents.one_unique_thing;
    var background_names = charsheet.background_talents.background_names;
    var background_numbers = charsheet.background_talents.background_numbers;
    
    var sectionTitle = "";
    var line = "";
    var offset = (page.PAGE_MARGIN / 2);
    var boxWidth = (page.PAGE_WIDTH / 3) - offset - 40;
    var height = 280;
    var maxLines = (75 / font.LINE_HEIGHT) - 1;

    for (var i = 0; i < 3; i++) {
      var sectionText = [""];
      var sectionTextTitles = [""];

      switch(i) {
        case 0:
          sectionTitle = "Icon Relationships";
          // NOTE: This HEAVILY depends on all of the icon arrays being the same length
          for (var j = 0; j < icon_names.length; j++) {
            line = icon_points[j] + " " + icon_statuses[j];
            sectionText.push(line);
            sectionTextTitles.push(icon_names[j] + ": ");
          }
          break;

        case 1:
          sectionTitle = "One Unique Thing";
          sectionText = createParagraph(doc, one_unique_thing, boxWidth - page.DEFAULT_PADDING, maxLines);
          break;

        case 2:
          sectionTitle = "Backgrounds";

          // Loop through backgrounds and add to array of strings
          for (var j = 0; j < background_names.length; j++) {
            sectionTextTitles.push(background_numbers[j]);
            sectionText.push(background_names[j]);
          }
          break;
      }

      // TODO: Figure out how to make the boxes full-width without the -25 in width for line 121
      // TODO: Set ellipsis when the text exceeds the height of the box
      createTitle(doc, offset + (page.PAGE_WIDTH / 3 * i), height, sectionTitle);
      
      if (i === 1) {
        createTextBox(doc, offset + (page.PAGE_WIDTH / 3 * i), height + font.LINE_HEIGHT, (page.PAGE_WIDTH / 3) - offset - 40, 75, sectionText, font.font_size.DEFAULT_FONT_SIZE);
      } else {
        createTextBox(doc,  offset + (page.PAGE_WIDTH / 3 * i), height + font.LINE_HEIGHT, (page.PAGE_WIDTH / 3) - offset - 40, 75);
        createList(doc, offset + (page.PAGE_WIDTH / 3 * i) + page.DEFAULT_PADDING, height + font.LINE_HEIGHT + (page.DEFAULT_PADDING * 2), (page.PAGE_WIDTH / 3) - offset - 40, sectionTextTitles, sectionText, maxLines);
      }
    
    }

    // Talents and Features
    var feat_name = charsheet.background_talents.talents_and_features_names;
    var feat_description = charsheet.background_talents.talents_and_features_descriptions;
    var feat_y = powers.Y + (page.PAGE_MARGIN * 2);
    var feat_width = 180;
    var feat_height = 420;
    var maxLines = (420 / font.LINE_HEIGHT) - 1;
    var sectionTitle = "Talents and Features";

    // Creates list of talents and features based on the name and description arrays
    createTitle(doc, page.PAGE_MARGIN, feat_y, sectionTitle);
    createTextBox(doc, page.PAGE_MARGIN, feat_y + page.DEFAULT_PADDING, feat_width, feat_height);
    createList(doc, page.PAGE_MARGIN + page.DEFAULT_PADDING, feat_y + (page.DEFAULT_PADDING * 2) + font.LINE_HEIGHT, feat_width, feat_name, feat_description, maxLines, ": ");

    // Powers
    var sectionTitle = "";
    var currentRow = 0;
    var currentCol = 0;
    var colSpace_0 = powers.Y;
    var colSpace_1 = powers.Y;
    var currentHeight = colSpace_0;
    var powerHeight = 0;
    let powerOverflow = [];
    let powerObjects = charsheet.powers;
    
    // Generate Powers
    powerObjects.map((power, key) => {
      currentCol = key % 2;
      currentRow = (key !== 0 && currentCol === 0) ? currentRow + 1 : currentRow;
      currentHeight = (currentCol === 0) ? colSpace_0 : colSpace_1;

      if ((currentHeight + powers.header.HEIGHT + powers.body.HEIGHT) > page.PAGE_HEIGHT) {
        // ADD TO ARRAY OF POWERS NOT PRESENT ON FIRST PAGE, RELEGATE TO ANOTHER
        powerOverflow.push(power);
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


    var filename = "My_Character.pdf";

    if (this.props.data.basic_info.name != "") {
          filename = this.props.data.basic_info.name + ".pdf";
    }

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

    let paragraphlength = createJournalParagraph(doc, background, offset + (page.PAGE_WIDTH / 3 * 0) + 5, 300 + journal_ycord, 570, '', 10 );


    createTitle(doc, offset + (page.PAGE_WIDTH / 3 * 0),280 + journal_ycord, "JOURNAL");

    expand_textfield(doc,paragraphlength, 285 + journal_ycord, 150, 150, false, 13, 350);

    createTextBox(doc, offset + (page.PAGE_WIDTH / 3 * 0), 285 + journal_ycord, (page.PAGE_WIDTH / 3) + 360, 150 + feat_magic_gear.HEIGHT_DIFFER, sectionText);

    add_jounrnal_page(doc, offset, page.PAGE_WIDTH);

    feat_magic_gear.FIXED_HEIGHT = 180;

    // Add Power Overflow to a new page
    if (powerOverflow.length > 0) {
      doc.addPage();
          
      var sectionTitle = "";
      var currentRow = 0;
      var currentCol = 0;
      var colSpace_0 = powers.Y;
      var colSpace_1 = powers.Y;
      var currentHeight = colSpace_0;
      var powerHeight = 0;
      
      // Generate Powers
      for (var i = 0; i < powerOverflow.length; i++) {
        let power = powerOverflow[i];
        currentCol = i % 2;
        currentRow = (i !== 0 && currentCol === 0) ? currentRow + 1 : currentRow;
        currentHeight = (currentCol === 0) ? colSpace_0 : colSpace_1;

        if ((currentHeight + powers.header.HEIGHT + powers.body.HEIGHT) > page.PAGE_HEIGHT) {
          //Arbitrary break point for too many powers
          if (i > 100) {
            break;
          }
          // Create a new page and continue printing
          doc.addPage();
        }

        powerHeight = createPower(doc, currentRow, currentCol, currentHeight, power);

        if (currentCol === 0) {
          colSpace_0 = powerHeight + powers.header.HEIGHT;    // Add a buffer space the size of the power's header
        } else {
          colSpace_1 = powerHeight + powers.header.HEIGHT;
        }
      }
    }

    doc.save(filename);
    }

    jsonGenerator = () => {

        // The user should be able to upload a file, have the contents of that file populate the fields, and be able to re-download the modified file
        // currently the user can upload and re-download a file, but any changes made after the upload do not populate in when redownloading,
        // there seems to be an issue with the distinction between charsheet and this.charsheet
        var jsonString;
        jsonString = JSON.stringify(this.props.data);

    var jsonBlob = new Blob([jsonString], { type: "text/plain;charset=utf-8" });

        var filename = "My_Character.txt";

        if (this.props.data.basic_info.name != "") {
            filename = this.props.data.basic_info.name + ".txt";
        }

    FileSaver.saveAs(jsonBlob, filename);
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
