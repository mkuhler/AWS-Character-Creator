export default {

    // hitpoints = (base hp + con mod) * a value below corresponding to level (indexing from 1, so index = level - 1) Not sure how to account for novice tier levels
    // i.e. level 1 = (base hp + con mod) * 3
    total_hitpoints_multiplier: [3, 4, 5, 6, 8, 10, 12, 16, 20, 24],

    // each array below corresponds to levels 1-10, each index in the array corresponds to adventurer, chanmpion and epir tier feats respectively
    // for example, at level 5 (index 4) a character has 4 adventurer tier feats and 1 champion tier feat
    total_feats: [[1, 0, 0], [2, 0, 0], [3, 0, 0], [4, 0, 0], [4, 1, 0], [4, 2, 0], [4, 3, 0], [4, 3, 1], [4, 3, 2], [4, 3, 3]],

    // each attribute corresponds to a level, no bonus at level 1, +1 to 3 abilities at level 4, etc.
    ability_bonuses: ['', '', , '+1 to 3 abilities', '', '', '+1 to 3 abilities', '', '', '+1 to 3 abilities'],

    // each attribute corresponds to a level, that number is then multiplied by the ability modifier
    // for example, level 1 is 1 x mod, level 5 is 2 x mod
    damage_bonus: [1, 1, 1, 1, 2, 2, 2, 3, 3, 3],


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

            source: 'Core Book',
            source_link: 'https://www.drivethrurpg.com/product/118994/13th-Age-Core-Book',

            // each array corresponds to an armor type: None, Light, Heavy and Shield
            // first value corresponds to Base AC, 2nd number is atk penalty
            // ex a Barbarian has a base AC of 13 for heavy armor and an attack penalty of -2
            // armor: [[10, 0], [12, 0], [13, -2], [1, 0]],

            armor:
            [
                {
                    none: {
                        base_ac: 10,
                        atk_penalty: 0,
                    },
                    light: {
                        base_ac: 12,
                        atk_penalty: 0,
                    },
                    heavy: {
                        base_ac: 13,
                        atk_penalty: -2,
                    },
                    shield: {
                        base_ac: 1,
                        atk_penalty: 0,
                    },

                }
            ],

            weapons:
            [
                {
                    melee:
                    [
                        {
                            small: {
                                one_handed:
                                {
                                    damage: '1d4',
                                    penalty: 0,
                                    weapons: 'dagger',
                                },
                                two_handed:
                                {
                                    damage: '1d6',
                                    penalty: 0,
                                    weapons: 'club',
                                },
                            },

                            light: {
                                one_handed:
                                {
                                    damage: '1d6',
                                    penalty: 0,
                                    weapons: 'hand-axe, warclub',
                                },
                                two_handed:
                                {
                                    damage: '1d8',
                                    penalty: 0,
                                    weapons: 'spear',
                                },
                            },

                            heavy: {
                                one_handed:
                                {
                                    damage: '1d8',
                                    penalty: 0,
                                    weapons: 'longsword, battleaxe',
                                },
                                two_handed:
                                {
                                    damage: '1d10',
                                    penalty: 0,
                                    weapons: 'greatsword, greataxe',
                                },
                            },
                        },
                    ],

                    ranged:
                    [
                        {
                            small:
                            {
                                thrown:
                                {
                                    damage: '1d4',
                                    penalty: 0,
                                    weapons: 'dagger',
                                },
                                crossbow:
                                {
                                    damage: '1d4',
                                    penalty: -5,
                                    weapons: 'hand crossbow',
                                },
                                bow: 
                                {
                                    damage: '',
                                    penalty: 0,
                                    weapons: '',
                                },
                            },

                            light:
                            {
                                thrown:
                                {
                                    damage: '1d6',
                                    penalty: 0,
                                    weapons: 'javelin, axe, spear',
                                },
                                crossbow:
                                {
                                    damage: '1d6',
                                    penalty: -5,
                                    weapons: 'light crossbow',
                                },
                                bow:
                                {
                                    damage: '1d6',
                                    penalty: 0,
                                    weapons: 'shortbow',
                                },
                            },

                            heavy: {
                                thrown:
                                {
                                    damage: '',
                                    penalty: 0,
                                    weapons: '',
                                },
                                crossbow:
                                {
                                    damage: '1d8',
                                    penalty: -5,
                                    weapons: 'heavy crossbow',
                                },
                                bow:
                                {
                                    damage: '1d8',
                                    penalty: 0,
                                    weapons: 'longbow',
                                },
                            },
                        }
                    ],
                }
            ],
          
            level_progressions:
            [
                {
                    // similar to total feats, each outer array corresponds to a level 1-10, each inner element corresponds to an
                    // adventurer, champion or epic tier talent
                    class_talents: [[3, 0, 0], [3, 0, 0], [3, 0, 0], [3, 0, 0], [3, 1, 0], [3, 1, 0], [3, 1, 0], [3, 1, 1], [3, 1, 1], [3, 1, 1]],
                }
            ],

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

            source: 'Core Book',
            source_link: 'https://www.drivethrurpg.com/product/118994/13th-Age-Core-Book',

            armor:
            [
                {
                    none: {
                        base_ac: 10,
                        atk_penalty: 0,
                    },
                    light: {
                        base_ac: 12,
                        atk_penalty: 0,
                    },
                    heavy: {
                        base_ac: 13,
                        atk_penalty: -2,
                    },
                    shield: {
                        base_ac: 1,
                        atk_penalty: -1,
                    },

                }
            ],


            weapons:
            [
                {
                    melee:
                        [
                            {
                                small: {
                                    one_handed:
                                    {
                                        damage: '1d4',
                                        penalty: 0,
                                        weapons: 'dagger',
                                    },
                                    two_handed:
                                    {
                                        damage: '1d6',
                                        penalty: 0,
                                        weapons: 'club',
                                    },
                                },

                                light: {
                                    one_handed:
                                    {
                                        damage: '1d6',
                                        penalty: 0,
                                        weapons: 'mace, shortsword',
                                    },
                                    two_handed:
                                    {
                                        damage: '1d8',
                                        penalty: 0,
                                        weapons: 'spear',
                                    },
                                },

                                heavy: {
                                    one_handed:
                                    {
                                        damage: '1d8',
                                        penalty: 0,
                                        weapons: 'longsword, scimitar',
                                    },
                                    two_handed:
                                    {
                                        damage: '1d10',
                                        penalty: -2,
                                        weapons: 'greatsword, dire flail',
                                    },
                                },
                            },
                        ],

                    ranged:
                        [
                            {
                                small:
                                {
                                    thrown:
                                    {
                                        damage: '1d4',
                                        penalty: 0,
                                        weapons: 'dagger',
                                    },
                                    crossbow:
                                    {
                                        damage: '1d4',
                                        penalty: 0,
                                        weapons: 'hand crossbow',
                                    },
                                    bow:
                                    {
                                        damage: '',
                                        penalty: 0,
                                        weapons: '',
                                    },
                                },

                                light:
                                {
                                    thrown:
                                    {
                                        damage: '1d6',
                                        penalty: 0,
                                        weapons: 'javelin, axe',
                                    },
                                    crossbow:
                                    {
                                        damage: '1d6',
                                        penalty: 0,
                                        weapons: 'light crossbow',
                                    },
                                    bow:
                                    {
                                        damage: '1d6',
                                        penalty: 0,
                                        weapons: 'shortbow',
                                    },
                                },

                                heavy: {
                                    thrown:
                                    {
                                        damage: '',
                                        penalty: 0,
                                        weapons: '',
                                    },
                                    crossbow:
                                    {
                                        damage: '1d8',
                                        penalty: -1,
                                        weapons: 'heavy crossbow',
                                    },
                                    bow:
                                    {
                                        damage: '1d8',
                                        penalty: -2,
                                        weapons: 'longbow',
                                    },
                                },
                            }
                        ],
                }
            ],


            level_progressions:
            [
                {
                    // each array corresponsds to a level 1-10
                    battle_cries: ['2', '2, up to 1st level', '3 up to 3rd level', '3 up to 3rd level', '3 up to 5th level', '4 up to 5th level',
                        '4, up to 7th level', '5, up tp 7th level', '5, up to 9th level', '6 up to 9th level'],

                    // each array corresponsds to a level, each element in the array corresponds to spells and songs at 1st, 3rd, 5th, 7th and 9th level
                    // for example at level 5 you have 3 spells and songs at 3rd level, 2 spells and songs at 5th level
                    spells_and_songs: [[2, 0, 0, 0, 0], [3, 0, 0, 0, 0], [1, 2, 0, 0, 0], [0, 4, 0, 0, 0], [0, 3, 2, 0, 0], [0, 0, 5, 0, 0],
                                        [0, 0, 3, 3, 0], [0, 0, 0, 6, 0], [0, 0, 0, 4, 3], [0, 0, 0, 0, 9]],

                }
            ],
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

            source: 'Core Book',
            source_link: 'https://www.drivethrurpg.com/product/118994/13th-Age-Core-Book',

            armor:
            [
                {
                    none: {
                        base_ac: 10,
                        atk_penalty: 0,
                    },
                    light: {
                        base_ac: 12,
                        atk_penalty: 0,
                    },
                    heavy: {
                        base_ac: 14,
                        atk_penalty: 0,
                    },
                    shield: {
                        base_ac: 1,
                        atk_penalty: 0,
                    },

                }
            ],


            weapons:
            [
                {
                    melee:
                        [
                            {
                                small: {
                                    one_handed:
                                    {
                                        damage: '1d4',
                                        penalty: 0,
                                        weapons: 'dagger',
                                    },
                                    two_handed:
                                    {
                                        damage: '1d6',
                                        penalty: 0,
                                        weapons: 'club',
                                    },
                                },

                                light: {
                                    one_handed:
                                    {
                                        damage: '1d6',
                                        penalty: 0,
                                        weapons: 'mace, shortsword',
                                    },
                                    two_handed:
                                    {
                                        damage: '1d8',
                                        penalty: 0,
                                        weapons: 'spear',
                                    },
                                },

                                heavy: {
                                    one_handed:
                                    {
                                        damage: '1d8',
                                        penalty: -2,
                                        weapons: 'longsword, warhammer',
                                    },
                                    two_handed:
                                    {
                                        damage: '1d10',
                                        penalty: -2,
                                        weapons: 'greatsword, dire flail',
                                    },
                                },
                            },
                        ],

                    ranged:
                        [
                            {
                                small:
                                {
                                    thrown:
                                    {
                                        damage: '1d4',
                                        penalty: 0,
                                        weapons: 'dagger',
                                    },
                                    crossbow:
                                    {
                                        damage: '1d4',
                                        penalty: 0,
                                        weapons: 'hand crossbow',
                                    },
                                    bow:
                                    {
                                        damage: '',
                                        penalty: 0,
                                        weapons: '',
                                    },
                                },

                                light:
                                {
                                    thrown:
                                    {
                                        damage: '1d6',
                                        penalty: 0,
                                        weapons: 'javelin, axe',
                                    },
                                    crossbow:
                                    {
                                        damage: '1d6',
                                        penalty: 0,
                                        weapons: 'light crossbow',
                                    },
                                    bow:
                                    {
                                        damage: '1d6',
                                        penalty: -2,
                                        weapons: 'shortbow',
                                    },
                                },

                                heavy: {
                                    thrown:
                                    {
                                        damage: '',
                                        penalty: 0,
                                        weapons: '',
                                    },
                                    crossbow:
                                    {
                                        damage: '1d8',
                                        penalty: -1,
                                        weapons: 'heavy crossbow',
                                    },
                                    bow:
                                    {
                                        damage: '1d8',
                                        penalty: -5,
                                        weapons: 'longbow',
                                    },
                                },
                            }
                        ],
                }
            ],

            level_progressions:
            [
                    {
                        // each array corresponsds to a level, each element in the array corresponds to spells at 1st, 3rd, 5th, 7th and 9th level
                        // for example at level 5 you have 2 3rd level spells and 4 5th level spells
                        spells: [[4, 0, 0, 0, 0], [5, 0, 0, 0, 0], [2, 3, 0, 0, 0], [1, 5, 0, 0, 0], [0, 2, 4, 0, 0], [0, 1, 6, 0, 0],
                        [0, 0, 2, 5, 0], [0, 0, 1, 7, 0], [0, 0, 0, 2, 6], [0, 0, 0, 1, 8]],
                    }
            ],
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

            source: 'Core Book',
            source_link: 'https://www.drivethrurpg.com/product/118994/13th-Age-Core-Book',

            armor:
            [
                {
                    none: {
                        base_ac: 10,
                        atk_penalty: 0,
                    },
                    light: {
                        base_ac: 13,
                        atk_penalty: 0,
                    },
                    heavy: {
                        base_ac: 15,
                        atk_penalty: 0,
                    },
                    shield: {
                        base_ac: 1,
                        atk_penalty: 0,
                    },

                }
            ],


            weapons:
            [
                {
                    melee:
                        [
                            {
                                small: {
                                    one_handed:
                                    {
                                        damage: '1d4',
                                        penalty: 0,
                                        weapons: 'dagger',
                                    },
                                    two_handed:
                                    {
                                        damage: '1d6',
                                        penalty: 0,
                                        weapons: 'club',
                                    },
                                },

                                light: {
                                    one_handed:
                                    {
                                        damage: '1d6',
                                        penalty: 0,
                                        weapons: 'shortsword, hand-axe',
                                    },
                                    two_handed:
                                    {
                                        damage: '1d8',
                                        penalty: 0,
                                        weapons: 'spear',
                                    },
                                },

                                heavy: {
                                    one_handed:
                                    {
                                        damage: '1d8',
                                        penalty: 0,
                                        weapons: 'longsword, warhammer',
                                    },
                                    two_handed:
                                    {
                                        damage: '1d10',
                                        penalty: 0,
                                        weapons: 'greatsword, greataxe',
                                    },
                                },
                            },
                        ],

                    ranged:
                        [
                            {
                                small:
                                {
                                    thrown:
                                    {
                                        damage: '1d4',
                                        penalty: 0,
                                        weapons: 'dagger',
                                    },
                                    crossbow:
                                    {
                                        damage: '1d4',
                                        penalty: 0,
                                        weapons: 'hand crossbow',
                                    },
                                    bow:
                                    {
                                        damage: '',
                                        penalty: 0,
                                        weapons: '',
                                    },
                                },

                                light:
                                {
                                    thrown:
                                    {
                                        damage: '1d6',
                                        penalty: 0,
                                        weapons: 'javelin, axe',
                                    },
                                    crossbow:
                                    {
                                        damage: '1d6',
                                        penalty: 0,
                                        weapons: 'light crossbow',
                                    },
                                    bow:
                                    {
                                        damage: '1d6',
                                        penalty: 0,
                                        weapons: 'shortbow',
                                    },
                                },

                                heavy: {
                                    thrown:
                                    {
                                        damage: '',
                                        penalty: 0,
                                        weapons: '',
                                    },
                                    crossbow:
                                    {
                                        damage: '1d8',
                                        penalty: 0,
                                        weapons: 'heavy crossbow',
                                    },
                                    bow:
                                    {
                                        damage: '1d8',
                                        penalty: 0,
                                        weapons: 'longbow',
                                    },
                                },
                            }
                        ],
                }
            ],

            level_progressions:
            [
                {
                    // each value corresponds to a level 1-10
                    maneuvers_known: [3, 4, 4, 5, 5, 6, 6, 7, 7, 8],

                    maneuver_pool: ['1st level', '1st level', '3rd level', '3rd level', '5th level', '5th level', '7th level',
                        '7th level', '9th level', '9th level'],

                    class_talents: [3, 3, 3, 3, 3, 4, 4, 4, 4, 4],
                }
            ],
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

            source: 'Core Book',
            source_link: 'https://www.drivethrurpg.com/product/118994/13th-Age-Core-Book',

            armor:
            [
                {
                    none: {
                        base_ac: 10,
                        atk_penalty: 0,
                    },
                    light: {
                        base_ac: 12,
                        atk_penalty: 0,
                    },
                    heavy: {
                        base_ac: 16,
                        atk_penalty: 0,
                    },
                    shield: {
                        base_ac: 1,
                        atk_penalty: 0,
                    },

                }
            ],

            weapons:
            [
                {
                    melee:
                        [
                            {
                                small: {
                                    one_handed:
                                    {
                                        damage: '1d4',
                                        penalty: 0,
                                        weapons: 'dagger',
                                    },
                                    two_handed:
                                    {
                                        damage: '1d6',
                                        penalty: 0,
                                        weapons: 'club',
                                    },
                                },

                                light: {
                                    one_handed:
                                    {
                                        damage: '1d6',
                                        penalty: 0,
                                        weapons: 'scimitar, shortsword',
                                    },
                                    two_handed:
                                    {
                                        damage: '1d8',
                                        penalty: 0,
                                        weapons: 'spear',
                                    },
                                },

                                heavy: {
                                    one_handed:
                                    {
                                        damage: '1d8',
                                        penalty: 0,
                                        weapons: 'longsword, battleaxe',
                                    },
                                    two_handed:
                                    {
                                        damage: '1d10',
                                        penalty: 0,
                                        weapons: 'greatsword, halberd',
                                    },
                                },
                            },
                        ],

                    ranged:
                        [
                            {
                                small:
                                {
                                    thrown:
                                    {
                                        damage: '1d4',
                                        penalty: 0,
                                        weapons: 'dagger',
                                    },
                                    crossbow:
                                    {
                                        damage: '1d4',
                                        penalty: 0,
                                        weapons: 'hand crossbow',
                                    },
                                    bow:
                                    {
                                        damage: '',
                                        penalty: 0,
                                        weapons: '',
                                    },
                                },

                                light:
                                {
                                    thrown:
                                    {
                                        damage: '1d6',
                                        penalty: 0,
                                        weapons: 'javelin, axe',
                                    },
                                    crossbow:
                                    {
                                        damage: '1d6',
                                        penalty: 0,
                                        weapons: 'light crossbow',
                                    },
                                    bow:
                                    {
                                        damage: '1d6',
                                        penalty: 0,
                                        weapons: 'shortbow',
                                    },
                                },

                                heavy: {
                                    thrown:
                                    {
                                        damage: '',
                                        penalty: 0,
                                        weapons: '',
                                    },
                                    crossbow:
                                    {
                                        damage: '1d8',
                                        penalty: 0,
                                        weapons: 'heavy crossbow',
                                    },
                                    bow:
                                    {
                                        damage: '1d8',
                                        penalty: 0,
                                        weapons: 'longbow',
                                    },
                                },
                            }
                        ],
                }
            ],

            level_progressions:
            [
                {
                    // similar to total feats, each outer array corresponds to a level 1-10, each inner element corresponds to an
                    // adventurer, champion or epic tier talent
                    class_talents: [3, 3, 3, 3, 4, 4, 4, 5, 5, 5],
                }
            ],
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

            source: 'Core Book',
            source_link: 'https://www.drivethrurpg.com/product/118994/13th-Age-Core-Book',

            armor:
            [
                {
                    none: {
                        base_ac: 10,
                        atk_penalty: 0,
                    },
                    light: {
                        base_ac: 14,
                        atk_penalty: 0,
                    },
                    heavy: {
                        base_ac: 15,
                        atk_penalty: -2,
                    },
                    shield: {
                        base_ac: 1,
                        atk_penalty: -2,
                    },

                }
            ],


            weapons:
            [
                {
                    melee:
                        [
                            {
                                small: {
                                    one_handed:
                                    {
                                        damage: '1d4',
                                        penalty: 0,
                                        weapons: 'dagger',
                                    },
                                    two_handed:
                                    {
                                        damage: '1d6',
                                        penalty: 0,
                                        weapons: 'club',
                                    },
                                },

                                light: {
                                    one_handed:
                                    {
                                        damage: '1d6',
                                        penalty: 0,
                                        weapons: 'shortsword, hand axe',
                                    },
                                    two_handed:
                                    {
                                        damage: '1d8',
                                        penalty: 0,
                                        weapons: 'spear',
                                    },
                                },

                                heavy: {
                                    one_handed:
                                    {
                                        damage: '1d8',
                                        penalty: 0,
                                        weapons: 'longsword, warhammer',
                                    },
                                    two_handed:
                                    {
                                        damage: '1d10',
                                        penalty: 0,
                                        weapons: 'greatsword, greataxe',
                                    },
                                },
                            },
                        ],

                    ranged:
                        [
                            {
                                small:
                                {
                                    thrown:
                                    {
                                        damage: '1d4',
                                        penalty: 0,
                                        weapons: 'dagger',
                                    },
                                    crossbow:
                                    {
                                        damage: '1d4',
                                        penalty: 0,
                                        weapons: 'hand crossbow',
                                    },
                                    bow:
                                    {
                                        damage: '',
                                        penalty: 0,
                                        weapons: '',
                                    },
                                },

                                light:
                                {
                                    thrown:
                                    {
                                        damage: '1d6',
                                        penalty: 0,
                                        weapons: 'javelin, axe',
                                    },
                                    crossbow:
                                    {
                                        damage: '1d6',
                                        penalty: 0,
                                        weapons: 'light crossbow',
                                    },
                                    bow:
                                    {
                                        damage: '1d6',
                                        penalty: 0,
                                        weapons: 'shortbow',
                                    },
                                },

                                heavy: {
                                    thrown:
                                    {
                                        damage: '',
                                        penalty: 0,
                                        weapons: '',
                                    },
                                    crossbow:
                                    {
                                        damage: '1d8',
                                        penalty: 0,
                                        weapons: 'heavy crossbow',
                                    },
                                    bow:
                                    {
                                        damage: '1d8',
                                        penalty: 0,
                                        weapons: 'longbow',
                                    },
                                },
                            }
                        ],
                }
            ],

            level_progressions:
            [
                {
                    // similar to total feats, each outer array corresponds to a level 1-10, each inner element corresponds to an
                    // adventurer, champion or epic tier talent
                    class_talents: [3, 3, 3, 3, 4, 4, 4, 5, 5, 5],
                }
            ],
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

            source: 'Core Book',
            source_link: 'https://www.drivethrurpg.com/product/118994/13th-Age-Core-Book',

            armor:
            [
                {
                    none: {
                        base_ac: 10,
                        atk_penalty: 0,
                    },
                    light: {
                        base_ac: 12,
                        atk_penalty: 0,
                    },
                    heavy: {
                        base_ac: 13,
                        atk_penalty: -2,
                    },
                    shield: {
                        base_ac: 1,
                        atk_penalty: -2,
                    },

                }
            ],


            weapons:
            [
                {
                    melee:
                        [
                            {
                                small: {
                                    one_handed:
                                    {
                                        damage: '1d8',
                                        penalty: 0,
                                        weapons: 'dagger',
                                    },
                                    two_handed:
                                    {
                                        damage: '1d6',
                                        penalty: 0,
                                        weapons: 'club',
                                    },
                                },

                                light: {
                                    one_handed:
                                    {
                                        damage: '1d8',
                                        penalty: 0,
                                        weapons: 'shortsword, wicked knife',
                                    },
                                    two_handed:
                                    {
                                        damage: '1d8',
                                        penalty: 0,
                                        weapons: 'spear',
                                    },
                                },

                                heavy: {
                                    one_handed:
                                    {
                                        damage: '1d8',
                                        penalty: -2,
                                        weapons: 'longsword, scimitar',
                                    },
                                    two_handed:
                                    {
                                        damage: '1d10',
                                        penalty: -2,
                                        weapons: 'greatsword',
                                    },
                                },
                            },
                        ],

                    ranged:
                        [
                            {
                                small:
                                {
                                    thrown:
                                    {
                                        damage: '1d4',
                                        penalty: 0,
                                        weapons: 'dagger',
                                    },
                                    crossbow:
                                    {
                                        damage: '1d4',
                                        penalty: 0,
                                        weapons: 'hand crossbow',
                                    },
                                    bow:
                                    {
                                        damage: '',
                                        penalty: 0,
                                        weapons: '',
                                    },
                                },

                                light:
                                {
                                    thrown:
                                    {
                                        damage: '1d6',
                                        penalty: 0,
                                        weapons: 'javelin, axe',
                                    },
                                    crossbow:
                                    {
                                        damage: '1d6',
                                        penalty: 0,
                                        weapons: 'light crossbow',
                                    },
                                    bow:
                                    {
                                        damage: '1d6',
                                        penalty: 0,
                                        weapons: 'shortbow',
                                    },
                                },

                                heavy: {
                                    thrown:
                                    {
                                        damage: '',
                                        penalty: 0,
                                        weapons: '',
                                    },
                                    crossbow:
                                    {
                                        damage: '1d8',
                                        penalty: -1,
                                        weapons: 'heavy crossbow',
                                    },
                                    bow:
                                    {
                                        damage: '1d8',
                                        penalty: -2,
                                        weapons: 'longbow',
                                    },
                                },
                            }
                        ],
                }
            ],

            level_progressions:
            [
                {
                    // each array element corresponds to a level 1-10
                    powers_known: [4, 5, 5, 6, 6, 7, 7, 8, 8, 9],

                    power_pool: ['1st level', '1st level', '3rd level', '3rd level', '5th level', '5th level', '7th level',
                        '7th level', '9th level', '9th level'],
                }
            ],
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

            source: 'Core Book',
            source_link: 'https://www.drivethrurpg.com/product/118994/13th-Age-Core-Book',

            armor:
            [
                {
                    none: {
                        base_ac: 10,
                        atk_penalty: 0,
                    },
                    light: {
                        base_ac: 10,
                        atk_penalty: 0,
                    },
                    heavy: {
                        base_ac: 11,
                        atk_penalty: -2,
                    },
                    shield: {
                        base_ac: 1,
                        atk_penalty: -2,
                    },

                }
            ],


            weapons:
            [
                {
                    melee:
                        [
                            {
                                small: {
                                    one_handed:
                                    {
                                        damage: '1d4',
                                        penalty: 0,
                                        weapons: 'dagger',
                                    },
                                    two_handed:
                                    {
                                        damage: '1d6',
                                        penalty: 0,
                                        weapons: 'staff',
                                    },
                                },

                                light: {
                                    one_handed:
                                    {
                                        damage: '1d6',
                                        penalty: 0,
                                        weapons: 'shortsword',
                                    },
                                    two_handed:
                                    {
                                        damage: '1d8',
                                        penalty: 0,
                                        weapons: 'spear',
                                    },
                                },

                                heavy: {
                                    one_handed:
                                    {
                                        damage: '1d8',
                                        penalty: -2,
                                        weapons: 'longsword',
                                    },
                                    two_handed:
                                    {
                                        damage: '1d10',
                                        penalty: -2,
                                        weapons: 'greatsword',
                                    },
                                },
                            },
                        ],

                    ranged:
                        [
                            {
                                small:
                                {
                                    thrown:
                                    {
                                        damage: '1d4',
                                        penalty: 0,
                                        weapons: 'dagger',
                                    },
                                    crossbow:
                                    {
                                        damage: '1d4',
                                        penalty: 0,
                                        weapons: 'hand crossbow',
                                    },
                                    bow:
                                    {
                                        damage: '',
                                        penalty: 0,
                                        weapons: '',
                                    },
                                },

                                light:
                                {
                                    thrown:
                                    {
                                        damage: '1d6',
                                        penalty: 0,
                                        weapons: 'javelin',
                                    },
                                    crossbow:
                                    {
                                        damage: '1d6',
                                        penalty: -1,
                                        weapons: 'light crossbow',
                                    },
                                    bow:
                                    {
                                        damage: '1d6',
                                        penalty: -2,
                                        weapons: 'shortbow',
                                    },
                                },

                                heavy: {
                                    thrown:
                                    {
                                        damage: '',
                                        penalty: 0,
                                        weapons: '',
                                    },
                                    crossbow:
                                    {
                                        damage: '1d8',
                                        penalty: -2,
                                        weapons: 'heavy crossbow',
                                    },
                                    bow:
                                    {
                                        damage: '1d8',
                                        penalty: -4,
                                        weapons: 'longbow',
                                    },
                                },
                            }
                        ],
                }
            ],

            level_progressions:
            [
                {
                    // each array corresponsds to a level, each element in the array corresponds to spells at 1st, 3rd, 5th, 7th and 9th level
                    // for example at level 5 you have 3 3rd level spells and 4 5th level spells
                    spells: [[4, 0, 0, 0, 0], [5, 0, 0, 0, 0], [3, 3, 0, 0, 0], [0, 6, 0, 0, 0], [0, 3, 4, 0, 0], [0, 0, 7, 0, 0],
                    [0, 0, 3, 5, 0], [0, 0, 0, 8, 0], [0, 0, 0, 3, 6], [0, 0, 0, 0, 9]],
                }
            ],
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

            source: 'Core Book',
            source_link: 'https://www.drivethrurpg.com/product/118994/13th-Age-Core-Book',

            armor:
                [
                    {
                        none: {
                            base_ac: 10,
                            atk_penalty: 0,
                        },
                        light: {
                            base_ac: 10,
                            atk_penalty: 0,
                        },
                        heavy: {
                            base_ac: 11,
                            atk_penalty: -2,
                        },
                        shield: {
                            base_ac: 1,
                            atk_penalty: -2,
                        },

                    }
                ],


            weapons:
                [
                    {
                        melee:
                            [
                                {
                                    small: {
                                        one_handed:
                                        {
                                            damage: '1d4',
                                            penalty: 0,
                                            weapons: 'dagger',
                                        },
                                        two_handed:
                                        {
                                            damage: '1d6',
                                            penalty: 0,
                                            weapons: 'staff',
                                        },
                                    },

                                    light: {
                                        one_handed:
                                        {
                                            damage: '1d6',
                                            penalty: -2,
                                            weapons: 'shortsword',
                                        },
                                        two_handed:
                                        {
                                            damage: '1d8',
                                            penalty: -2,
                                            weapons: 'spear',
                                        },
                                    },

                                    heavy: {
                                        one_handed:
                                        {
                                            damage: '1d8',
                                            penalty: -5,
                                            weapons: 'longsword',
                                        },
                                        two_handed:
                                        {
                                            damage: '1d10',
                                            penalty: -2,
                                            weapons: 'greatsword',
                                        },
                                    },
                                },
                            ],

                        ranged:
                            [
                                {
                                    small:
                                    {
                                        thrown:
                                        {
                                            damage: '1d4',
                                            penalty: 0,
                                            weapons: 'dagger',
                                        },
                                        crossbow:
                                        {
                                            damage: '1d4',
                                            penalty: 0,
                                            weapons: 'hand crossbow',
                                        },
                                        bow:
                                        {
                                            damage: '',
                                            penalty: 0,
                                            weapons: '',
                                        },
                                    },

                                    light:
                                    {
                                        thrown:
                                        {
                                            damage: '1d6',
                                            penalty: -2,
                                            weapons: 'javelin',
                                        },
                                        crossbow:
                                        {
                                            damage: '1d6',
                                            penalty: -1,
                                            weapons: 'light crossbow',
                                        },
                                        bow:
                                        {
                                            damage: '1d6',
                                            penalty: -2,
                                            weapons: 'shortbow',
                                        },
                                    },

                                    heavy: {
                                        thrown:
                                        {
                                            damage: '',
                                            penalty: 0,
                                            weapons: '',
                                        },
                                        crossbow:
                                        {
                                            damage: '1d8',
                                            penalty: -4,
                                            weapons: 'heavy crossbow',
                                        },
                                        bow:
                                        {
                                            damage: '1d8',
                                            penalty: -5,
                                            weapons: 'longbow',
                                        },
                                    },
                                }
                            ],
                    }
                ],

            level_progressions:
            [
                {
                    // each array corresponsds to a level, each element in the array corresponds to spells at 1st, 3rd, 5th, 7th and 9th level
                    // for example at level 5 you have 1 1st level spell, 4 3rd level spells and 4 5th level spells
                    spells: [[5, 0, 0, 0, 0], [6, 0, 0, 0, 0], [3, 4, 0, 0, 0], [2, 6, 0, 0, 0], [1, 4, 4, 0, 0], [0, 2, 8, 0, 0],
                    [0, 1, 4, 5, 0], [0, 0, 3, 8, 0], [0, 0, 1, 5, 6], [0, 0, 0, 3, 9]],
                },
            ],
        },
    ],




    // interesting cases: Humans and Gearforged can take a bonus in any of the 6 abilities
    // Goblins, Nyama and Starchild have 3 bonus options rather than 2
    // Half-ogres and Pixies get +3 to their bonus rather than +2
    races: [
        // 1-8 =  "Major Races"
        {
            name: 'Dwarf',
            id: 1,
            race_bonus: ['Con', 'Wis'],
            bonus_value: 2,
            source: 'Core Book',
            source_link: 'https://www.drivethrurpg.com/product/118994/13th-Age-Core-Book',

        },
        {
            name: 'Gnome',
            id: 2,
            race_bonus: ['Dex', 'Int'],
            bonus_value: 2,
            source: 'Core Book',
            source_link: 'https://www.drivethrurpg.com/product/118994/13th-Age-Core-Book',
        },
        {
            name: 'Half-elf',
            id: 3,
            race_bonus: ['Con', 'Cha'],
            bonus_value: 2,
            source: 'Core Book',
            source_link: 'https://www.drivethrurpg.com/product/118994/13th-Age-Core-Book',
        },
        {
            name: 'Halfling',
            id: 4,
            race_bonus: ['Con', 'Dex'],
            bonus_value: 2,
            source: 'Core Book',
            source_link: 'https://www.drivethrurpg.com/product/118994/13th-Age-Core-Book',
        },
        {
            name: 'Half-orc',
            id: 5,
            race_bonus: ['Str', 'Dex'],
            bonus_value: 2,
            source: 'Core Book',
            source_link: 'https://www.drivethrurpg.com/product/118994/13th-Age-Core-Book',
        },
        {
            name: 'High Elf',
            id: 6,
            race_bonus: ['Int', 'Cha'],
            bonus_value: 2,
            source: 'Core Book',
            source_link: 'https://www.drivethrurpg.com/product/118994/13th-Age-Core-Book',
        },
        {
            name: 'Human',
            id: 7,
            race_bonus: ['Str', 'Con', 'Dex', 'Int', 'Wis', 'Cha'],
            bonus_value: 2,
            source: 'Core Book',
            source_link: 'https://www.drivethrurpg.com/product/118994/13th-Age-Core-Book',
        },
        {
            name: 'Wood Elf',
            id: 8,
            race_bonus: ['Dex', 'Wis'],
            bonus_value: 2,
            source: 'Core Book',
            source_link: 'https://www.drivethrurpg.com/product/118994/13th-Age-Core-Book',
        },
        // 9 - 21 = "Additional Races" 
        {
            name: 'Alleykin',
            id: 9,
            race_bonus: ['Dex', 'Cha'],
            bonus_value: 2,
            source: 'Book of Ages', 
            source_link: 'https://www.drivethrurpg.com/product/263366/The-Book-of-Ages',
        },
        {
            name: 'Arcanite',
            id: 10,
            race_bonus: ['Int', 'Cha'],
            bonus_value: 2,
            source: 'Book of Ages',
            source_link: 'https://www.drivethrurpg.com/product/263366/The-Book-of-Ages',
        },
        {
            name: 'Beastblooded',
            id: 11,
            race_bonus: ['Con', 'Dex'],
            bonus_value: 2,
            source: 'Book of Ages',
            source_link: 'https://www.drivethrurpg.com/product/263366/The-Book-of-Ages',
        },
        {
            name: 'Dark Elf',
            id: 12,
            race_bonus: ['Dex', 'Cha'],
            bonus_value: 2,
            source: 'Core Book',
            source_link: 'https://www.drivethrurpg.com/product/118994/13th-Age-Core-Book',
        },
        {
            name: 'Dragonic / Dragonspawn',
            id: 13,
            race_bonus: ['Str', 'Cha'],
            bonus_value: 2,
            source: 'Core Book',
            source_link: 'https://www.drivethrurpg.com/product/118994/13th-Age-Core-Book',
        },
        {
            name: 'Forgeborn / Dwarf-Forged',
            id: 14,
            race_bonus: ['Str', 'Con'],
            bonus_value: 2,
            source: 'Core Book',
            source_link: 'https://www.drivethrurpg.com/product/118994/13th-Age-Core-Book',
        },
        {
            name: 'Holy One / Aasimar',
            id: 15,
            race_bonus: ['Wis', 'Cha'],
            bonus_value: 2,
            source: 'Core Book',
            source_link: 'https://www.drivethrurpg.com/product/118994/13th-Age-Core-Book',
        },
        {
            name: 'Lizardman',
            id: 16,
            race_bonus: ['Con', 'Dex'],
            bonus_value: 2,
            source: 'Book of Ages',
            source_link: 'https://www.drivethrurpg.com/product/263366/The-Book-of-Ages',
        },
        {
            name: 'Space Corps Explorer',
            id: 17,
            race_bonus: ['Dex', 'Int'],
            bonus_value: 2,
            source: 'Book of Ages',
            source_link: 'https://www.drivethrurpg.com/product/263366/The-Book-of-Ages',
        },
        {
            name: 'Spiritborn',
            id: 18,
            race_bonus: ['Wis', 'Cha'],
            bonus_value: 2,
            source: 'Book of Ages',
            source_link: 'https://www.drivethrurpg.com/product/263366/The-Book-of-Ages',
        },
        {
            name: 'Tiefling / Demontouched',
            id: 19,
            race_bonus: ['Str', 'Int'],
            bonus_value: 2,
            source: 'Core Book',
            source_link: 'https://www.drivethrurpg.com/product/118994/13th-Age-Core-Book',
        },
        {
            name: 'Twygzog',
            id: 20,
            race_bonus: ['Str', 'Con'],
            bonus_value: 2,
            source: 'Bestiary',
            source_link: 'https://www.drivethrurpg.com/product/133681/13th-Age-Bestiary',
        },
        {
            name: 'Unholy One',
            id: 21,
            race_bonus: ['Str', 'Cha'],
            bonus_value: 2,
            source: 'Book of Ages',
            source_link: 'https://www.drivethrurpg.com/product/263366/The-Book-of-Ages',
        },
        // 22-49 = 3rd Party Races
        {
            name: 'Catfolk',
            id: 22,
            race_bonus: ['Dex', 'Cha'],
            bonus_value: 2,
            source: 'Book of Heroic Races: Age of Races 1',
            source_link: 'https://www.drivethrurpg.com/product/180322/Book-of-Heroic-Races-Age-of-Races-1-13th-Age-Compatible',
        },
        {
            name: 'Centaur',
            id: 23,
            race_bonus: ['Con', 'Dex'],
            bonus_value: 2,
            source: 'Midgard Bestiary',
            source_link: 'https://www.drivethrurpg.com/product/126429/Midgard-Bestiary-13th-Age-Compatible',
        },
        {
            name: 'Firesoul',
            id: 24,
            race_bonus: ['Dex', 'Cha'],
            bonus_value: 2,
            source: 'Dark Alleys & Twisted Paths',
            source_link: 'https://www.drivethrurpg.com/product/295925/Dark-Alleys--Twisted-Paths-13th-Age-Compatible',,
        },
        {
            name: 'Gearforged',
            id: 25,
            race_bonus: ['Str', 'Con', 'Dex', 'Int', 'Wis', 'Cha'],
            bonus_value: 2,
            source: 'Midgard Bestiary',
            source_link: 'https://www.drivethrurpg.com/product/126429/Midgard-Bestiary-13th-Age-Compatible',
        },
        {
            name: 'Gnoll',
            id: 26,
            race_bonus: ['Str', 'Con'],
            bonus_value: 2,
            source: 'Midgard Bestiary',
            source_link: 'https://www.drivethrurpg.com/product/126429/Midgard-Bestiary-13th-Age-Compatible',
        },
        {
            name: 'Goblin',
            id: 27,
            race_bonus: ['Con', 'Int', 'Wis'],
            bonus_value: 2,
            source: 'Midgard Bestiary',
            source_link: 'https://www.drivethrurpg.com/product/126429/Midgard-Bestiary-13th-Age-Compatible',
        },
        {
            name: 'Hagborn',
            id: 28,
            race_bonus: ['Wis', 'Cha'],
            bonus_value: 2,
            source: 'Book of Heroic Races: Age of Races 1',
            source_link: 'https://www.drivethrurpg.com/product/180322/Book-of-Heroic-Races-Age-of-Races-1-13th-Age-Compatible',
        },
        {
            name: 'Half-Ogre',
            id: 29,
            race_bonus: ['Str', 'Con'],
            bonus_value: 3,
            source: 'Dark Alleys & Twisted Paths',
            source_link: 'https://www.drivethrurpg.com/product/295925/Dark-Alleys--Twisted-Paths-13th-Age-Compatible',
        },
        {
            name: 'Hobgoblin',
            id: 30,
            race_bonus: ['Str', 'Int'],
            bonus_value: 2,
            source: 'Gods and Icons',
            source_link: 'https://www.drivethrurpg.com/product/193880/Gods-and-Icons-13th-Age-Compatible',
        },
        {
            name: 'Klik-Zeen',
            id: 31,
            race_bonus: ['Str', 'Dex'],
            bonus_value: 2,
            source: 'Gods and Icons',
            source_link: 'https://www.drivethrurpg.com/product/193880/Gods-and-Icons-13th-Age-Compatible',
        },
        {
            name: 'Kobold',
            id: 32,
            race_bonus: ['Dex', 'Int'],
            bonus_value: 2,
            source: 'Midgard Bestiary',
            source_link: 'https://www.drivethrurpg.com/product/126429/Midgard-Bestiary-13th-Age-Compatible',
        },
        {
            name: 'Leomar',
            id: 33,
            race_bonus: ['Str', 'Dex'],
            bonus_value: 2,
            source: 'Dark Alleys & Twisted Paths',
            source_link: 'https://www.drivethrurpg.com/product/295925/Dark-Alleys--Twisted-Paths-13th-Age-Compatible',
        },
        {
            name: 'Lizardfolk',
            id: 34,
            race_bonus: ['Str', 'Dex'],
            bonus_value: 2,
            source: 'Book of Heroic Races: Age of Races 1',
            source_link: 'https://www.drivethrurpg.com/product/180322/Book-of-Heroic-Races-Age-of-Races-1-13th-Age-Compatible',
        },
        {
            name: 'Merfolk',
            id: 35,
            race_bonus: ['Con', 'Cha'],
            bonus_value: 2,
            source: 'Book of Heroic Races: Age of Races 1',
            source_link: 'https://www.drivethrurpg.com/product/180322/Book-of-Heroic-Races-Age-of-Races-1-13th-Age-Compatible',
        },
        {
            name: 'Minotaur',
            id: 36,
            race_bonus: ['Str', 'Wis'],
            bonus_value: 2,
            source: 'Midgard Bestiary',
            source_link: 'https://www.drivethrurpg.com/product/126429/Midgard-Bestiary-13th-Age-Compatible',
        },
        {
            name: 'Nyama',
            id: 37,
            race_bonus: ['Str', 'Dex', 'Wis'],
            bonus_value: 2,
            source: 'Dark Alleys & Twisted Paths',
            source_link: 'https://www.drivethrurpg.com/product/295925/Dark-Alleys--Twisted-Paths-13th-Age-Compatible',
        },
        {
            name: 'Orc',
            id: 38,
            race_bonus: ['Str', 'Dex'],
            bonus_value: 2,
            source: 'Dark Alleys & Twisted Paths',
            source_link: 'https://www.drivethrurpg.com/product/295925/Dark-Alleys--Twisted-Paths-13th-Age-Compatible',
        },
        {
            name: 'Pixie',
            id: 39,
            race_bonus: ['Dex', 'Cha'],
            bonus_value: 3,
            source: 'Dark Alleys & Twisted Paths',
            source_link: 'https://www.drivethrurpg.com/product/295925/Dark-Alleys--Twisted-Paths-13th-Age-Compatible',
        },
        {
            name: 'Ratkin',
            id: 40,
            race_bonus: ['Con', 'Dex'],
            bonus_value: 2,
            source: 'Dark Alleys & Twisted Paths',
            source_link: 'https://www.drivethrurpg.com/product/295925/Dark-Alleys--Twisted-Paths-13th-Age-Compatible',
        },
        {
            name: 'Ravenfolk',
            id: 41,
            race_bonus: ['Dex', 'Wis'],
            bonus_value: 2,
            source: 'Midgard Bestiary',
            source_link: 'https://www.drivethrurpg.com/product/126429/Midgard-Bestiary-13th-Age-Compatible',
        },
        {
            name: 'Roachling',
            id: 42,
            race_bonus: ['Con', 'Dex'],
            bonus_value: 2,
            source: 'Midgard Bestiary',
            source_link: 'https://www.drivethrurpg.com/product/126429/Midgard-Bestiary-13th-Age-Compatible',
        },
        {
            name: 'Rocksoul',
            id: 43,
            race_bonus: ['Con', 'Int'],
            bonus_value: 2,
            source: 'Dark Alleys & Twisted Paths',
            source_link: 'https://www.drivethrurpg.com/product/295925/Dark-Alleys--Twisted-Paths-13th-Age-Compatible',
        },
        {
            name: 'Samsaran',
            id: 44,
            race_bonus: ['Int', 'Wis'],
            bonus_value: 2,
            source: 'Book of Heroic Races: Age of Races 1',
            source_link: 'https://www.drivethrurpg.com/product/180322/Book-of-Heroic-Races-Age-of-Races-1-13th-Age-Compatible',
        },
        {
            name: 'Shadowborn',
            id: 45,
            race_bonus: ['Con', 'Wis'],
            bonus_value: 2,
            source: 'Dark Alleys & Twisted Paths',
            source_link: 'https://www.drivethrurpg.com/product/295925/Dark-Alleys--Twisted-Paths-13th-Age-Compatible',
        },
        {
            name: 'Star Child',
            id: 46,
            race_bonus: ['Int', 'Wis', 'Cha'],
            bonus_value: 2,
            source: 'Dark Alleys & Twisted Paths',
            source_link: 'https://www.drivethrurpg.com/product/295925/Dark-Alleys--Twisted-Paths-13th-Age-Compatible',
        },
        {
            name: 'Storm Soul',
            id: 47,
            race_bonus: ['Dex', 'Int'],
            bonus_value: 2,
            source: 'Dark Alleys & Twisted Paths',
            source_link: 'https://www.drivethrurpg.com/product/295925/Dark-Alleys--Twisted-Paths-13th-Age-Compatible',
        },
        {
            name: 'Vorhai / Greyskin',
            id: 48,
            race_bonus: ['Str', 'Con'],
            bonus_value: 2,
            source: 'Dark Alleys & Twisted Paths',
            source_link: 'https://www.drivethrurpg.com/product/295925/Dark-Alleys--Twisted-Paths-13th-Age-Compatible',
        },
        {
            name: 'Watersoul',
            id: 49,
            race_bonus: ['Con', 'Wis'],
            bonus_value: 2,
            source: 'Dark Alleys & Twisted Paths',
            source_link: 'https://www.drivethrurpg.com/product/295925/Dark-Alleys--Twisted-Paths-13th-Age-Compatible',
        },
    ]
}