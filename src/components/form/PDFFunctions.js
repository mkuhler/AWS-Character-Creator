import { font, page, feat_magic_gear } from './PDFConstants.js'

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
 * @param  {String} font          = font.type_font.DEFAULT, text font
 * @return {Array}                Array of string lines split by maxLineWidth
 */
export function createParagraph(doc, text, maxLineWidth, fontType = font.type_font.DEFAULT, fontSize = font.font_size.MINIMUM_FONT_SIZE) {
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