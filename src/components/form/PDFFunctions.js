import { connect } from 'formik';
import jsPDF from 'jspdf';
import { font, page, feat_magic_gear } from './PDFConstants.js'

/**  @const {String} - Extra journal information*/
var EPIC_JOURNAL = ""

/**  @const {Number} - The amount of lines that the text can hold*/
var MAX_PARAGRAPH_LENGTH = 44

/**  @const {Boolean} - continue adding pages*/
var CONTINUE_PAGING = true

var MAX_HEIGHT = 0

/**
 * Measure the text width of a string
 * @param  {String} name the string name
 * 
 * @return {Number}    the width size of the string
 */
function measureInputText(name)
{
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var txtWidth = ctx.measureText(name).width;
    return txtWidth;
}

/**
 * Checks to see if the string surpasses its textarea. If so minimize its font size
 * @param  {String} name        the string name
 * @param  {Number} min_length  the minimum width of the string
 * @param  {Number} max_length  the maximum width of the string 
 * 
 * @return {Number}             the font size
 */
export function lengthy_entry(entry, min_length, max_length)
{
    var inputLength = Math.round(measureInputText(entry));

    if(inputLength > min_length && inputLength < max_length)
    {
      var difference = inputLength / 20;
      var diff = Math.abs(font.font_size.DEFAULT_FONT_SIZE - difference);

      return Math.abs(font.font_size.DEFAULT_FONT_SIZE - diff)
    }
    else if(inputLength > max_length)
    {
      return font.font_size.MINIMUM_FONT_SIZE
    }
    else
      return font.font_size.DEFAULT_FONT_SIZE
}

/**
 * If name is to long add ellispis at the end of its corresponding textarea
 * @param  {String} name        the string name
 * @param  {Number} max_length  the maximum width of the string 
 * 
 * @return {String}             the original or modified string with ellispis 
 */
export function get_ellispis(name, max_length)
{
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");

  var charactersName = "";
  var letter = 0;

  if(measureInputText(name) > max_length){

    for(let index=0; index<max_length; letter++)
    {
      var charWidth = ctx.measureText(name.charAt(letter)).width;
      index+=charWidth;
      charactersName+=name.charAt(letter);
    }
    return charactersName + "..."
  }
  else {
    return name
  }
}

/**
 * Creates formatted title text
 * @param  {jsPDF}  doc     PDF document object
 * @return {Number}         x-coordinate of the text
 * @return {Number}         y-coordinate of the text
 * @return {String}         string containing text to format
 * @return {Number}         = font.font_size.DEFAULT_FONT_SIZE, option to modify font size
 */
export function createTitle(doc, x, y, text, fontSize = font.font_size.DEFAULT_FONT_SIZE){
  return doc.setFont('fantasy')
            .setTextColor("#808080")
            .setFontSize(fontSize)
            .text(x, y, text.toUpperCase());
}

/**
 * Convert inches value to points
 * @param  {Number} inches  Inches value
 * @return {Number}         Value in points
 */
export function convertInchesToPoints(inches) { return inches * 72; }

/**
 * Convert inches value to points
 * @param  {Number} points  Points value
 * @return {Number}         Value in inches
 */
export function convertPointsToInches(points) { return points / 72; }

/**
 * Get the height of a paragraph of text
 * @param  {Array}  paragraph  Array of strings separated by line
 * @param  {Number} fontSize = DEFAULT_FONT_SIZE Size of the text
 * @return {Number}            Height of the paragraph
 */
export function getTextHeight(text,  fontSize = font.font_size.DEFAULT_FONT_SIZE, lineHeight = font.DEFAULT_LINE_HEIGHT) {
  const numLines = text.length;
  return (numLines * fontSize * lineHeight);
}

/**
 * Split a string of text into an array of lines to create a paragraph of text
 * @param  {jsPDF}  doc           PDF document object
 * @param  {String} text          Text to be split into multiple lines
 * @param  {Number} startHight    Where to begin the paragraph
 * @param  {Number} startWidth    Inditation of the paragrpah
 * @param  {Number} maxLineWidth  The maximum width of the text
 * @param  {String} fontType      = font.type_font.DEFAULT, text font
 * @param  {String} fontSize      = font.type_font.MINIMUM_FONT_SIZE, text font size
 * @return {Array}                Array of string lines split by maxLineWidth
 */
export function createParagraph(doc, text, startHight, startWidth, maxLineWidth, fontType = font.type_font.DEFAULT, fontSize = font.font_size.MINIMUM_FONT_SIZE) {

    var lines = doc.setFontSize(fontSize)
                   .setTextColor('')
                   .splitTextToSize(text, maxLineWidth)

    if(lines.length > 44){      
      var break_paragraph = lines.length - MAX_PARAGRAPH_LENGTH

      var lines = doc.setFontSize(fontSize)
                     .setTextColor('')
                     .splitTextToSize(text, maxLineWidth)
                     .slice(0, -break_paragraph);

      EPIC_JOURNAL = doc.setFontSize(fontSize)
                     .setTextColor('')
                     .splitTextToSize(text, maxLineWidth)
                     .slice(-break_paragraph);
    }

    doc.text(startHight, startWidth, lines);

    return lines;
}

/**
 * Create a box around text
  * @param {Number} x               x-coordinate of the text
 * @param  {Number} y               y-coordinate of the text
 * @param  {Number} paragraphHeight Height of the paragraph
 * @param  {Number} maxLineWidth  = Width of the paragraph
 * @param  {Number} padding       = page.DEFAULT_PADDING, Padding of the text box
 * @return {jsPDF}                  Rectangle around text
 */
