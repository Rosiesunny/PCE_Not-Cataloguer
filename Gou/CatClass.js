// w3schools for understanding objects @ https://www.w3schools.com/js/js_objects.asp

const pronounsDict = {they: [they, them, their, theirs, themself],
    he: [he, him, his, his, himself], 
   she: [she, her, her, hers, herself],
    ae: [ae, aer, aer, aers, aerself],
    xe: [xe, xem, xyr, xyrs, xemself],
    it: [it, it, its, its, itself]
}


// w3schools for understanding classes @ https://www.w3schools.com/js/js_classes.asp

class Cat {

    constructor (textboxData) {

        // basic info
        this.catID
        this.name
        this.travelling                    // boolean value

        // basic data
        this.birthday
        this.age
        this.wind
        this.primaryPronoun                // "they", "he", "she", etc.
        this.secondaryPronoun              // same as above
        this.aspect
        this.origin

        // appearance
        this.species
        this.size
        this.furLength
        this.furColor
        this.pattern
        this.whiteType                     // one letter representation: C, P, L, R, I
        this.whiteLevel
        this.eyeColor

        // personality
        this.personalityType
        this.personalityStats              // Array w/ [Bravery, Benevlonence, Energy, Extroversion, Dedication]
        this.heldTrinket

        // attributes and occupations
        this.dayJob
        this.jobEXP                        // Some sort of key-value pair structure
        this.advClass
        this.advEXP                        // Same structure as jobExp
        this.baseStats                     // Array w/ [Str, Agi, Hlt, Fin, Clv, Per, Lck]

        // friends and family
        this.partners
        this.bestFriends
        this.friends

        this.family                        // might need some thinking for family tree generation

        // other
        this.wearing                       // the clothes the cat is currently wearing
        this.outfitPlan                    // to store an outfit plan
        this.tags
        this.userNotes

    }

}