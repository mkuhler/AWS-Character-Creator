import { connect } from 'formik';
import jsPDF from 'jspdf';
import { font, page, feat_magic_gear, powers, journal } from './PDFConstants.js'

// var EPIC_JOURNAL = ""
// var MAX_PARAGRAPH_LENGTH = 44
// var CONTINUE_PAGING = true
// var MAX_HEIGHT = 0
// var LINES=0
// var PARAGRAPH_LINES = 0

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
export function createTitle(doc, x, y, text, fontSize = font.font_size.TITLE_FONT_SIZE){
  return doc.setFont('fantasy')
            .setTextColor("#808080")
            .setFontSize(fontSize)
            .text(x, y, text.toUpperCase());
}

export function createListTitle(doc, x, y, title) {
  doc.setFontSize(10)
       .setTextColor('black')
       .setFontSize(powers.FONT_SIZE)
       .setFont(font.font_type.DEFAULT, 'bold')
       .text(title, x, y);
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
 * @param  {Number} maxLineWidth  The maximum width of the text
 * @param  {Number} maxLines      The maximum amount of lines paragraph can hold
 * @param  {String} font          = font.font_type.DEFAULT, text font
 * @return {Array}                Array of string lines split by maxLineWidth
 */
 export function createParagraph(doc, text, maxLineWidth, maxLines = (page.PAGE_HEIGHT / font.LINE_HEIGHT)) {
   var lines = doc.splitTextToSize(text, maxLineWidth)

    maxLines = lines.length - maxLines ;

    if(maxLines > 0)
       return lines.slice(0, -maxLines);
    else
      return lines
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
export function createJournalParagraph(doc, text, startHight, startWidth, maxLineWidth, fontType = font.type_font.DEFAULT, fontSize = font.font_size.MINIMUM_FONT_SIZE) {

    var lines = doc.setFontSize(fontSize)
                   .setTextColor('')
                   .splitTextToSize(text, maxLineWidth)

    if(lines.length > 44){
      var break_paragraph = lines.length - journal.MAX_PARAGRAPH_LENGTH

      var lines = doc.setFontSize(fontSize)
                     .setTextColor('')
                     .splitTextToSize(text, maxLineWidth)
                     .slice(0, -break_paragraph);

      journal.EPIC_JOURNAL = doc.setFontSize(fontSize)
                                .setTextColor('')
                                .splitTextToSize(text, maxLineWidth)
                                .slice(-break_paragraph);
    }

    doc.text(startHight, startWidth, lines);

    return lines;
}

/**
 * @brief Creates a list formatted with bold titles and inline descriptions that conform to a max width
 * @param {jsPDF}   doc
 * @param {Number}  x
 * @param {Number}  y
 * @param {Array}   titles
 * @param {Array}   descriptions
 */
export function createList(doc, x, y, width, titles, descriptions, maxLines = (page.PAGE_HEIGHT / font.LINE_HEIGHT), separator = " ") {
  var current_y = y;
  var lines = 0;
  var listProperties = {
    height: 0,
    titleOverflow: [],
    descriptionOverflow: []
  };

  // Loop through each of the list items to add to the doc
  for(var i = 0; i < titles.length; i++) {

    var description = descriptions[i];

    // Create bold title text on the page only if both title and description are filled out
    if (description !== "" && title !== "") {
      // Create bold title text on the page
      var title = titles[i] + separator;
      createListTitle(doc, x, current_y, title);
    }

    if (description !== "") {
      // Add name to description, create paragraph to convert from string to array of strings, then remove name from array
      description = createParagraph(doc, (title + description), width, (page.PAGE_HEIGHT / font.LINE_HEIGHT), font.font_type.DEFAULT, powers.FONT_SIZE);
      description[0] = description[0].replace(title,'');

      // Get the width of the title to offset with the first line of descriptions
      var description_x = doc.getTextWidth(title);

      lines += description.length;

      // If we exceed the alloted number of lines, add the cut-off title/description combo to overflow
      if (lines > maxLines) {
        listProperties.titleOverflow = titles.slice(maxLines);
        listProperties.descriptionOverflow = descriptions.slice(maxLines);
        break;
      }

      // Otherwise, loop through the description and print lines
      description.forEach((line, lineIndex) => {
        var line_x = (lineIndex === 0) ? x + description_x : x;

        doc.setFont(font.font_type.DEFAULT, 'normal')
          .text(line, line_x, current_y + (lineIndex * font.LINE_HEIGHT));
      });

      // Update current height of the list
      current_y += (description.length * font.LINE_HEIGHT) + page.DEFAULT_PADDING;

    }
  }

  listProperties.height = current_y - y;
  console.log(listProperties);
  return listProperties;
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
export function createTextBox(doc, x, y, width, height, text = "", fontSize = font.font_size.MINIMUM_FONT_SIZE, fontType = font.font_type.DEFAULT) {
  journal.MAX_HEIGHT = 0;
  let padding = page.DEFAULT_PADDING;
  let fontColor = font.font_size.MINIMUM_FONT_SIZE;

  return doc.setFontSize(fontSize)
            .setTextColor(fontColor)
            .setFont(fontType, 'normal')
            .text(text, x + padding, y + (padding * 2))
            .rect(x, y, width + padding, height + padding);

}

/**
 * @brief Given the power type, returns the appropriate color code
 * @param {String} type
 * @returns
 */
function getPowerColor(type) {
  let color = 'red';

  switch(type) {
    case 'At-Will':
      color = powers.color.GREEN;
      break;

    case 'Cyclical':
      color = powers.color.YELLOW;
      break;

    case 'Battle-Based':
      color = powers.color.RED;
      break;

    case 'Recharge':
      color = powers.color.PURPLE;
      break;

    case 'Daily':
      color = powers.color.BLUE;
      break;

    case 'Other':
      color = powers.color.ORANGE;
      break;

    default:
      color = powers.color.GREY;
      break;
  }
  return color;
}

/**
 * @brief Creates the header for powers and sets correct color
 * @param {jsPDF} doc 
 * @param {Number} x 
 * @param {Number} y 
 * @param {String} name 
 * @param {String} frequency 
 * @param {String} uses 
 */
export function createPowerHeader(doc, x, y, name, frequency, uses) {
  let headerColor = getPowerColor(frequency);       // Power color-coded based on its frequency
  let useFrequency = (uses !== "") ? uses + " / " + frequency : frequency;
  let useFrequencyWidth = doc.getTextWidth(useFrequency);
  let width = powers.WIDTH - powers.MARGIN;
  let height = powers.header.HEIGHT - powers.MARGIN;
  let fillHeight = height;
  let checkboxOffset = (powers.FREQUENCY_CHECKBOX.includes(frequency)) ? 10 : 0;

  let useFrequencyX = x + width - (powers.PADDING + useFrequencyWidth + checkboxOffset);
  let useFrequencyY = y + powers.PADDING;

  // If all of the text in the header exceeds the limit, add the text to a new line
  if ((useFrequencyWidth + doc.getTextWidth(name) + checkboxOffset + (powers.PADDING * 2)) > width) {
    useFrequencyX = x + powers.PADDING;
    useFrequencyY += font.LINE_HEIGHT;
    fillHeight += font.LINE_HEIGHT;
  }

  // If the name exceeds the limit for the power, cut off
  if ((doc.getTextWidth(name) + checkboxOffset + (powers.PADDING * 2)) > width) {
    let maxCharacters = 28;

    name = name.substring(0, maxCharacters);
    name += "...";
    console.log("NAME: " + name);
    console.log("LAST INDEX OF STRING " + maxCharacters);
  }

  doc.setFillColor(headerColor)
     .rect(x, y, width, fillHeight, 'F');

  // TODO: CHECK FOR NUMBER OF BOXES TO ADD
  
  if (powers.FREQUENCY_CHECKBOX.includes(frequency)) {
    checkboxOffset = 10;
    doc.setFillColor('white')
       .rect(x + (width - powers.PADDING), y + 4, 10, 10, 'FD');
  }
  
  doc.setTextColor('white')
     .setFontSize(powers.FONT_SIZE)
     .setFont(font.font_type.DEFAULT, 'bold')
     .text(name, x + powers.PADDING, y + powers.PADDING)
     .setTextColor("#ffffff")
     .text(useFrequency, useFrequencyX, useFrequencyY);

  return fillHeight + page.PAGE_MARGIN;
}

/**
 *
 * @param {jsPDF} doc
 * @param {Number} x
 * @param {Number} y
 * @param {String} description
 * @returns The total height of the body
 */
export function createPowerBody(doc, x, y, description) {
  let heightTotal = 0;
  let titles = [];
  let descriptions = [];
  let maxLines = 20;

  // Loop through the power description object and print each
  Object.keys(description).forEach(function(key, index) {
    let keyName = key;
    let value = description[key];

    if (key === 'power_action_type') {
      keyName = "";
      value = description[key];
    } else if (key.startsWith(powers.KEY_PREFIX)) {
      keyName = key.slice((powers.KEY_PREFIX).length).replace('_', ' ');
      keyName = keyName.charAt(0).toUpperCase() + keyName.slice(1) + ': ';
    }

    // Add the title and description of the list item to arrays to be passed to createList
    titles.push(keyName);
    descriptions.push(value);
  });

  let list = createList(doc, x, y, powers.WIDTH, titles, descriptions, maxLines);
  heightTotal += list.height;

  return heightTotal;
}

/**
 * @brief Creates a power on the page with a header and body
 * @param {jsPDF}   doc
 * @param {int}     row
 * @param {int}     col
 * @param {Object}  power
 */
export function createPower(doc, row, col, height, power) {

  let x = powers.X + (col * powers.WIDTH) + page.PAGE_MARGIN
  let header_y = height + page.PAGE_MARGIN;
  let body_y = Number(header_y + page.PAGE_MARGIN);

  let headerHeight = createPowerHeader(doc, x, header_y, power.power_name, power.power_frequency_1, power.power_uses_1);
  let bodyHeight = createPowerBody(doc, x, header_y + page.PAGE_MARGIN + headerHeight, power.power_description);

  return header_y + bodyHeight;
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
                     .splitTextToSize(material, 160)

      console.log(items);
      doc.text(x_Cord, y_Cord, goods);

      if(goods.length > 1){
        y_Cord += 25;
      }
      else if(goods.length > 2){
        y_Cord += 35;
      }
      else
        y_Cord += 15;
    }
    expand_textfield(doc, items, y_Cord, box_hight, hight_difference, true, 10, 1000)
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
  export function expand_textfield(doc, entry, y_cord, box_hight, hight_difference, entries, number_of_entries, max_height)
  {
  feat_magic_gear.FIXED_HEIGHT = box_hight;
  feat_magic_gear.HEIGHT_DIFFER = hight_difference;

  journal.MAX_HEIGHT = max_height

  for(var i = 0; i < entry.length; i++)
  {
    if(i > number_of_entries){
      feat_magic_gear.FIXED_HEIGHT += 15
      if(entries===true){
        journal.LINES+=1
        journal.PARAGRAPH_LINES+=15
      }
    }
  }

  if(feat_magic_gear.FIXED_HEIGHT < journal.MAX_HEIGHT){
    feat_magic_gear.HEIGHT_DIFFER = feat_magic_gear.FIXED_HEIGHT - feat_magic_gear.HEIGHT_DIFFER;

    journal.MAX_PARAGRAPH_LENGTH-=journal.LINES
  }
  else{
    feat_magic_gear.HEIGHT_DIFFER = journal.MAX_HEIGHT - journal.PARAGRAPH_LINES
    journal.PARAGRAPH_LINES = 0;
    journal.LINES = 0;
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
    if(journal.EPIC_JOURNAL!==''){
      journal.MAX_PARAGRAPH_LENGTH = 66
      doc.addPage();
      add_page_number(doc);
      createTitle(doc, offset + (page_width / 3 * 0), 20, "JOURNAL");
      createTextBox(doc, offset + (page_width / 3 * 0), 30, (page.PAGE_WIDTH / 3) + 360, 750, "");
      createJournalParagraph(doc, journal.EPIC_JOURNAL, offset + 5, 40, 570, '', 10 );

      epic_story(journal.EPIC_JOURNAL.length, doc, offset, page_width)

    }
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
      if(story_lines > 66)
      {
        add_jounrnal_page(doc, offset, page_width)
      }
      else {
        journal.CONTINUE_PAGING =true
        journal.MAX_PARAGRAPH_LENGTH = 44
        journal.EPIC_JOURNAL = ''
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