export function createTextBox(doc, x, y, width, height, text = "", padding = page.DEFAULT_PADDING) {
  
  return doc.text(text, x + padding, y + padding)
            .rect(x, y, width + padding, height + padding);

  MAX_HEIGHT = 0;
}

  /**
  * Adds items from array to pdf while checking to see if the text is to long 
  * 
  * @param  {Array}    items              the list that will be added to document
  * @param  {jsPDF}    doc                the pdf document
  * @param  {Number}   x_Cord             x-cord on where to begin entering the list
  * @param  {Number}   y_Cord             y-cord on where to begin entering the list
  * @param  {Number}   box_hight          the cordinate to start place the string
  * @param  {Number}   hight_difference   fixed size of the textfield area, usually the same are box_height
  * @return         void
  */
   export function add_items(items, doc, x_Cord, y_Cord, box_hight, hight_difference)
   { 
    for(var i = 0; i <items.length && i < 20; i++)
    {
      var material = get_ellispis(items[i], 400)

      var goods = doc.setFontSize(
                                  lengthy_entry(items[i], 150, 200)
                                 )
                     .setTextColor('')
                     .splitTextToSize(material, 170)

      doc.text(x_Cord, y_Cord, goods);

      if(goods.length > 1){
        y_Cord += 25;
      }
      else
        y_Cord += 15;
    }
    expand_textfield(doc, items, y_Cord, box_hight, hight_difference, 10, 1000)
  }

  /**
  * Returns boolean if entry exceeds its capacity while also finding the height difference
  * 
  * @param  {jsPDF}    doc                  the pdf document
  * @param  {Array}    entry                the list that will be added to document
  * @param  {Number}   y_cord               the pdf document
  * @param  {Number}   box_hight            the cordinate to start place the string
  * @param  {Number}   hight_difference     fixed size of the textfield area, usually the same are box_height
  * @param  {Number}   number_of_entries    how many entries fit in the textbox
  * @param  {Number}   max_height           highest length of the entry box
  * @return {Boolean}                       max_height > FIXED_HEIGHT
  */
  export function expand_textfield(doc, entry, y_cord, box_hight, hight_difference, number_of_entries, max_height)
  {
  feat_magic_gear.FIXED_HEIGHT = box_hight;
  feat_magic_gear.HEIGHT_DIFFER = hight_difference;
  MAX_HEIGHT = max_height

  for(var i = 0; i < entry.length; i++)
  {
    if(i > number_of_entries){
      feat_magic_gear.FIXED_HEIGHT += 15
      MAX_HEIGHT-=15
    }
  }

  if(feat_magic_gear.FIXED_HEIGHT < MAX_HEIGHT){
    feat_magic_gear.HEIGHT_DIFFER = feat_magic_gear.FIXED_HEIGHT - feat_magic_gear.HEIGHT_DIFFER;

    MAX_PARAGRAPH_LENGTH-=4
  }
  else{
    feat_magic_gear.HEIGHT_DIFFER = MAX_HEIGHT 
    return true;
  }

  }

  /**
  * Checks to see if the strings goes over the text field
  *
  * @param  {jsPDF}    doc         the pdf document
  * @param  {Number}   offset      the cordinate to start place the string
  * @param  {Number}   page_width  fixed size of the textfield area, usually the same are box_height
  * @return                        void
  * 
  */
  export function add_jounrnal_page(doc, offset, page_width)
  {
    MAX_PARAGRAPH_LENGTH = 66
    doc.addPage();
    add_page_number(doc);
    createTitle(doc, offset + (page_width / 3 * 0), 20, "JOURNAL");
    createTextBox(doc, offset + (page_width / 3 * 0), 30, (page.PAGE_WIDTH / 3) + 360, 750, "");
    createParagraph(doc, EPIC_JOURNAL, offset + 5, 40, 570, '', 10 );

    if(CONTINUE_PAGING)
      epic_story(EPIC_JOURNAL.length, doc, offset, page_width)
    else
      MAX_PARAGRAPH_LENGTH = 44

  }

  /**
  * Long narritve placed by the user. If the user enters a long entry, it'll be divided 
  * by multiple pages. 
  *
  * @param  {Number}   story_lines number of lines within the story
  * @param  {jsPDF}    doc         the pdf document
  * @param  {Number}   offset      the cordinate to start place the string
  * @param  {Number}   page_width  fixed size of the textfield area, usually the same are box_height
  * @return                        void
  * 
  */
    export function epic_story(story_lines, doc, offset, page_width){
      if(story_lines> 66 && CONTINUE_PAGING)
      {
        add_jounrnal_page(doc, offset, page_width)
      }
      else{
        CONTINUE_PAGING =true
        MAX_PARAGRAPH_LENGTH = 44
    }
  }

  /**
  * Adds page number to the footer of the page
  *
  * @param {jsPDF}  doc           PDF document object
  * @param {Number}   fontSize  = font.font_size.DEFAULT_FONT_SIZE, option to modify font siz

  * @return void
  * 
  */
 export function add_page_number(doc, fontSize = font.font_size.DEFAULT_FONT_SIZE){
  doc.setFont('fantasy')
     .setTextColor("#808080")
     .setFontSize(fontSize)
     .text(500,820, '' + doc.page); //print number bottom right
  doc.page ++;
 }

