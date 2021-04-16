import { font, page, feat_magic_gear, powers } from './PDFConstants.js'

function measureInputText(name)
{
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var txtWidth = ctx.measureText(name).width;
    return txtWidth;
}

export function lengthy_entry(entry)
{
    var inputLength = Math.round(measureInputText(entry));

    if(inputLength > 120 && inputLength < 175)
    {
      var difference = inputLength / 10;
      var diff = Math.abs(font.font_size.DEFAULT_FONT_SIZE - difference);

      return Math.abs(font.font_size.DEFAULT_FONT_SIZE - diff)
    }
    else if(inputLength > 175)
    {
      return font.font_size.MINIMUM_FONT_SIZE
    }
    else
      return font.font_size.DEFAULT_FONT_SIZE
}

export function get_ellispis(name)
{
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");

  var charactersName = "";
  var letter = 0;

  if(measureInputText(name) > 175){

    for(let index=0; index<175; letter++)
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
 * @param  {Number} maxLineWidth  The maximum width of the text
 * @param  {String} font          = font.font_type.DEFAULT, text font
 * @return {Array}                Array of string lines split by maxLineWidth
 */
export function createParagraph(doc, text, maxLineWidth, fontType = font.font_type.DEFAULT, fontSize = font.font_size.MINIMUM_FONT_SIZE) {
    //var textLines = doc.splitTextToSize(text, maxLineWidth);
    //console.log(fontType);
    return  doc.setFontSize(fontSize)
               .splitTextToSize(text, maxLineWidth);
}

/**
 * Create a box around text
 * @param  {jsPDF}  doc             PDF document object
 * @param  {Number} x               x-coordinate of the text
 * @param  {Number} y               y-coordinate of the text
 * @param  {Number} paragraphHeight Height of the paragraph
 * @param  {Number} maxLineWidth  = Width of the paragraph
 * @param  {Number} padding       = page.DEFAULT_PADDING, Padding of the text box
 * @return {jsPDF}                  Rectangle around text
 */
export function createTextBox(doc, x, y, width, height, text = "", padding = page.DEFAULT_PADDING) {
  
  return doc.text(text, x + padding, y + padding)
            .rect(x, y, width + padding, height + padding);
  //return doc.rect(x, y, width, height);
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
      color = powers.color.GREEN;      // GREEN
      break;

    case 'Cyclical':
      color = powers.color.YELLOW;     // YELLOW
      break;

    case 'Battle-Based':
      color = powers.color.PURPLE;    // PURPLE
      break; 

    case 'Recharge':
      color = powers.color.RED;    // RED
      break;

    case 'Daily':
      color = powers.color.ORANGE;    // ORANGE
      break;
    
    case 'Other':
      color = powers.color.BLUE;    // BLUE
      break;
    
    default:
      color = powers.color.CYAN;    // CYAN
      break;
  }
  return color;
}

export function createPowerHeader(doc, x, y, name, frequency) {
  let headerColor = getPowerColor(frequency);       // Power color-coded based on its frequency
  var freqency_width = doc.getTextWidth(frequency);
  let width = powers.WIDTH - powers.MARGIN;
  let height = powers.header.HEIGHT - powers.MARGIN;

  return doc.setFillColor(headerColor)
            .rect(x, y, width, height, 'F')
            .setTextColor('white')
            .setFontSize(powers.FONT_SIZE)
            .setFont(font.font_type.DEFAULT, 'bold')
            .text(name, x + powers.PADDING, y + powers.PADDING)
            .text(frequency, x + (width - powers.PADDING - freqency_width), y + powers.PADDING);
}

export function createPowerBody(doc, x, y, description) {
  let heightTotal = 0;

  // Loop through the power description object and print each
  Object.keys(description).forEach(function(key, index) {
    let keyName = key;
    let value = description[key];

    if (key === 'power_action_type') {
      keyName = description[key];
      value = '';
    } else if (key.startsWith(powers.KEY_PREFIX)) {
      keyName = key.slice((powers.KEY_PREFIX).length).replace('_', ' ') + ': ';
    }

    keyName = keyName.charAt(0).toUpperCase() + keyName.slice(1);
    
    // Break up the value into lines based on the maximum width of powers
    value = createParagraph(doc, (keyName + ": " + value), powers.WIDTH, font.font_type.DEFAULT, powers.FONT_SIZE);
    value[0] = value[0].substring(value[0].indexOf(": ") + 3);

    let value_x = doc.getTextWidth(keyName);
    let line_y = Number(y + (font.LINE_HEIGHT * index));

    // If the text of our power starts to exceed the maximum, break
    if ((heightTotal + font.LINE_HEIGHT)  >= powers.body.HEIGHT) {
      doc.text('...', x + value_x, line_y + (index * line_y));
      return heightTotal;
    }

    // TODO: SET TEXT SMALLER OR ELIPSIS IF IT EXCEEDS THE BOUNDARIES
    // TODO: SCALE BASED ON HOW MUCH ROOM LEFT
    doc.setFontSize(10)
       .setTextColor('black')
       .setFontSize(powers.FONT_SIZE)
       .setFont(font.font_type.DEFAULT, 'bold')
       .text(keyName, x, line_y);
    
    // Loop through each line of the value text and add to the page, checking with max height. 
    let line_x = x + value_x;
    
    value.forEach((line, lineIndex) => {
      line_x = (lineIndex === 0) ? x + value_x : x;

      doc.setFont(font.font_type.DEFAULT, 'normal')
         .text(line, line_x, line_y + (lineIndex * font.LINE_HEIGHT));
    });
    
    // Compute total height of the power's body
    heightTotal += font.LINE_HEIGHT * value.length;
  });

  return heightTotal;
}

/**
 * @brief Creates a power on the page with a header and body
 * @param {jsPDF}   doc 
 * @param {int}     row 
 * @param {int}     col 
 * @param {Object}  power 
 */
export function createPower(doc, row, col, power) {

  let x = powers.X + (col * powers.WIDTH) + page.PAGE_MARGIN
  let header_y = powers.Y + (row * (powers.header.HEIGHT + powers.body.HEIGHT)) + page.PAGE_MARGIN;
  let body_y = Number(header_y + powers.header.HEIGHT + page.PAGE_MARGIN);

  createPowerHeader(doc, x, header_y, power.power_name, power.power_frequency_1);
  let bodyHeight = createPowerBody(doc, x, body_y, power.power_description); 
  
  return header_y + bodyHeight;
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
   export function extend_textfield(items, doc, x_Cord){
    
    feat_magic_gear.HEIGHT_DIFFER = 180;

    var y_Cord = 50;
    for(var i = 0; i <items.length; i++)
    {
      doc.text(x_Cord, y_Cord, items[i]);
      if(y_Cord > feat_magic_gear.FIXED_HEIGHT){
        feat_magic_gear.FIXED_HEIGHT += 15
      }
      y_Cord += 15;
    }
    feat_magic_gear.HEIGHT_DIFFER = feat_magic_gear.FIXED_HEIGHT - feat_magic_gear.HEIGHT_DIFFER;
  }