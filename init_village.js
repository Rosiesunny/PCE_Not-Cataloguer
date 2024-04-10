const pronounsDict = {
    "they": ["they", "them", "their", "theirs", "themself"],
    "he": ["he", "him", "his", "his", "himself"], 
    "she": ["she", "her", "her", "hers", "herself"],
    "ae": ["ae", "aer", "aer", "aers", "aerself"],
    "xe": ["xe", "xem", "xyr", "xyrs", "xemself"],
    "it": ["it", "it", "its", "its", "itself"]
}

village = {};
console.log("Not-Cataloguer V 1.0 Alpha");

// All cats in the village - accessed by village.cats[catID]
village.cats = {};

if (!(typeof(load_village) == 'undefined')) {
    if (load_village == 0) {
        // Do nothing
    } else if (load_village == 1) {
        console.log("Loading test village #1.");
        village.cats = {
            "122627": {
                "id": 122627,
                "name": "Ros",
                "travelling": false,
                "birthday": {
                    "year": 5,
                    "season": 1,
                    "day": 25
                },
                "age": "Adult",
                "pronouns": {
                    "primary": "they",
                    "secondary": "them"
                },
                "wind": "Null",
                "aspect": "Undiscovered",
                "origin": "Custom Cat",
                "species": "Not-Cat",
                "size": [
                    13,
                    5.9
                ],
                "furLength": "Longhair",
                "furColor": [
                    "Snow",
                    "Standard"
                ],
                "pattern": "Cloudpoint",
                "white": {
                    "markings": "Bib, Boots, & Belly",
                    "type": "C",
                    "level": 4
                },
                "eyeColor": "Dark Brown",
                "trinket": {
                    "name": "Ancient Lantern",
                    "stat": "Perception",
                    "mod": 2
                },
                "job": "Flockherd",
                "jobs": {
                    "Hunter": {
                        "level": 0,
                        "exp": 0
                    },
                    "Gatherer": {
                        "level": 2,
                        "exp": 10
                    },
                    "Miner": {
                        "level": 0,
                        "exp": 0
                    },
                    "Fisher": {
                        "level": 0,
                        "exp": 0
                    },
                    "Bugcatcher": {
                        "level": 0,
                        "exp": 0
                    },
                    "Gardener": {
                        "level": 0,
                        "exp": 0
                    },
                    "Herbalist": {
                        "level": 0,
                        "exp": 0
                    },
                    "Farmer": {
                        "level": 1,
                        "exp": 60
                    },
                    "Flockherd": {
                        "level": 5,
                        "exp": "Maximum Level"
                    },
                    "Apothecary": {
                        "level": 0,
                        "exp": 0
                    },
                    "Clothier": {
                        "level": 0,
                        "exp": 0
                    },
                    "Scribe": {
                        "level": 0,
                        "exp": 0
                    },
                    "Artist": {
                        "level": 0,
                        "exp": 0
                    },
                    "Blacksmith": {
                        "level": 0,
                        "exp": 0
                    },
                    "Craftscat": {
                        "level": 0,
                        "exp": 0
                    },
                    "Builder": {
                        "level": 0,
                        "exp": 0
                    },
                    "Mason": {
                        "level": 0,
                        "exp": 0
                    },
                    "Baker": {
                        "level": 1,
                        "exp": 30
                    }
                },
                "class": "Scout",
                "classes": {
                    "Fighter": {
                        "level": 0,
                        "exp": 0
                    },
                    "Thief": {
                        "level": 0,
                        "exp": 0
                    },
                    "Guardian": {
                        "level": 0,
                        "exp": 0
                    },
                    "Ranger": {
                        "level": 0,
                        "exp": 0
                    },
                    "Medic": {
                        "level": 0,
                        "exp": 0
                    },
                    "Scout": {
                        "level": 4,
                        "exp": "Maximum Level"
                    },
                    "Bard": {
                        "level": 2,
                        "exp": 19
                    }
                },
                "personality": {
                    "type": "Gentle",
                    "Bravery": 6,
                    "Benevolence": 9,
                    "Energy": 3,
                    "Extroversion": 5,
                    "Dedication": 6
                },
                "stats": {
                    "Strength": 7,
                    "Agility": 15,
                    "Health": 10,
                    "Finesse": 15,
                    "Cleverness": 19,
                    "Perception": 21,
                    "Luck": 21
                },
                "genes": [
                    "C",
                    "O",
                    "O",
                    "L",
                    "L",
                    "B",
                    "B",
                    "D",
                    "D",
                    "4",
                    "Y",
                    "Y",
                    "M",
                    "P",
                    "Y",
                    "Y",
                    "4",
                    "C",
                    "A",
                    "B",
                    "R",
                    "Y"
                ],
                "lastUpdated": "Tue Apr 09 2024 22:12:09 GMT-0500 (Central Daylight Time)"
            },
            "196292": {
                "id": 196292,
                "name": "💖Cookie",
                "travelling": false,
                "birthday": {
                    "year": 5,
                    "season": 2,
                    "day": 28
                },
                "age": "Adult",
                "pronouns": {
                    "primary": "they",
                    "secondary": "them"
                },
                "wind": "Trade",
                "aspect": "Undiscovered",
                "origin": "Migrated from Earth",
                "species": "Not-Cat",
                "size": [
                    21,
                    9.53
                ],
                "furLength": "Longhair",
                "furColor": [
                    "Chocolate-Ginger",
                    "Tortoiseshell"
                ],
                "pattern": "Lynxpoint",
                "white": {
                    "markings": "None",
                    "type": "-hidden-",
                    "level": "-hidden-"
                },
                "eyeColor": "Dark Brown",
                "trinket": {
                    "name": "Highly Unusual Leaves",
                    "stat": "Perception",
                    "mod": 3
                },
                "job": "Gardener",
                "jobs": {
                    "Hunter": {
                        "level": 0,
                        "exp": 0
                    },
                    "Gatherer": {
                        "level": 0,
                        "exp": 0
                    },
                    "Miner": {
                        "level": 0,
                        "exp": 0
                    },
                    "Fisher": {
                        "level": 0,
                        "exp": 0
                    },
                    "Bugcatcher": {
                        "level": 0,
                        "exp": 0
                    },
                    "Gardener": {
                        "level": 4,
                        "exp": 280
                    },
                    "Herbalist": {
                        "level": 0,
                        "exp": 0
                    },
                    "Farmer": {
                        "level": 0,
                        "exp": 0
                    },
                    "Flockherd": {
                        "level": 2,
                        "exp": 210
                    },
                    "Apothecary": {
                        "level": 0,
                        "exp": 0
                    },
                    "Clothier": {
                        "level": 0,
                        "exp": 0
                    },
                    "Scribe": {
                        "level": 0,
                        "exp": 0
                    },
                    "Artist": {
                        "level": 0,
                        "exp": 0
                    },
                    "Blacksmith": {
                        "level": 0,
                        "exp": 0
                    },
                    "Craftscat": {
                        "level": 0,
                        "exp": 0
                    },
                    "Builder": {
                        "level": 0,
                        "exp": 0
                    },
                    "Mason": {
                        "level": 0,
                        "exp": 0
                    },
                    "Baker": {
                        "level": 0,
                        "exp": 0
                    }
                },
                "class": "Scout",
                "classes": {
                    "Fighter": {
                        "level": 0,
                        "exp": 0
                    },
                    "Thief": {
                        "level": 0,
                        "exp": 0
                    },
                    "Guardian": {
                        "level": 0,
                        "exp": 0
                    },
                    "Ranger": {
                        "level": 0,
                        "exp": 0
                    },
                    "Medic": {
                        "level": 0,
                        "exp": 0
                    },
                    "Scout": {
                        "level": 2,
                        "exp": 106
                    },
                    "Bard": {
                        "level": 0,
                        "exp": 0
                    }
                },
                "personality": {
                    "type": "Pleasant",
                    "Bravery": 1,
                    "Benevolence": 10,
                    "Energy": 3,
                    "Extroversion": 4,
                    "Dedication": 1
                },
                "stats": {
                    "Strength": 10,
                    "Agility": 9,
                    "Health": 18,
                    "Finesse": 17,
                    "Cleverness": 16,
                    "Perception": 19,
                    "Luck": 13
                },
                "genes": [
                    "C",
                    "N",
                    "S",
                    "L",
                    "L",
                    "B",
                    "O",
                    "F",
                    "?",
                    "3",
                    "Y",
                    "?",
                    "T",
                    "P",
                    "?",
                    "?",
                    "?",
                    "?",
                    "?",
                    "?",
                    "?",
                    "?"
                ],
                "lastUpdated": "Tue Apr 09 2024 22:18:32 GMT-0500 (Central Daylight Time)"
            },
            "286346": {
                "id": 286346,
                "name": "Henley",
                "travelling": false,
                "birthday": {
                    "year": 8,
                    "season": 2,
                    "day": 32
                },
                "age": "Adult",
                "pronouns": {
                    "primary": "he",
                    "secondary": "him"
                },
                "wind": "North",
                "aspect": "Undiscovered",
                "origin": "Born in Nestor's Wood",
                "species": "Not-Cat",
                "size": [
                    11,
                    4.99
                ],
                "furLength": "Longhair",
                "furColor": [
                    "Chocolate",
                    "Standard"
                ],
                "pattern": "Solid",
                "white": {
                    "markings": "Ears, Tail, & Toes",
                    "type": "I",
                    "level": 3
                },
                "eyeColor": "Dark Brown",
                "trinket": {
                    "name": "Giant Maple Seed",
                    "stat": "Finesse",
                    "mod": 2
                },
                "job": "Artist",
                "jobs": {
                    "Hunter": {
                        "level": 0,
                        "exp": 0
                    },
                    "Gatherer": {
                        "level": 0,
                        "exp": 0
                    },
                    "Miner": {
                        "level": 0,
                        "exp": 0
                    },
                    "Fisher": {
                        "level": 0,
                        "exp": 0
                    },
                    "Bugcatcher": {
                        "level": 0,
                        "exp": 0
                    },
                    "Gardener": {
                        "level": 0,
                        "exp": 0
                    },
                    "Herbalist": {
                        "level": 0,
                        "exp": 0
                    },
                    "Farmer": {
                        "level": 0,
                        "exp": 0
                    },
                    "Flockherd": {
                        "level": 0,
                        "exp": 0
                    },
                    "Apothecary": {
                        "level": 0,
                        "exp": 0
                    },
                    "Clothier": {
                        "level": 0,
                        "exp": 0
                    },
                    "Scribe": {
                        "level": 0,
                        "exp": 0
                    },
                    "Artist": {
                        "level": 4,
                        "exp": 80
                    },
                    "Blacksmith": {
                        "level": 0,
                        "exp": 0
                    },
                    "Craftscat": {
                        "level": 0,
                        "exp": 0
                    },
                    "Builder": {
                        "level": 0,
                        "exp": 0
                    },
                    "Mason": {
                        "level": 0,
                        "exp": 0
                    },
                    "Baker": {
                        "level": 0,
                        "exp": 0
                    }
                },
                "class": "Scout",
                "classes": {
                    "Fighter": {
                        "level": 0,
                        "exp": 0
                    },
                    "Thief": {
                        "level": 0,
                        "exp": 0
                    },
                    "Guardian": {
                        "level": 0,
                        "exp": 0
                    },
                    "Ranger": {
                        "level": 0,
                        "exp": 0
                    },
                    "Medic": {
                        "level": 0,
                        "exp": 0
                    },
                    "Scout": {
                        "level": 4,
                        "exp": "Maximum Level"
                    },
                    "Bard": {
                        "level": 0,
                        "exp": 0
                    }
                },
                "personality": {
                    "type": "Gentle",
                    "Bravery": 8,
                    "Benevolence": 9,
                    "Energy": 3,
                    "Extroversion": 5,
                    "Dedication": 5
                },
                "stats": {
                    "Strength": 12,
                    "Agility": 13,
                    "Health": 11,
                    "Finesse": 21,
                    "Cleverness": 16,
                    "Perception": 20,
                    "Luck": 21
                },
                "genes": [
                    "C",
                    "N",
                    "?",
                    "L",
                    "L",
                    "B",
                    "?",
                    "F",
                    "?",
                    "3",
                    "N",
                    "N",
                    "?",
                    "?",
                    "Y",
                    "?",
                    3,
                    "I",
                    "?",
                    "?",
                    "?",
                    "?"
                ],
                "lastUpdated": "Tue Apr 09 2024 22:15:19 GMT-0500 (Central Daylight Time)"
            },
            "374449": {
                "id": 374449,
                "name": "🏹Uriel",
                "travelling": false,
                "birthday": {
                    "year": 8,
                    "season": 4,
                    "day": 31
                },
                "age": "Adult",
                "pronouns": {
                    "primary": "they",
                    "secondary": "them"
                },
                "wind": "Trade",
                "aspect": "Undiscovered",
                "origin": "Born in Nestor's Wood",
                "species": "Not-Cat",
                "size": [
                    11,
                    4.99
                ],
                "furLength": "Longhair",
                "furColor": [
                    "Apricot-Snow",
                    "Watercolor"
                ],
                "pattern": "Lynxpoint",
                "white": {
                    "markings": "Bib & Boots",
                    "type": "C",
                    "level": 3
                },
                "eyeColor": "Dark Brown",
                "trinket": {
                    "name": "Glittering Stalactites",
                    "stat": "Finesse",
                    "mod": 3
                },
                "job": "Artist",
                "jobs": {
                    "Hunter": {
                        "level": 0,
                        "exp": 0
                    },
                    "Gatherer": {
                        "level": 0,
                        "exp": 0
                    },
                    "Miner": {
                        "level": 0,
                        "exp": 0
                    },
                    "Fisher": {
                        "level": 0,
                        "exp": 0
                    },
                    "Bugcatcher": {
                        "level": 0,
                        "exp": 0
                    },
                    "Gardener": {
                        "level": 1,
                        "exp": 10
                    },
                    "Herbalist": {
                        "level": 0,
                        "exp": 0
                    },
                    "Farmer": {
                        "level": 0,
                        "exp": 0
                    },
                    "Flockherd": {
                        "level": 0,
                        "exp": 0
                    },
                    "Apothecary": {
                        "level": 0,
                        "exp": 0
                    },
                    "Clothier": {
                        "level": 0,
                        "exp": 0
                    },
                    "Scribe": {
                        "level": 0,
                        "exp": 0
                    },
                    "Artist": {
                        "level": 2,
                        "exp": 80
                    },
                    "Blacksmith": {
                        "level": 0,
                        "exp": 0
                    },
                    "Craftscat": {
                        "level": 0,
                        "exp": 0
                    },
                    "Builder": {
                        "level": 0,
                        "exp": 0
                    },
                    "Mason": {
                        "level": 0,
                        "exp": 0
                    },
                    "Baker": {
                        "level": 0,
                        "exp": 0
                    }
                },
                "class": "Ranger",
                "classes": {
                    "Fighter": {
                        "level": 0,
                        "exp": 0
                    },
                    "Thief": {
                        "level": 0,
                        "exp": 0
                    },
                    "Guardian": {
                        "level": 0,
                        "exp": 0
                    },
                    "Ranger": {
                        "level": 2,
                        "exp": 103
                    },
                    "Medic": {
                        "level": 0,
                        "exp": 0
                    },
                    "Scout": {
                        "level": 0,
                        "exp": 0
                    },
                    "Bard": {
                        "level": 0,
                        "exp": 0
                    }
                },
                "personality": {
                    "type": "Curious",
                    "Bravery": 5,
                    "Benevolence": 7,
                    "Energy": 1,
                    "Extroversion": 2,
                    "Dedication": 10
                },
                "stats": {
                    "Strength": 15,
                    "Agility": 16,
                    "Health": 18,
                    "Finesse": 25,
                    "Cleverness": 13,
                    "Perception": 18,
                    "Luck": 11
                },
                "genes": [
                    "C",
                    "N",
                    "S",
                    "L",
                    "L",
                    "O",
                    "O",
                    "F",
                    "?",
                    "1",
                    "Y",
                    "?",
                    "T",
                    "P",
                    "Y",
                    "?",
                    3,
                    "C",
                    "?",
                    "?",
                    "?",
                    "?"
                ],
                "lastUpdated": "Tue Apr 09 2024 22:27:43 GMT-0500 (Central Daylight Time)"
            },
            "391737": {
                "id": 391737,
                "name": "Whisker",
                "travelling": false,
                "birthday": {
                    "year": 9,
                    "season": 1,
                    "day": 6
                },
                "age": "Adolescent",
                "pronouns": {
                    "primary": "it",
                    "secondary": "its"
                },
                "wind": "North",
                "aspect": "Undiscovered",
                "origin": "Born in Nestor's Wood",
                "species": "Not-Cat",
                "size": [
                    6,
                    2.72
                ],
                "furLength": "Shorthair",
                "furColor": [
                    "Chocolate",
                    "Standard"
                ],
                "pattern": "Lynxpoint",
                "white": {
                    "markings": "Locket & Toes",
                    "type": "C",
                    "level": 2
                },
                "eyeColor": "Dark Brown",
                "trinket": {
                    "name": "None",
                    "stat": "None",
                    "mod": "0"
                },
                "job": "Student",
                "jobs": {
                    "Hunter": {
                        "level": 0,
                        "exp": 0
                    },
                    "Gatherer": {
                        "level": 0,
                        "exp": 0
                    },
                    "Miner": {
                        "level": 0,
                        "exp": 0
                    },
                    "Fisher": {
                        "level": 0,
                        "exp": 0
                    },
                    "Bugcatcher": {
                        "level": 0,
                        "exp": 0
                    },
                    "Gardener": {
                        "level": 0,
                        "exp": 0
                    },
                    "Herbalist": {
                        "level": 0,
                        "exp": 0
                    },
                    "Farmer": {
                        "level": 0,
                        "exp": 0
                    },
                    "Flockherd": {
                        "level": 0,
                        "exp": 0
                    },
                    "Apothecary": {
                        "level": 0,
                        "exp": 0
                    },
                    "Clothier": {
                        "level": 0,
                        "exp": 0
                    },
                    "Scribe": {
                        "level": 0,
                        "exp": 0
                    },
                    "Artist": {
                        "level": 0,
                        "exp": 0
                    },
                    "Blacksmith": {
                        "level": 0,
                        "exp": 0
                    },
                    "Craftscat": {
                        "level": 0,
                        "exp": 0
                    },
                    "Builder": {
                        "level": 0,
                        "exp": 0
                    },
                    "Mason": {
                        "level": 0,
                        "exp": 0
                    },
                    "Baker": {
                        "level": 0,
                        "exp": 0
                    }
                },
                "class": "Unassigned",
                "classes": {
                    "Fighter": {
                        "level": 0,
                        "exp": 0
                    },
                    "Thief": {
                        "level": 0,
                        "exp": 0
                    },
                    "Guardian": {
                        "level": 0,
                        "exp": 0
                    },
                    "Ranger": {
                        "level": 0,
                        "exp": 0
                    },
                    "Medic": {
                        "level": 0,
                        "exp": 0
                    },
                    "Scout": {
                        "level": 0,
                        "exp": 0
                    },
                    "Bard": {
                        "level": 0,
                        "exp": 0
                    }
                },
                "personality": {
                    "type": "Protective",
                    "Bravery": 9,
                    "Benevolence": 8,
                    "Energy": 6,
                    "Extroversion": 6,
                    "Dedication": 10
                },
                "stats": {
                    "Strength": 9,
                    "Agility": 15,
                    "Health": 16,
                    "Finesse": 14,
                    "Cleverness": 12,
                    "Perception": 9,
                    "Luck": 13
                },
                "genes": [
                    "C",
                    "N",
                    "?",
                    "S",
                    "?",
                    "B",
                    "?",
                    "F",
                    "?",
                    "3",
                    "Y",
                    "?",
                    "T",
                    "P",
                    "Y",
                    "?",
                    2,
                    "C",
                    "?",
                    "?",
                    "?",
                    "?"
                ],
                "lastUpdated": "Tue Apr 09 2024 22:21:27 GMT-0500 (Central Daylight Time)"
            },
            "414108": {
                "id": 414108,
                "name": "Zip",
                "travelling": false,
                "birthday": {
                    "year": 7,
                    "season": 1,
                    "day": 49
                },
                "age": "Adult",
                "pronouns": {
                    "primary": "they",
                    "secondary": "xe"
                },
                "wind": "South",
                "aspect": "Undiscovered",
                "origin": "Born in Gardenhome City",
                "species": "Not-Cat",
                "size": [
                    14,
                    6.35
                ],
                "furLength": "Longhair",
                "furColor": [
                    "Brown",
                    "Standard"
                ],
                "pattern": "Mink",
                "white": {
                    "markings": "Bib & Boots",
                    "type": "C",
                    "level": 3
                },
                "eyeColor": "Dark Brown",
                "trinket": {
                    "name": "Feather Charm",
                    "stat": "Cleverness",
                    "mod": 3
                },
                "job": "Herbalist",
                "jobs": {
                    "Hunter": {
                        "level": 0,
                        "exp": 0
                    },
                    "Gatherer": {
                        "level": 1,
                        "exp": 40
                    },
                    "Miner": {
                        "level": 0,
                        "exp": 0
                    },
                    "Fisher": {
                        "level": 0,
                        "exp": 0
                    },
                    "Bugcatcher": {
                        "level": 0,
                        "exp": 0
                    },
                    "Gardener": {
                        "level": 0,
                        "exp": 0
                    },
                    "Herbalist": {
                        "level": 3,
                        "exp": 150
                    },
                    "Farmer": {
                        "level": 0,
                        "exp": 0
                    },
                    "Flockherd": {
                        "level": 0,
                        "exp": 0
                    },
                    "Apothecary": {
                        "level": 0,
                        "exp": 0
                    },
                    "Clothier": {
                        "level": 0,
                        "exp": 0
                    },
                    "Scribe": {
                        "level": 0,
                        "exp": 0
                    },
                    "Artist": {
                        "level": 0,
                        "exp": 0
                    },
                    "Blacksmith": {
                        "level": 0,
                        "exp": 0
                    },
                    "Craftscat": {
                        "level": 0,
                        "exp": 0
                    },
                    "Builder": {
                        "level": 0,
                        "exp": 0
                    },
                    "Mason": {
                        "level": 0,
                        "exp": 0
                    },
                    "Baker": {
                        "level": 0,
                        "exp": 0
                    }
                },
                "class": "Unassigned",
                "classes": {
                    "Fighter": {
                        "level": 0,
                        "exp": 0
                    },
                    "Thief": {
                        "level": 0,
                        "exp": 0
                    },
                    "Guardian": {
                        "level": 0,
                        "exp": 0
                    },
                    "Ranger": {
                        "level": 0,
                        "exp": 0
                    },
                    "Medic": {
                        "level": 0,
                        "exp": 0
                    },
                    "Scout": {
                        "level": 0,
                        "exp": 0
                    },
                    "Bard": {
                        "level": 0,
                        "exp": 0
                    }
                },
                "personality": {
                    "type": "Curious",
                    "Bravery": 4,
                    "Benevolence": 5,
                    "Energy": 3,
                    "Extroversion": 2,
                    "Dedication": 9
                },
                "stats": {
                    "Strength": 19,
                    "Agility": 9,
                    "Health": 14,
                    "Finesse": 18,
                    "Cleverness": 22,
                    "Perception": 13,
                    "Luck": 11
                },
                "genes": [
                    "C",
                    "S",
                    "?",
                    "L",
                    "L",
                    "?",
                    "B",
                    "F",
                    "?",
                    "2",
                    "Y",
                    "?",
                    "S",
                    "P",
                    "Y",
                    "?",
                    3,
                    "C",
                    "?",
                    "?",
                    "?",
                    "?"
                ],
                "lastUpdated": "Tue Apr 09 2024 22:17:07 GMT-0500 (Central Daylight Time)"
            },
            "452010": {
                "id": 452010,
                "name": "Crouton",
                "travelling": false,
                "birthday": {
                    "year": 9,
                    "season": 2,
                    "day": 17
                },
                "age": "Young Kitten",
                "pronouns": {
                    "primary": "they",
                    "secondary": "she"
                },
                "wind": "South",
                "aspect": "Undiscovered",
                "origin": "Born in Nestor's Wood",
                "species": "Not-Cat",
                "size": [
                    4.25,
                    1.93
                ],
                "furLength": "Longhair",
                "furColor": [
                    "Chocolate",
                    "Standard"
                ],
                "pattern": "Colorpoint",
                "white": {
                    "markings": "Left Piebald",
                    "type": "L",
                    "level": 6
                },
                "eyeColor": "Dark Brown",
                "trinket": {
                    "name": "None",
                    "stat": "None",
                    "mod": "0"
                },
                "job": "Tiny Adventurer",
                "jobs": {
                    "Hunter": {
                        "level": 0,
                        "exp": 0
                    },
                    "Gatherer": {
                        "level": 0,
                        "exp": 0
                    },
                    "Miner": {
                        "level": 0,
                        "exp": 0
                    },
                    "Fisher": {
                        "level": 0,
                        "exp": 0
                    },
                    "Bugcatcher": {
                        "level": 0,
                        "exp": 0
                    },
                    "Gardener": {
                        "level": 0,
                        "exp": 0
                    },
                    "Herbalist": {
                        "level": 0,
                        "exp": 0
                    },
                    "Farmer": {
                        "level": 0,
                        "exp": 0
                    },
                    "Flockherd": {
                        "level": 0,
                        "exp": 0
                    },
                    "Apothecary": {
                        "level": 0,
                        "exp": 0
                    },
                    "Clothier": {
                        "level": 0,
                        "exp": 0
                    },
                    "Scribe": {
                        "level": 0,
                        "exp": 0
                    },
                    "Artist": {
                        "level": 0,
                        "exp": 0
                    },
                    "Blacksmith": {
                        "level": 0,
                        "exp": 0
                    },
                    "Craftscat": {
                        "level": 0,
                        "exp": 0
                    },
                    "Builder": {
                        "level": 0,
                        "exp": 0
                    },
                    "Mason": {
                        "level": 0,
                        "exp": 0
                    },
                    "Baker": {
                        "level": 0,
                        "exp": 0
                    }
                },
                "class": "Unassigned",
                "classes": {
                    "Fighter": {
                        "level": 0,
                        "exp": 0
                    },
                    "Thief": {
                        "level": 0,
                        "exp": 0
                    },
                    "Guardian": {
                        "level": 0,
                        "exp": 0
                    },
                    "Ranger": {
                        "level": 0,
                        "exp": 0
                    },
                    "Medic": {
                        "level": 0,
                        "exp": 0
                    },
                    "Scout": {
                        "level": 0,
                        "exp": 0
                    },
                    "Bard": {
                        "level": 0,
                        "exp": 0
                    }
                },
                "personality": {
                    "type": "Gentle",
                    "Bravery": 8,
                    "Benevolence": 10,
                    "Energy": 5,
                    "Extroversion": 6,
                    "Dedication": 8
                },
                "stats": {
                    "Strength": 5,
                    "Agility": 4,
                    "Health": 3,
                    "Finesse": 4,
                    "Cleverness": 4,
                    "Perception": 5,
                    "Luck": 5
                },
                "genes": [
                    "C",
                    "S",
                    "?",
                    "L",
                    "L",
                    "?",
                    "B",
                    "F",
                    "?",
                    "3",
                    "Y",
                    "?",
                    "P",
                    "P",
                    "Y",
                    "?",
                    6,
                    "L",
                    "?",
                    "?",
                    "?",
                    "?"
                ],
                "lastUpdated": "Tue Apr 09 2024 22:20:18 GMT-0500 (Central Daylight Time)"
            },
            "454500": {
                "id": 454500,
                "name": "Midnight",
                "travelling": false,
                "birthday": {
                    "year": 9,
                    "season": 1,
                    "day": 49
                },
                "age": "Kitten",
                "pronouns": {
                    "primary": "he",
                    "secondary": "they"
                },
                "wind": "Trade",
                "aspect": "Undiscovered",
                "origin": "Migrated from Earth",
                "species": "Not-Cat",
                "size": [
                    5.5,
                    2.49
                ],
                "furLength": "Shorthair",
                "furColor": [
                    "Ginger-Chocolate",
                    "Tortoiseshell"
                ],
                "pattern": "Spotted",
                "white": {
                    "markings": "Nose & Toes",
                    "type": "P",
                    "level": 2
                },
                "eyeColor": "Dark Brown",
                "trinket": {
                    "name": "None",
                    "stat": "None",
                    "mod": "0"
                },
                "job": "Student",
                "jobs": {
                    "Hunter": {
                        "level": 0,
                        "exp": 0
                    },
                    "Gatherer": {
                        "level": 0,
                        "exp": 0
                    },
                    "Miner": {
                        "level": 0,
                        "exp": 0
                    },
                    "Fisher": {
                        "level": 0,
                        "exp": 0
                    },
                    "Bugcatcher": {
                        "level": 0,
                        "exp": 0
                    },
                    "Gardener": {
                        "level": 0,
                        "exp": 0
                    },
                    "Herbalist": {
                        "level": 0,
                        "exp": 0
                    },
                    "Farmer": {
                        "level": 0,
                        "exp": 0
                    },
                    "Flockherd": {
                        "level": 0,
                        "exp": 0
                    },
                    "Apothecary": {
                        "level": 0,
                        "exp": 0
                    },
                    "Clothier": {
                        "level": 0,
                        "exp": 0
                    },
                    "Scribe": {
                        "level": 0,
                        "exp": 0
                    },
                    "Artist": {
                        "level": 0,
                        "exp": 0
                    },
                    "Blacksmith": {
                        "level": 0,
                        "exp": 0
                    },
                    "Craftscat": {
                        "level": 0,
                        "exp": 0
                    },
                    "Builder": {
                        "level": 0,
                        "exp": 0
                    },
                    "Mason": {
                        "level": 0,
                        "exp": 0
                    },
                    "Baker": {
                        "level": 0,
                        "exp": 0
                    }
                },
                "class": "Unassigned",
                "classes": {
                    "Fighter": {
                        "level": 0,
                        "exp": 0
                    },
                    "Thief": {
                        "level": 0,
                        "exp": 0
                    },
                    "Guardian": {
                        "level": 0,
                        "exp": 0
                    },
                    "Ranger": {
                        "level": 0,
                        "exp": 0
                    },
                    "Medic": {
                        "level": 0,
                        "exp": 0
                    },
                    "Scout": {
                        "level": 0,
                        "exp": 0
                    },
                    "Bard": {
                        "level": 0,
                        "exp": 0
                    }
                },
                "personality": {
                    "type": "Adventurous",
                    "Bravery": 10,
                    "Benevolence": 8,
                    "Energy": 8,
                    "Extroversion": 10,
                    "Dedication": 9
                },
                "stats": {
                    "Strength": 5,
                    "Agility": 9,
                    "Health": 8,
                    "Finesse": 9,
                    "Cleverness": 4,
                    "Perception": 9,
                    "Luck": 11
                },
                "genes": [
                    "C",
                    "N",
                    "S",
                    "S",
                    "?",
                    "O",
                    "B",
                    "F",
                    "?",
                    "3",
                    "Y",
                    "?",
                    "S",
                    "S",
                    "Y",
                    "?",
                    2,
                    "P",
                    "?",
                    "?",
                    "?",
                    "?"
                ],
                "lastUpdated": "Tue Apr 09 2024 22:22:31 GMT-0500 (Central Daylight Time)"
            },
            "474528": {
                "id": 474528,
                "name": "Mr. Tummy Rubs",
                "travelling": false,
                "birthday": {
                    "year": 9,
                    "season": 2,
                    "day": 48
                },
                "age": "Bean",
                "pronouns": {
                    "primary": "they",
                    "secondary": "she"
                },
                "wind": "Trade",
                "aspect": "Undiscovered",
                "origin": "Born in Nestor's Wood",
                "species": "Not-Cat",
                "size": [
                    0.66,
                    0.3
                ],
                "furLength": "Longhair",
                "furColor": [
                    "Black-Red",
                    "Tortoiseshell"
                ],
                "pattern": "Colorpoint",
                "white": {
                    "markings": "Chin, Boots, & Belly",
                    "type": "L",
                    "level": 4
                },
                "eyeColor": "Dark Brown",
                "job": "Unassigned",
                "jobs": {
                    "Hunter": {
                        "level": 0,
                        "exp": 0
                    },
                    "Gatherer": {
                        "level": 0,
                        "exp": 0
                    },
                    "Miner": {
                        "level": 0,
                        "exp": 0
                    },
                    "Fisher": {
                        "level": 0,
                        "exp": 0
                    },
                    "Bugcatcher": {
                        "level": 0,
                        "exp": 0
                    },
                    "Gardener": {
                        "level": 0,
                        "exp": 0
                    },
                    "Herbalist": {
                        "level": 0,
                        "exp": 0
                    },
                    "Farmer": {
                        "level": 0,
                        "exp": 0
                    },
                    "Flockherd": {
                        "level": 0,
                        "exp": 0
                    },
                    "Apothecary": {
                        "level": 0,
                        "exp": 0
                    },
                    "Clothier": {
                        "level": 0,
                        "exp": 0
                    },
                    "Scribe": {
                        "level": 0,
                        "exp": 0
                    },
                    "Artist": {
                        "level": 0,
                        "exp": 0
                    },
                    "Blacksmith": {
                        "level": 0,
                        "exp": 0
                    },
                    "Craftscat": {
                        "level": 0,
                        "exp": 0
                    },
                    "Builder": {
                        "level": 0,
                        "exp": 0
                    },
                    "Mason": {
                        "level": 0,
                        "exp": 0
                    },
                    "Baker": {
                        "level": 0,
                        "exp": 0
                    }
                },
                "class": "Unassigned",
                "classes": {
                    "Fighter": {
                        "level": 0,
                        "exp": 0
                    },
                    "Thief": {
                        "level": 0,
                        "exp": 0
                    },
                    "Guardian": {
                        "level": 0,
                        "exp": 0
                    },
                    "Ranger": {
                        "level": 0,
                        "exp": 0
                    },
                    "Medic": {
                        "level": 0,
                        "exp": 0
                    },
                    "Scout": {
                        "level": 0,
                        "exp": 0
                    },
                    "Bard": {
                        "level": 0,
                        "exp": 0
                    }
                },
                "personality": {
                    "type": "Unknown",
                    "Bravery": 0,
                    "Benevolence": 0,
                    "Energy": 0,
                    "Extroversion": 0,
                    "Dedication": 0
                },
                "stats": {
                    "Strength": 0,
                    "Agility": 0,
                    "Health": 0,
                    "Finesse": 0,
                    "Cleverness": 0,
                    "Perception": 0,
                    "Luck": 0
                },
                "genes": [
                    "C",
                    "N",
                    "S",
                    "L",
                    "L",
                    "B",
                    "O",
                    "F",
                    "?",
                    "4",
                    "Y",
                    "?",
                    "P",
                    "P",
                    "Y",
                    "?",
                    4,
                    "L",
                    "?",
                    "?",
                    "?",
                    "?"
                ],
                "lastUpdated": "Tue Apr 09 2024 22:22:55 GMT-0500 (Central Daylight Time)"
            },
            "262755": {
                "id": 262755,
                "name": "Grim",
                "travelling": false,
                "birthday": {
                    "year": 8,
                    "season": 2,
                    "day": 15
                },
                "age": "Adult",
                "pronouns": {
                    "primary": "they",
                    "secondary": "them"
                },
                "wind": "North",
                "aspect": "Undiscovered",
                "origin": "Born in Nestor's Wood",
                "species": "Not-Cat",
                "size": [
                    17,
                    7.71
                ],
                "furLength": "Longhair",
                "furColor": [
                    "-hidden-",
                    "-hidden-"
                ],
                "pattern": "-hidden-",
                "white": {
                    "markings": "Albino",
                    "type": "C",
                    "level": 10
                },
                "eyeColor": "Pale Red",
                "trinket": {
                    "name": "None",
                    "stat": "None",
                    "mod": "0"
                },
                "job": "Baker",
                "jobs": {
                    "Hunter": {
                        "level": 0,
                        "exp": 0
                    },
                    "Gatherer": {
                        "level": 1,
                        "exp": 20
                    },
                    "Miner": {
                        "level": 0,
                        "exp": 0
                    },
                    "Fisher": {
                        "level": 0,
                        "exp": 0
                    },
                    "Bugcatcher": {
                        "level": 0,
                        "exp": 0
                    },
                    "Gardener": {
                        "level": 0,
                        "exp": 0
                    },
                    "Herbalist": {
                        "level": 0,
                        "exp": 0
                    },
                    "Farmer": {
                        "level": 0,
                        "exp": 0
                    },
                    "Flockherd": {
                        "level": 1,
                        "exp": 10
                    },
                    "Apothecary": {
                        "level": 0,
                        "exp": 0
                    },
                    "Clothier": {
                        "level": 0,
                        "exp": 0
                    },
                    "Scribe": {
                        "level": 0,
                        "exp": 0
                    },
                    "Artist": {
                        "level": 0,
                        "exp": 0
                    },
                    "Blacksmith": {
                        "level": 0,
                        "exp": 0
                    },
                    "Craftscat": {
                        "level": 0,
                        "exp": 0
                    },
                    "Builder": {
                        "level": 0,
                        "exp": 0
                    },
                    "Mason": {
                        "level": 0,
                        "exp": 0
                    },
                    "Baker": {
                        "level": 3,
                        "exp": 140
                    }
                },
                "class": "Unassigned",
                "classes": {
                    "Fighter": {
                        "level": 0,
                        "exp": 0
                    },
                    "Thief": {
                        "level": 0,
                        "exp": 0
                    },
                    "Guardian": {
                        "level": 0,
                        "exp": 0
                    },
                    "Ranger": {
                        "level": 0,
                        "exp": 0
                    },
                    "Medic": {
                        "level": 0,
                        "exp": 0
                    },
                    "Scout": {
                        "level": 0,
                        "exp": 0
                    },
                    "Bard": {
                        "level": 0,
                        "exp": 0
                    }
                },
                "personality": {
                    "type": "Gentle",
                    "Bravery": 6,
                    "Benevolence": 10,
                    "Energy": 4,
                    "Extroversion": 8,
                    "Dedication": 5
                },
                "stats": {
                    "Strength": 12,
                    "Agility": 13,
                    "Health": 17,
                    "Finesse": 20,
                    "Cleverness": 14,
                    "Perception": 17,
                    "Luck": 17
                },
                "genes": [
                    "C",
                    "N",
                    "?",
                    "L",
                    "L",
                    "?",
                    "?",
                    "?",
                    "?",
                    "?",
                    "?",
                    "?",
                    "?",
                    "?",
                    "Y",
                    "?",
                    10,
                    "C",
                    "?",
                    "?",
                    "?",
                    "?"
                ],
                "lastUpdated": "Wed Apr 10 2024 00:16:27 GMT-0500 (Central Daylight Time)"
            }
        }
    } else {
        console.log("Invalid test village - Failed to load.");
    }
}