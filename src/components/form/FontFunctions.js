import { font } from './FontData.js'

export function lengthy_entry(entry){
    if(entry.length > 24 && entry.length < 35)
    {
      var difference = entry.length - 24;
      return font.font_size.DEFAULT_FONT_SIZE - difference/2
    }
    else if(entry.length > 35)
    {
      return font.font_size.MINIMUM_FONT_SIZE
    }
    else
      return font.font_size.DEFAULT_FONT_SIZE
  }

  export function get_ellispis(name){
    if(name.length > 35){
      var res = name.substr(0,35);
      return res + "..."
    }
    else {
      return name
    }
  }
