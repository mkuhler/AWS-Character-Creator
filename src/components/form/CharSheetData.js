/* Character sheet object that holds user input values */

// ***** denotes that the user is required to input a value for this field

const charsheet = {

    //version_number: "1.0.0", // should this be a single string or two floats for major/minor version?

    siteName: "AWS Character Creator",
    linkToSite: "",
    linkToRepo: "https://github.com/mkuhler/AWS-Character-Creator",

    // a version number should be set somewhere in the "main part of the program. This would be stored as a variable in a newly created sheet or read in from an existing one
    major_version: 1, // if major versions are different then the sheet should no longer be compatible.
    minor_version: 0, // if minor versions are differnt but major versions are the same the sheet should still be compatible
    // major and minor version would be combined in to a version number, i.e. 1.2.15

    //version_number: major_version.tostring() + '.' + minor_version.tostring(), // should this be a single string or two floats for major/minor version?

    // first page consist of basic info - things related to name, class, level, race, height, weight, age and gender
    basic_info: {

        name: "", // ***** used for determining name of file saved

        // bonuses increase the character's corresponding stats, are we calculating that or having the user do it? If we pull the data from this file it should be possible for use to calculate it
        class: "", // *****
        class_bonus_options: [], // two options specific to class, present 2 for base game classes but allow user to select any two to support homebrewing
        class_bonus_chosen: "", // which of the two bonus options the user selects, no default?

        level: "", // ***** level actually needs to be a string to allow for novice tiers, no default? N0 (lowest possible level) by default?

        race: "", // ***** elf, dragonborn, etc. no defualt?
        race_bonus_options: [], // two options specific to race, present 2 for base game classes but allow user to select any two to support homebrewing
        race_bonus_chosen: "", // which of the two bonus options the user chose

        height: "", // height and weight are enterred as two separate values but should be displayed in the same field in the final sheet
        weight: "",

        age: "", // similar to height/weight, age and gender are two separate fields but are displayed in the same box on the final sheet
        gender: ""


    },

    // still on first page
    // may need to calculate scores by factors including race, class, selected bonuses, etc.
    ability_scores: { // 2nd page, includes information on ability scores and modifiers

        strength: 10, // ints need a defualt value, 10 or 0 by default?
        constitution: 10,
        dexterity: 10, // ***** all required
        intelligence: 10,
        wisdom: 10,
        charisma: 10,

        // modifiers corresponding to each ability. Modifiers are generally equal to the number of levels above or below 10 / 2 rounded down, (ex a score of 12 is a modifier of 1, a score of 5 is a mod of -2)
        // we should calculate this in the app, but give the user teh ability to
        strength_mod: 0, // 0 by default
        constitution_mod: 0,
        dexterity_mod: 0,
        intelligence_mod: 0, // ****** all required
        wisdom_mod: 0,
        charisma_mod: 0
    }, // end of 1st page


    // maybe call this something else?
    character_attributes: { // 2nd page, deals with attributes relating to initiative, hitpoints, saving throws, recoveries, death saves

        initiative: "", // ***** should we calculate this? Level is a string to accommodate novice tiers so that may hinder things. generally (always?) a positive number
        initiative_description: "Level + Dex Mod", // has a default value, but user can change as some classes/races have different methods for calculating

        hitpoints_max: "", // ***** calculated with consitution and class/race (?), probably best left to user?
        hitpoints_current: "", // DO NOT SHOW THIS FIELD TO USER. final sheet should have this always be blank so user can write in values

        armor_class: "", // *****
        physical_defense: "", // ***** all neeeded to determine enemy damage dealt
        mental_defense: "", // *****

        // ***** not sure if theses should be strings?
        saving_throws_easy: 6,
        saving_throws_medium: 11, // not entirely sure how these are calcultated, every single sheet Tim has sent has 6/11/16 as the values
        saving_throws_hard: 16,
        saving_throws_optional: "", // optional descriptive text for user to include some mention of their character specific calculations

        recoveries: "", // how many recoveries the player has, for example "3d6+3"
        recoveries_optional: "Feat: Reroll three dice and take the higher result", // optional description of recoveries, for example: "Feat: Reroll three dice and take higher result"

        death_saves_max: "", // ***** not sure how to calculate. in Tim's sheets these are skulls / checkboxes for user to scratch off, a number may suffice but wouldn't be as visually appealling
        death_saves_current: "", // DO NOT SHOW THIS FIELD TO USER. final sheet should have this always be blank so user can write in values
    }, // end of 2nd page


    background_talents: { // 3rd page, deals with information related to icon relationships, "one unique thing", backgrounds, and talents and features

        // an array of tuples, each tuple has a string for a name, an int value for relationship tier, and a string value for the relationship being negative/positive
        // example - icon relationships [("Great Gold Wyrm", 1, "positive"), ("Darkness Between Starts", 2, "negative")]
        // there doesn't seem to be a specific minimum or maximum number of relationships a character can have (most of Tim's have 2 or 3), so we may need to allow the user to add more fields
        // 3 sets fields by default may be good, if the user doesn't input values print blank?

        // the genreator should support at least up to 5 (or more?) icon relationships, 1 by default

        //icon_relationships: {
                //relationship:
                //{   // ex Lich King 1 Negative, Emporer 2 Conflicted
                //    name: "", // who the relationship is with
                //    points: 0, // the numerical level of the relationship, (should be a positive or abs value number, no 0?)
                //    status: "" // positive, negative, or conflicted
                //},

                icon_relationship_names: [],
                icon_relationship_points: [], // should be a number (positive or negative)
                icon_relationship_statuses: [],
            //},

        icon_relationships_other: "", // an additional field for players to include any clarifications for icon relationships, blank by default

        one_unique_thing: "", // effectively just a string, can have impacts on skills (?) but that would best be left for the user to modify

        // a background generally consists of a number and a name, so this will be represented as a tuple - (int, "string")
        // the number can modify some values, but is likely context specific and would best be left to the user
        // there doesn't seem to be a specific minimum or maximum number of backgrounds a character can have (most of Tim's have 2 or 3), so we may need to allow the user to add more fields
        // 3 sets fields by default may be good, if the user doesn't input values print blank?
        background_numbers: [],
        background_names: [],
        //backgrounds: [(0, ""), (0, ""), (0, "")],

        // talents and feautres are a bit to complex/specific to create one specific type of tuple or object, so they're best represented as an array of strings (at least for now)
        // example - ["Breath Weapon: (Racial) Once per batle, make a close - quarters breath weapon atack as a quick action against one nearby enemy +7 vs PD; 3d6 fire damage",
        //            "Spirit Talking: Twice per day, you may speak to spirits." ]
        // no real limit on the number a character can have
        talents_and_features_names: [],
        talents_and_features_descriptions: []

    }, // end of 3rd page


    // powers may have to be their own class / data type so that we may more easily keep adding more ?
    // Most powers seem to have a name, one or more frequencies and a description typically consisting of information such: an action type, a range, a target, an effect and an "other" array of strings
    // that serves as a catch all for any misc information a power may have that isnt covered by the previous fields
    //character_powers: { // 4th page, deals with information relating to powers

    //    // an array of power objects, see below. Not sure if this will work ???
    //    powers: []

    //}, // end 4th page


    // currently not in use, to be added in a later implementation
    //incremental_advances: { // 5th page dealing with incremental advances, I thought it may be best to have this page be after powers/etc. because incremental advances are related to those things

    //    // values in incremental advances will have at minimum a boolean keeping track of if that advance is selected or not
    //    // some values may require a string for the name of the advance and as such are represented as tuples - (bool, "str")
    //    // There is no limit on the number of powers on which advances can be taken, so this will need to be dynamic array of tuples

    //    // all false by defualt, if false no name needed?
    //    ability_score: false,
    //    feat: (false, ""),
    //    hitpoints: false,
    //    magic_item: false,
    //    powers: [(false, ""), (false, "")], // ... etc, can be more or less than 2 entries, will need to let the user keep adding more fields?
    //    skills: (false, ""),
    //    icon_relation: false

    //}, // end of 5th page



    inventory_feats_and_journal: { // 6th page

        inventory: [], // array of strings

        magic_items: [], // array of strings

        journal_and_background_story: "", // array of strins instead ?

        feats: [] // array of strings, generally the name of the feat and the tier, example - "Elemental Healer (A)"
    }, // end of 6th page

    // powers may have to be their own class / data type so that we may more easily keep adding more ?
    // Most powers seem to have a name, one or more frequencies and a description typically consisting of information such: an action type, a range, a target, an effect and an "other" array of strings
    // that serves as a catch all for any misc information a power may have that isnt covered by the previous fields
    power_description: {

        power_name: [], // *****

        // powers will have 2 frequencies, the second will be "None" by default, and can be changed by the user
        // this allows for a 2nd frequency without it being required, if None, do not print on sheet, but keep track of in data

        // likely best handled by a drop down list, options (in order of priority) are: At-Will, Cyclical, Battle-Based, Recharge, Daily, and Other
        // i.e. if color coding a power that is Battle-Based and daily, color it as a Battle-Based power
        power_frequency_1: [], // *****
        power_uses_1: [], // -1 means "infinite use" such as an At-Will or Cyclical power; Battle-Based needs an int from 1-5, Recharge from 1-20, Daily from 1-5, Other is up to the player

        power_frequency_2: [], // not applicatble by default, i.e. only one frequncy
        power_uses_2: [],

        power_action_type: [], // Standard action is default if not specified, other options like "Ranged Spell", Close-Quarters Spell", etc.
        power_range: [], // no defualt, something like "One nearby enemy", "Enemy with most hitpoints", etc.

        power_target: [], // all powers I've seen have a target at least, but maybe allow this to be blank just in case
        power_attack:[], // can be left blank as not all powers have an attack
        power_hit: [], // can be left blank
        power_miss: [], // can be left blank

        power_other: [], // array of strings (?) so the user can write any information not covered above

        power_text: []
    }



    /*
    // maybe not for P0 ?
    additional_text_boxes: { // 7th page where the user can create additional text boxes with a title of their choice?

        text_boxes: [ // array of text boxes

            text_box: {
                title: "",
                content: ""

            },

            text_box: {

                title: "",
                content: ""
            }

        ]

    } // end of 7th page
 */


}

// a separate object for powers, character power would be an array of these
// frankly I'm not sure if this is the correct way to do this
// a separate object for powers, character power would be an array of these
// frankly I'm not sure if this is the correct way to do this
// const power = {




//     power_frequency_2: "None", // not applicatble by default, i.e. only one frequncy
//     power_uses_2: 0,

//     power_description: {

//         power_action_type: "Standard Action", // Standard action is default if not specified, other options like "Ranged Spell", Close-Quarters Spell", etc.
//         power_range: "", // no defualt, something like "One nearby enemy", "Enemy with most hitpoints", etc.

//         power_target: "One Engaged Creature", // all powers I've seen have a target at least, but maybe allow this to be blank just in case
//         power_attack: "", // can be left blank as not all powers have an attack
//         power_hit: "", // can be left blank
//         power_miss: "", // can be left blank

//         power_other: ["", ""] // array of strings (?) so the user can write any information not covered above
//     }

// }


export default charsheet;
