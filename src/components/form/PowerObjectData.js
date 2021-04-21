const power = {


  power_name: "",


  power_description: {

      // powers will have 2 frequencies, the second will be "None" by default, and can be changed by the user
      // this allows for a 2nd frequency without it being required, if None, do not print on sheet, but keep track of in data

      // likely best handled by a drop down list, options (in order of priority) are: At-Will, Cyclical, Battle-Based, Recharge, Daily, and Other
      // i.e. if color coding a power that is Battle-Based and daily, color it as a Battle-Based power
      power_frequency_1: "", // *****
      power_uses_1: "", // -1 means "infinite use" such as an At-Will or Cyclical power; Battle-Based needs an int from 1-5, Recharge from 1-20, Daily from 1-5, Other is up to the player

      power_frequency_2: "", // not applicatble by default, i.e. only one frequncy
      power_uses_2: "",

      power_action_type: "", // Standard action is default if not specified, other options like "Ranged Spell", Close-Quarters Spell", etc.
      power_range: "", // no defualt, something like "One nearby enemy", "Enemy with most hitpoints", etc.

      power_target: "", // all powers I've seen have a target at least, but maybe allow this to be blank just in case
      power_attack:"", // can be left blank as not all powers have an attack
      power_hit: "", // can be left blank
      power_miss: "", // can be left blank

      power_other: "", // array of strings (?) so the user can write any information not covered above

      power_text: ""
  }

}

export default power;
