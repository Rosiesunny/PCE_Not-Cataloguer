const pronounsDict = {
    "they": ["they", "them", "their", "theirs", "themself"],
    "he": ["he", "him", "his", "his", "himself"], 
    "she": ["she", "her", "her", "hers", "herself"],
    "ae": ["ae", "aer", "aer", "aers", "aerself"],
    "xe": ["xe", "xem", "xyr", "xyrs", "xemself"],
    "it": ["it", "it", "its", "its", "itself"]
}

const seasonsDict = {
    1: "Spring",
    2: "Summer",
    3: "Fall",
    4: "Winter"
}

const jobEXPDict = {
    1: 140,
    2: 280,
    3: 560,
    4: 1120,
}

const classEXPDict = {
    1: 50,
    2: 150,
    3: 300,
}

village = {};


// All cats in the village - accessed by village.cats[catID]
village.cats = {};

let cachedVillage = JSON.parse(window.localStorage.getItem("myVillage"));
village = checkForDataStorageUpdates(cachedVillage, village)

console.log("Not-Cataloguer V 1.1 Alpha hotfix 19");

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
                "size": {
                    lbs: 13,
                    kg: 5.9
                },
                "fur": {
                    "length": "Longhair",
                    "color": "Snow",
                    "type": "Standard"
                },
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
                "lastUpdated": "Wed Apr 10 2024 14:59:40 GMT-0500 (Central Daylight Time)"
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
                "size": {
                    lbs: 21,
                    kg: 9.53
                },
                "fur": {
                    "length": "Longhair",
                    "color": "Chocolate-Ginger",
                    "type": "Tortoiseshell"
                },
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
                        "exp": 290
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
                "lastUpdated": "Wed Apr 10 2024 15:00:26 GMT-0500 (Central Daylight Time)"
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
                "size": {
                    lbs: 17,
                    kg: 7.71
                },
                "fur": {
                    "length": "Longhair",
                    "color": "-hidden-",
                    "type": "-hidden-"
                },
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
                        "exp": 150
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
                "lastUpdated": "Wed Apr 10 2024 15:01:53 GMT-0500 (Central Daylight Time)"
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
                "size": {
                    lbs: 11,
                    kg: 4.99
                },
                "fur": {
                    "length": "Longhair",
                    "color": "Chocolate",
                    "type": "Standard"
                },
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
                        "exp": 90
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
                "lastUpdated": "Wed Apr 10 2024 14:59:55 GMT-0500 (Central Daylight Time)"
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
                "size": {
                    lbs: 11,
                    kg: 4.99
                },
                "fur": {
                    "length": "Longhair",
                    "color": "Apricot-Snow",
                    "type": "Watercolor"
                },
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
                        "exp": 90
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
                "lastUpdated": "Wed Apr 10 2024 15:01:45 GMT-0500 (Central Daylight Time)"
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
                "size": {
                    lbs: 6,
                    kg: 2.72
                },
                "fur": {
                    "length": "Shorthair",
                    "color": "Chocolate",
                    "type": "Standard"
                },
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
                "lastUpdated": "Wed Apr 10 2024 15:00:38 GMT-0500 (Central Daylight Time)"
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
                "size": {
                    lbs: 14,
                    kg: 6.35
                },
                "fur": {
                    "length": "Longhair",
                    "color": "Brown",
                    "type": "Standard"
                },
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
                        "exp": 160
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
                "lastUpdated": "Wed Apr 10 2024 15:00:13 GMT-0500 (Central Daylight Time)"
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
                "size": {
                    lbs: 4.25,
                    kg: 1.93
                },
                "fur": {
                    "length": "Longhair",
                    "color": "Chocolate",
                    "type": "Standard"
                },
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
                "lastUpdated": "Wed Apr 10 2024 15:01:23 GMT-0500 (Central Daylight Time)"
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
                "size": {
                    lbs: 5.5,
                    kg: 2.49
                },
                "fur": {
                    "length": "Shorthair",
                    "color": "Ginger-Chocolate",
                    "type": "Tortoiseshell"
                },
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
                "lastUpdated": "Wed Apr 10 2024 15:00:58 GMT-0500 (Central Daylight Time)"
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
                "size": {
                    lbs: 0.66,
                    kg: 0.3
                },
                "fur": {
                    "length": "Longhair",
                    "color": "Black-Red",
                    "type": "Tortoiseshell"
                },
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
                "lastUpdated": "Wed Apr 10 2024 15:01:36 GMT-0500 (Central Daylight Time)"
            }
        }
    } else {
        console.log("Invalid test village - Failed to load.");
    }
}

