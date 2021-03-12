export default {

    // all classes have the same bonus value and starting gold but the values have been made in to variables so as to allow for any differing cases (homebrew)

    classes: [
        {
            name: 'Barbarian',
            id: 1,
            class_bonus: ['Str', 'Con'],
            backgrounds: ['Clan champion', 'Caravan outrider', 'Fur trapper', 'Mountain tribeswoman', 'Wasteland survivalist', 'Gladiator'],
            bonus_value: 2,
            base_hp: 7,
            base_ac: 12,
            base_pd: 11,
            base_md: 10,
            background_points: 8,
            recovery_dice: "d10/lvl",
            base_recoveries: 8,
            starting_gold: "25gp OR 1d6 x 10gp",
        },
        {
            name: 'Bard',
            id: 2,
            class_bonus: ['Dex', 'Cha'],
            backgrounds: ['Wandering minstrel', 'Cathedral musician', 'Court jester', 'Mercenary', 'Tavern owner', 'Failed hedge wizard', 'Diplomat',
                'Spy', 'Royal taster', 'Caravan guide', 'Smuggler', 'Battle skald'],
            bonus_value: 2,
            base_hp: 7,
            base_ac: 12,
            base_pd: 10,
            base_md: 11,
            background_points: 8,
            recovery_dice: "d8/lvl",
            base_recoveries: 8,
            starting_gold: "25gp OR 1d6 x 10gp",
        },
        {
            name: 'Cleric',
            id: 3,
            class_bonus: ['Wis', 'Str'],
            backgrounds: ['Healer', 'Archivist', 'Military chaplain', 'Temple guard', 'Bartender', 'Reformed thief', 'Dwarven hierophant',
                'Initiate', 'Bishop'],
            bonus_value: 2,
            base_hp: 7,
            base_ac: 14,
            base_pd: 11,
            base_md: 11,
            background_points: 8,
            recovery_dice: "d8/lvl",
            base_recoveries: 8,
            starting_gold: "25gp OR 1d6 x 10gp",
        },
        {
            name: 'Fighter',
            id: 4,
            class_bonus: ['Str', 'Con'],
            backgrounds: ['Swordmaster', 'Mercenary captain', 'Sea raider', 'Shieldwall spearman', 'Explorer', 'Bouncer', 'Thug', 'City guardsman',
                'Former gladiator', 'Former orc captive', 'Bankrupt nobleman', 'Duelist', 'Goblin-hunter'],
            bonus_value: 2,
            base_hp: 8,
            base_ac: 15,
            base_pd: 10,
            base_md: 10,
            background_points: 8,
            recovery_dice: "d10/lvl",
            base_recoveries: 9,
            starting_gold: "25gp OR 1d6 x 10gp",
        },
        {
            name: 'Paladin',
            id: 5,
            class_bonus: ['Str', 'Cha'],
            backgrounds: ['City guardsman', 'Combat medic', 'Bodyguard', 'Outlaw hunter', 'Inquisitor'],
            bonus_value: 2,
            base_hp: 8,
            base_ac: 16,
            base_pd: 10,
            base_md: 12,
            background_points: 8,
            recovery_dice: "d10/lvl",
            base_recoveries: 8,
            starting_gold: "25gp OR 1d6 x 10gp",
        },
        {
            name: 'Ranger',
            id: 6,
            class_bonus: ['Dex', 'Str', 'Wis'],
            backgrounds: ['Tracker', 'Bounty hunter', 'Beast slayer', 'Woodsy assassin', 'Orc slayer', 'Wanderer'],
            bonus_value: 2,
            base_hp: 7,
            base_ac: 14,
            base_pd: 11,
            base_md: 10,
            background_points: 8,
            recovery_dice: "d8/lvl",
            base_recoveries: 8,
            starting_gold: "25gp OR 1d6 x 10gp",
        },
        {
            name: 'Rogue',
            id: 7,
            class_bonus: ['Dex', 'Cha'],
            backgrounds: ['Street thug', 'Cat burglar', 'Diplomat', 'Professional gambler', 'Courtier', 'Jewel thief',
                'Acrobat', 'Con artist', 'Bartender', 'Spy master', 'Pirate', 'Dandy', 'Rat catcher'],
            bonus_value: 2,
            base_hp: 6,
            base_ac: 12,
            base_pd: 12,
            base_md: 10,
            background_points: 8,
            recovery_dice: "d8/lvl",
            starting_gold: "25gp OR 1d6 x 10gp",
        },
        {
            name: 'Sorcerer',
            id: 8,
            class_bonus: ['Cha', 'Con'],
            backgrounds: ['Tribal shaman', 'Pirate captain', 'Spell-arena gladiator', 'Failed wizard', 'Sahuagin hunter'],
            bonus_value: 2,
            base_hp: 6,
            base_ac: 10,
            base_pd: 11,
            base_md: 10,
            background_points: 8,
            recovery_dice: "d6/lvl",
            base_recoveries: 8,
            starting_gold: "25gp OR 1d6 x 10gp",
        },
        {
            name: 'Wizard',
            id: 9,
            class_bonus: ['Int', 'Wis'],
            backgrounds: ['Magical prodigy', 'Spell thief', 'Hedge wizard', 'Transformed familiar', 'Ship\'s wizard', 'Royal poisnoner'],
            bonus_value: 2,
            base_hp: 6,
            base_ac: 10,
            base_pd: 10,
            base_md: 12,
            background_points: 8,
            recovery_dice: "d6/lvl",
            base_recoveries: 8,
            starting_gold: "25gp OR 1d6 x 10gp",
        },
    ],


    // interesting cases: Humans and Gearforged can take a bonus in any of the 6 abilities
    // Goblins, Nyama and Starchild have 3 bonus options rather than 2
    // Half-ogres and pixies get +3 to their bonus rather than +2
    races: [
        // 1-8 =  "Major Races"
        {
            name: 'Dwarf',
            id: 1,
            race_bonus: ['Con', 'Wis'],
            bonus_value: 2,
            source: 'Core Book'
        },
        {
            name: 'Gnome',
            id: 2,
            race_bonus: ['Dex', 'Int'],
            bonus_value: 2,
            source: 'Core Book'
        },
        {
            name: 'Half-elf',
            id: 3,
            race_bonus: ['Con', 'Cha'],
            bonus_value: 2,
            source: 'Core Book'
        },
        {
            name: 'Halfling',
            id: 4,
            race_bonus: ['Con', 'Dex'],
            bonus_value: 2,
            source: 'Core Book'
        },
        {
            name: 'Half-orc',
            id: 5,
            race_bonus: ['Str', 'Dex'],
            bonus_value: 2,
            source: 'Core Book'
        },
        {
            name: 'High Elf',
            id: 6,
            race_bonus: ['Int', 'Cha'],
            bonus_value: 2,
            source: 'Core Book'
        },
        {
            name: 'Human',
            id: 7,
            race_bonus: ['Str', 'Con', 'Dex', 'Int', 'Wis', 'Cha'],
            bonus_value: 2,
            source: 'Core Book'
        },
        {
            name: 'Wood Elf',
            id: 8,
            race_bonus: ['Dex', 'Wis'],
            bonus_value: 2,
            source: 'Core Book'
        },
        // 9 - 21 = "Additional Races" 
        {
            name: 'Alleykin',
            id: 9,
            race_bonus: ['Dex', 'Cha'],
            bonus_value: 2,
            source: 'Book of Ages'
        },
        {
            name: 'Arcanite',
            id: 10,
            race_bonus: ['Int', 'Cha'],
            bonus_value: 2,
            source: 'Book of Ages'
        },
        {
            name: 'Beastblooded',
            id: 11,
            race_bonus: ['Con', 'Dex'],
            bonus_value: 2,
            source: 'Book of Ages'
        },
        {
            name: 'Dark Elf',
            id: 12,
            race_bonus: ['Dex', 'Cha'],
            bonus_value: 2,
            source: 'Core Book'
        },
        {
            name: 'Dragonic / Dragonspawn',
            id: 13,
            race_bonus: ['Str', 'Cha'],
            bonus_value: 2,
            source: 'Core Book'
        },
        {
            name: 'Forgeborn / Dwarf-Forged',
            id: 14,
            race_bonus: ['Str', 'Con'],
            bonus_value: 2,
            source: 'Core Book'
        },
        {
            name: 'Holy One / Aasimar',
            id: 15,
            race_bonus: ['Wis', 'Cha'],
            bonus_value: 2,
            source: 'Core Book'
        },
        {
            name: 'Lizardman',
            id: 16,
            race_bonus: ['Con', 'Dex'],
            bonus_value: 2,
            source: 'Book of Ages'
        },
        {
            name: 'Space Corps Explorer',
            id: 17,
            race_bonus: ['Dex', 'Int'],
            bonus_value: 2,
            source: 'Book of Ages'
        },
        {
            name: 'Spiritborn',
            id: 18,
            race_bonus: ['Wis', 'Cha'],
            bonus_value: 2,
            source: 'Book of Ages'
        },
        {
            name: 'Tiefling / Demontouched',
            id: 19,
            race_bonus: ['Str', 'Int'],
            bonus_value: 2,
            source: 'Core Book'
        },
        {
            name: 'Twygzog',
            id: 20,
            race_bonus: ['Str', 'Con'],
            bonus_value: 2,
            source: 'Bestiary'
        },
        {
            name: 'Unholy One',
            id: 21,
            race_bonus: ['Str', 'Cha'],
            bonus_value: 2,
            source: 'Book of Ages'
        },
        // 22-49 = 3rd Party Races
        {
            name: 'Catfolk',
            id: 22,
            race_bonus: ['Dex', 'Cha'],
            bonus_value: 2,
            source: 'BoHR1'
        },
        {
            name: 'Centaur',
            id: 23,
            race_bonus: ['Con', 'Dex'],
            bonus_value: 2,
            source: 'Midgard Bestiary'
        },
        {
            name: 'Firesoul',
            id: 24,
            race_bonus: ['Dex', 'Cha'],
            bonus_value: 2,
            source: 'DATP'
        },
        {
            name: 'Gearforged',
            id: 25,
            race_bonus: ['Str', 'Con', 'Dex', 'Int', 'Wis', 'Cha'],
            bonus_value: 2,
            source: 'Midgard Bestiary'
        },
        {
            name: 'Gnoll',
            id: 26,
            race_bonus: ['Str', 'Con'],
            bonus_value: 2,
            source: 'Midgard Bestiary'
        },
        {
            name: 'Goblin',
            id: 27,
            race_bonus: ['Con', 'Int', 'Wis'],
            bonus_value: 2,
            source: 'Midgard Bestiary'
        },
        {
            name: 'Hagborn',
            id: 28,
            race_bonus: ['Wis', 'Cha'],
            bonus_value: 2,
            source: 'BoHR1'
        },
        {
            name: 'Half-Ogre',
            id: 29,
            race_bonus: ['Str', 'Con'],
            bonus_value: 3,
            source: 'DATP'
        },
        {
            name: 'Hobgoblin',
            id: 30,
            race_bonus: ['Str', 'Int'],
            bonus_value: 2,
            source: 'Gods and Icons'
        },
        {
            name: 'Klik-Zeen',
            id: 31,
            race_bonus: ['Str', 'Dex'],
            bonus_value: 2,
            source: 'Gods and Icons'
        },
        {
            name: 'Kobold',
            id: 32,
            race_bonus: ['Dex', 'Int'],
            bonus_value: 2,
            source: 'Midgard Bestiary'
        },
        {
            name: 'Leomar',
            id: 33,
            race_bonus: ['Str', 'Dex'],
            bonus_value: 2,
            source: 'DATP'
        },
        {
            name: 'Lizardfolk',
            id: 34,
            race_bonus: ['Str', 'Dex'],
            bonus_value: 2,
            source: 'BoHR1'
        },
        {
            name: 'Merfolk',
            id: 35,
            race_bonus: ['Con', 'Cha'],
            bonus_value: 2,
            source: 'BoHR1'
        },
        {
            name: 'Minotaur',
            id: 36,
            race_bonus: ['Str', 'Wis'],
            bonus_value: 2,
            source: 'Midgard Bestiary'
        },
        {
            name: 'Nyama',
            id: 37,
            race_bonus: ['Str', 'Dex', 'Wis'],
            bonus_value: 2,
            source: 'DATP'
        },
        {
            name: 'Orc',
            id: 38,
            race_bonus: ['Str', 'Dex'],
            bonus_value: 2,
            source: 'DATP'
        },
        {
            name: 'Pixie',
            id: 39,
            race_bonus: ['Dex', 'Cha'],
            bonus_value: 3,
            source: 'DATP'
        },
        {
            name: 'Ratkin',
            id: 40,
            race_bonus: ['Con', 'Dex'],
            bonus_value: 2,
            source: 'DATP'
        },
        {
            name: 'Ravenfolk',
            id: 41,
            race_bonus: ['Dex', 'Wis'],
            bonus_value: 2,
            source: 'Midgard Bestiary'
        },
        {
            name: 'Roachling',
            id: 42,
            race_bonus: ['Con', 'Dex'],
            bonus_value: 2,
            source: 'Midgard Bestiary'
        },
        {
            name: 'Rocksoul',
            id: 43,
            race_bonus: ['Con', 'Int'],
            bonus_value: 2,
            source: 'DATP'
        },
        {
            name: 'Samsaran',
            id: 44,
            race_bonus: ['Int', 'Wis'],
            bonus_value: 2,
            source: 'BoHR1'
        },
        {
            name: 'Shadowborn',
            id: 45,
            race_bonus: ['Con', 'Wis'],
            bonus_value: 2,
            source: 'DATP'
        },
        {
            name: 'Star Child',
            id: 46,
            race_bonus: ['Int', 'Wis', 'Cha'],
            bonus_value: 2,
            source: 'DATP'
        },
        {
            name: 'Storm Soul',
            id: 47,
            race_bonus: ['Dex', 'Int'],
            bonus_value: 2,
            source: 'DATP'
        },
        {
            name: 'Vorhai / Greyskin',
            id: 48,
            race_bonus: ['Str', 'Con'],
            bonus_value: 2,
            source: 'DATP'
        },
        {
            name: 'Watersoul',
            id: 49,
            race_bonus: ['Con', 'Wis'],
            bonus_value: 2,
            source: 'DATP'
        },
    ]
}