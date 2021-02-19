import { font } from './FontSizing.js'

function measureInputText()
{
    var name = document.getElementsByName('name')[0];
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var txtWidth = ctx.measureText(name.value).width;

    return txtWidth;
}

export function lengthy_entry(entry)
{
    var inputLength = Math.round(measureInputText());

    if(inputLength > 120 && inputLength < 170)
    {
      var difference = inputLength / 10;
      var diff = Math.abs(font.font_size.DEFAULT_FONT_SIZE - difference);

      return Math.abs(font.font_size.DEFAULT_FONT_SIZE - diff)
    }
    else if(inputLength > 170)
    {
      return font.font_size.MINIMUM_FONT_SIZE
    }
    else
      return font.font_size.DEFAULT_FONT_SIZE
}

export function get_ellispis(name)
{
  var character = document.getElementsByName('name')[0];
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");

  var charactersName = "";
  var letter = 0;

  if(measureInputText() > 170){

    for(let index=0; index<170; letter++)
    {
      var charWidth = ctx.measureText(character.value.charAt(letter)).width;
      index+=charWidth;
      charactersName+=character.value.charAt(letter);
    }
    return charactersName + "..."
  }
  else {
    return name
  }
}