function clearVillage() {
    window.localStorage.removeItem("myVillage");
    
    village = {};
    village.cats = {};
}



function checkForDataStorageUpdates(cachedVillage, village) {
    let storedVersion = localStorage.getItem("NotCataloguerVersion")
    if (storedVersion) {
        switch(storedVersion) {
            // basically a list of versions that will call individual update functions. does nothing for now. first one should be "case (current version) and just break/return"
            case "AAAA":
                "eeee"
            case "A1010":
                "PEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE"
        }
    }
    else {
        // village data is older than when we started storing versions in localStorage, initialize it if the village exists
        console.log(cachedVillage)
        console.log("PEPEPEPEPPEPEPEP")
        if (cachedVillage) {
            console.log("Old data detected (from Alpha 1.0/unstored version name), fixing data")
            cachedVillage = unnamedAlphaVersionClothesFix(cachedVillage)
            cachedVillage = AlphaOnePointOneVersionUpdate(cachedVillage)
        }
        else {
            return village
        }
    }
    return cachedVillage
}

function unnamedAlphaVersionClothesFix(cachedVillage) {
// first fix from Gou when we updated the clothing storage method, edited to exclude numslots as I don't use those
    if (!(cachedVillage === null)) {
        // Check initialization - currently only for backwards compatibility
        cats_list = Object.keys(cachedVillage.cats);
        for(var i = 0; i < cats_list.length; i++) {
            if (cachedVillage.cats[cats_list[i]].clothes === undefined) {
                cachedVillage.cats[cats_list[i]].clothes = {};
                cachedVillage.cats[cats_list[i]].clothes.wearing = {};
                for (var j = 1; j <= 12; j++) {
                    cachedVillage.cats[cats_list[i]].clothes.wearing[j] = {};
                }
            }
        }
        return cachedVillage
    }
}

function AlphaOnePointOneVersionUpdate(cachedVillage) {
    cats_list = Object.keys(cachedVillage.cats)
    for (let i = 0; i < cats_list.length; i++) {
        if (cachedVillage.cats[cats_list[i]].hasOwnProperty("eyeColor")) {
            let eyes = {
                color: cachedVillage.cats[cats_list[i]].eyeColor
            }
            cachedVillage.cats[cats_list[i]].eyes = eyes
            delete cachedVillage.cats[cats_list[i]].eyeColor
        }
        if (cachedVillage.cats[cats_list[i]].hasOwnProperty("genes")) {
            if (cachedVillage.cats[cats_list[i]].genes[9] !== "?") {
                cachedVillage.cats[cats_list[i]].genes[9] = Number(cachedVillage.cats[cats_list[i]].genes[9])
            }
        }
        console.log(cachedVillage.cats[cats_list[i]])
        if (cachedVillage.cats[cats_list[i]].hasOwnProperty("travelling")) {
            if (cachedVillage.cats[cats_list[i]].travelling == false) {
                cachedVillage.cats[cats_list[i]].location = "Active"
            }
            if (cachedVillage.cats[cats_list[i]].travelling == true) {
                cachedVillage.cats[cats_list[i]].location = "Travelling"
            }
            delete cachedVillage.cats[cats_list[i]].travelling
        }
    }
    console.log("Updated old data (if any) for Alpha 1.1")
    localStorage.setItem("NotCataloguerVersion", "Alpha 1.1")
    return cachedVillage
}