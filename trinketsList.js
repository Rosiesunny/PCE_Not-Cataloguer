let trinketsList = {
    'Handmade Fluffluff Toy': 'fluffball',
    'Acorn': 'acorn',
    'Highly Unusual Leaves': 'leaves_unusual',
    'Herbal Pouch': 'herbal_pouch',
    'Heart-Shaped Rock': 'rock_heart',
    'Reed Pipes': 'reed_pipes',
    'Snail Shell': 'snail_shell',
    'Decorated Bone': 'bone_decorated',
    'Decorated Stick': 'stick_decorated',
    'Feather Charm': 'feather_charm',
    'Buttercup': 'buttercup',
    'Glittering Stalactites': 'stalactites_glitter',
    'Color-Dyed Cotton Pod': 'cottonseed_color',
    'Cattail': 'cattail',
    'Glittering Geode': 'geode',
    'Decorated Tooth': 'tooth_decorated',
    'Giant Dandelion Seed': 'dandelion_seed',
    'Giant Maple Seed': 'maple_seed',
    'Driftwood': 'driftwood',
    'Romance Novel': 'book_romance',
    'Book of Music': 'book_music',
    'Adventure Novel': 'book_adventure',
    'Horror Novel': 'book_horror',
    'The Not-Cat Almanac': 'book_almanac',
    'Poetry Collection': 'book_poetry',
    'Literary Fiction Novel': 'book_literary',
    'Fantasy Novel': 'book_fantasy',
    'Combat Strategy Guide': 'book_combat',
    "Nestor's Wood Field Guide": 'book_fieldguide',
    'Medicinal Herbs Guide': 'book_medicinal',
    "Craftscat's Collection": 'book_crafts',
    'Theories of Math': 'book_math',
    'Mystery Novel': 'book_mystery',
    'Folklore Collection': 'book_folklore',
    'Thorny Vine': 'thorny_vine',
    'Palm Branch': 'palm_branch',
    'Scalloped Seashell': 'seashell_scalloped',
    'Turquoise Gemstone': 'gemtrinket_turquoise',
    'Handdrawn Map': 'map_handdrawn',
    'Handmade Compass': 'compass_handmade',
    'Broken Artifact': 'broken_artifact',
    'Pine Cone': 'pine_cone',
    'Concert Tickets': 'concert_tickets',
    'Jar of Beach Sand': 'sand_jar',
    'Obsidian': 'gemtrinket_obsidian',
    'Rusted Gear': 'rusted_gear',
    'Crumpled Paper Ball': 'paper_crumpled',
    'Suspicious Scam Letter': 'letter_suspicious',
    'Blue Advertisement': 'not_ad_blue',
    'Red Advertisement': 'not_ad_red',
    'Free Toiletry Samples': 'free_samples',
    'Unwashed Woerm of Weakness': 'worm_weary',
    'Sneaky Snoodle of Slowness': 'worm_slowness',
    'The Wiggly Man of Regret': 'worm_regret',
    'Notorious Noodle Named Ned': 'worm_notorious',
    'Suspicious Snoodle of Unsmartness': 'worm_unsmartness',
    'Wary Woerm of Squinting': 'worm_squinting',
    'OSHA-Noncompliant Noodle': 'worm_oshanoncompliant',
    'Leathery Feathery Ball': 'leather_featherball',
    'Leather Rainbow Ball': 'leather_rainbowball',
    'Dried Rice Rattlers': 'rice_rattlers',
    'Evil Beanigator': 'evil_beanigator',
    'Wooden Cat Dolls': 'wooden_catdoll',
    'Purple Kitty Doll': 'purple_kittydoll',
    'Little Hunter Mouse Toy': 'toy_mouse',
    'Toy Boat': 'toy_boat',
    'Syllable Blocks': 'syllable_blocks',
    'Mysterious Miniature Puzzle Box': 'puzzle_box',
    'Fishing Practice Pole': 'fishing_practicepole',
    'Wooden Earth Train': 'wooden_earthtrain',
    'Silky Bunny Doll': 'silky_bunnydoll',
    'Coloring Book and Crayons': 'coloring_crayons',
    'Rainbow Springies': 'rainbow_springies',
    'Springy Sproingy Thingy': 'springy_sproinger',
    'Jingly Bells': 'jingly_bells',
    'Blanket Made with Love': 'blanket_love',
    'Long Blue Ribbon': 'long_ribbon',
    'Collection of Stacking Rocks': 'stackingrocks',
    'Mr. Leafy': 'mr_leafy',
    'Chewy Stick': 'chewy_stick',
    'Cuddly Nestor Doll': 'cuddly_nestordoll',
    'Lucky Sock': 'lucky_sock',
    'Dr. Leaferson': 'dr_leaferson',
    'Plush Caterpillar Toys': 'plush_caterpillars',
    'Roller Ball Tower': 'rollerball_tower',
    'Colorful Bean Bags': 'colorful_beanbags',
    'Plump Fox Plushie': 'plump_foxplushie',
    'North Runestone Pendant': 'runestone_north',
    'South Runestone Pendant': 'runestone_south',
    'Trade Runestone Pendant': 'runestone_trade',
    'Null Runestone Pendant': 'runestone_null',
    'Ancient Lantern': 'lantern',
    'Weathered Knife': 'hotw_knife',
    'Mossy Moose Figurine': 'moose_mossy',
    'Strange Metal Star': 'star_metal',
    "Forest's Eye Pendant": 'pendant_eye',
    'Lost Keys': 'keys_lost',
    'Bizarre Cube': 'cube_bizarre',
    'Cat Ear Lyre': 'lyre_catear',
    'Log Cutting Pendant': 'pendant_log',
    'Discarded Alchemical Bottle': 'alchemical_bottle',
    'Berry-Picking Bucket': 'bucket_berries',
    'Carved Bird Whistle': 'whistle_bird',
    'Giant Gilded Owl Feather': 'owlfeather_gilded',
    'Engraved Gold Ring': 'ring_engraved',
    'Blooming Nightgloom': 'blooming_nightgloom',
    'Blooming Frostdew': 'blooming_frostdew',
    'Discarded Alchemical Bowl': 'alchemical_bowl',
    'Broken Mirror': 'broken_mirror',
    'Broken Clock': 'broken_clock',
    "Fighter's Medallion": 'medallion_fighter',
    "Thief's Medallion": 'medallion_thief',
    "Guardian's Medallion": 'medallion_guardian',
    "Ranger's Medallion": 'medallion_ranger',
    "Medic's Medallion": 'medallion_medic',
    "Scout's Medallion": 'medallion_scout',
    "Bard's Medallion": 'medallion_bard',
    "Traveler's Ribbon": 'ribbon_traveler',
    "Explorer's Ribbon": 'ribbon_explorer',
    "Adventurer's Ribbon": 'ribbon_adventurer',
    "Hero's Ribbon": 'ribbon_hero',
    "Adventurer's Journal": 'journal_adventurer',
    'Raw Essence Crystal': 'essence_crystal',
    'Address Book': 'book_address',
    '"I Love the Mail" Button': 'button_lovemail',
    '"I Hate the Mail" Button': 'button_hatemail',
    'Favorite Teal Meteorite': 'meteorite_fav_teal',
    'Favorite Purple Meteorite': 'meteorite_fav_purple',
    'Cute Ghosty Plushy': 'ghostplush_cute',
    'Silver-Painted Candle': 'painted_candle',
    'Careful Watcher Blanket': 'blanket_watchful',
    'Wooden Antlers': 'wooden_antlers',
    'Glass Ghosty Bauble': 'bauble_ghosty',
    'Scary Ghosty Plushy': 'ghostplush_scary',
    'Favorite Jingly Bell': 'favorite_bell',
    'Old Gilded Crest': 'crest_gilded',
    'Copper Hound Figurines': 'copper_hounds',
    'Royal Orchid': 'orchid_royal',
    'Snow Orchid': 'orchid_snow',
    'Bold Orchid': 'orchid_bold',
    'Ice Orchid': 'orchid_ice',
    'Ornate Gold Treasure Chalice': 'chalice_gold',
    'Ornate Silver Treasure Chalice': 'chalice_silver',
    'Ornate Copper Treasure Chalice': 'chalice_copper',
    'Stash of Stolen Jewels': 'stolen_jewels',
    'Large Sea Monster Tooth': 'seatooth_large',
    'Old Glass Kitty Figurine': 'oldglass_kitty',
    'Old Glass Fishy Figurine': 'oldglass_fishy',
    'Lucky Fishing Lure': 'fishing_lure',
    'Driftwood Lizard': 'driftwood_lizard',
    'Driftwood Dragon': 'driftwood_dragon',
    'Gilded Stone Bracelet': 'bracelet_gildedstone',
    'Polished Eye Agate': 'agate_eye',
    'Old Indigo Bottle': 'oldbottle_indigo',
    'Striped Wind Sock': 'windsock',
    'Blue Sea Dragon Scale': 'seadragonscale_blue',
    'Red Sea Dragon Scale': 'seadragonscale_red',
    'Bone Dice': 'bone_dice',
    'Spiraling Snail Shell': 'snailshell_spiraling',
    'Found Porcelain Mouse': 'porcelain_mouse',
    'Found Porcelain Turtle': 'porcelain_turtle',
    'Banded Snail Shell': 'snailshell_banded',
    'Polished Banded Agate': 'agate_banded',
    'Old Bottle Opener': 'oldbottle_opener',
    'Folded Paper Fish': 'foldedpaper_fish',
    'Porcelain Sea Shell': 'porcelain_seashell',
    'Fancy Silver Spoons': 'spoons_silver',
    'Porcelain Snail Shell': 'porcelain_snailshell',
    'Small Pouch of Gold': 'pouch_gold',
    'Small Pouch of Silver': 'pouch_silver',
    'Ruby Sea Star Pendant': 'pendant_rubystar',
    'Blue-Painted Candle': 'candle_bluepaint',
    'Wooden Deer Mask': 'mask_wood_deer',
    'Wooden Bunny Mask': 'mask_wood_bunny',
    'Wooden Bird Mask': 'mask_wood_bird',
    'Haunted Snowmeowto Bauble': 'bauble_snowmeowto',
    'Favorite Purple Ribbon': 'ribbon_favorite_purple',
    'Favorite Midnight Ribbon': 'ribbon_favorite_midnight',
    'Favorite Blue Pea Plant': 'peaplant_blue',
    'Favorite Indigo Pea Plant': 'peaplant_indigo',
    'Favorite Purple Pea Plant': 'peaplant_purple',
    'Favorite White Pea Plant': 'peaplant_white'
}


function convertTrinketTextLinesToArrayEasily() {
    // replace text with similar list, multi-line string with ` at the beginning and end, and each line starting and ending in ', all even numbers are the name of the trinket, all odds are the name of the file
    let text = `'Handmade Fluffluff Toy'
'fluffball'
'Acorn'
'acorn'
'Highly Unusual Leaves'
'leaves_unusual'
'Herbal Pouch'
'herbal_pouch'
'Heart-Shaped Rock'
'rock_heart'
'Reed Pipes'
'reed_pipes'
'Snail Shell'
'snail_shell'
'Decorated Bone'
'bone_decorated'
'Decorated Stick'
'stick_decorated'
'Feather Charm'
'feather_charm'
'Buttercup'
'buttercup'
'Glittering Stalactites'
'stalactites_glitter'
'Color-Dyed Cotton Pod'
'cottonseed_color'
'Cattail'
'cattail'
'Glittering Geode'
'geode'
'Decorated Tooth'
'tooth_decorated'
'Giant Dandelion Seed'
'dandelion_seed'
'Giant Maple Seed'
'maple_seed'
'Driftwood'
'driftwood'
'Romance Novel'
'book_romance'
'Book of Music'
'book_music'
'Adventure Novel'
'book_adventure'
'Horror Novel'
'book_horror'
'The Not-Cat Almanac'
'book_almanac'
'Poetry Collection'
'book_poetry'
'Literary Fiction Novel'
'book_literary'
'Fantasy Novel'
'book_fantasy'
'Combat Strategy Guide'
'book_combat'
'Nestor's Wood Field Guide'
'book_fieldguide'
'Medicinal Herbs Guide'
'book_medicinal'
'Craftscat's Collection'
'book_crafts'
'Theories of Math'
'book_math'
'Mystery Novel'
'book_mystery'
'Folklore Collection'
'book_folklore'
'Thorny Vine'
'thorny_vine'
'Palm Branch'
'palm_branch'
'Scalloped Seashell'
'seashell_scalloped'
'Turquoise Gemstone'
'gemtrinket_turquoise'
'Handdrawn Map'
'map_handdrawn'
'Handmade Compass'
'compass_handmade'
'Broken Artifact'
'broken_artifact'
'Pine Cone'
'pine_cone'
'Concert Tickets'
'concert_tickets'
'Jar of Beach Sand'
'sand_jar'
'Obsidian'
'gemtrinket_obsidian'
'Rusted Gear'
'rusted_gear'
'Crumpled Paper Ball'
'paper_crumpled'
'Suspicious Scam Letter'
'letter_suspicious'
'Blue Advertisement'
'not_ad_blue'
'Red Advertisement'
'not_ad_red'
'Free Toiletry Samples'
'free_samples'
'Unwashed Woerm of Weakness'
'worm_weary'
'Sneaky Snoodle of Slowness'
'worm_slowness'
'The Wiggly Man of Regret'
'worm_regret'
'Notorious Noodle Named Ned'
'worm_notorious'
'Suspicious Snoodle of Unsmartness'
'worm_unsmartness'
'Wary Woerm of Squinting'
'worm_squinting'
'OSHA-Noncompliant Noodle'
'worm_oshanoncompliant'
'Leathery Feathery Ball'
'leather_featherball'
'Leather Rainbow Ball'
'leather_rainbowball'
'Dried Rice Rattlers'
'rice_rattlers'
'Evil Beanigator'
'evil_beanigator'
'Wooden Cat Dolls'
'wooden_catdoll'
'Purple Kitty Doll'
'purple_kittydoll'
'Little Hunter Mouse Toy'
'toy_mouse'
'Toy Boat'
'toy_boat'
'Syllable Blocks'
'syllable_blocks'
'Mysterious Miniature Puzzle Box'
'puzzle_box'
'Fishing Practice Pole'
'fishing_practicepole'
'Wooden Earth Train'
'wooden_earthtrain'
'Silky Bunny Doll'
'silky_bunnydoll'
'Coloring Book and Crayons'
'coloring_crayons'
'Rainbow Springies'
'rainbow_springies'
'Springy Sproingy Thingy'
'springy_sproinger'
'Jingly Bells'
'jingly_bells'
'Blanket Made with Love'
'blanket_love'
'Long Blue Ribbon'
'long_ribbon'
'Collection of Stacking Rocks'
'stackingrocks'
'Mr. Leafy'
'mr_leafy'
'Chewy Stick'
'chewy_stick'
'Cuddly Nestor Doll'
'cuddly_nestordoll'
'Lucky Sock'
'lucky_sock'
'Dr. Leaferson'
'dr_leaferson'
'Plush Caterpillar Toys'
'plush_caterpillars'
'Roller Ball Tower'
'rollerball_tower'
'Colorful Bean Bags'
'colorful_beanbags'
'Plump Fox Plushie'
'plump_foxplushie'
'North Runestone Pendant'
'runestone_north'
'South Runestone Pendant'
'runestone_south'
'Trade Runestone Pendant'
'runestone_trade'
'Null Runestone Pendant'
'runestone_null'
'Ancient Lantern'
'lantern'
'Weathered Knife'
'hotw_knife'
'Mossy Moose Figurine'
'moose_mossy'
'Strange Metal Star'
'star_metal'
'Forest's Eye Pendant'
'pendant_eye'
'Lost Keys'
'keys_lost'
'Bizarre Cube'
'cube_bizarre'
'Cat Ear Lyre'
'lyre_catear'
'Log Cutting Pendant'
'pendant_log'
'Discarded Alchemical Bottle'
'alchemical_bottle'
'Berry-Picking Bucket'
'bucket_berries'
'Carved Bird Whistle'
'whistle_bird'
'Giant Gilded Owl Feather'
'owlfeather_gilded'
'Engraved Gold Ring'
'ring_engraved'
'Blooming Nightgloom'
'blooming_nightgloom'
'Blooming Frostdew'
'blooming_frostdew'
'Discarded Alchemical Bowl'
'alchemical_bowl'
'Broken Mirror'
'broken_mirror'
'Broken Clock'
'broken_clock'
'Fighter's Medallion'
'medallion_fighter'
'Thief's Medallion'
'medallion_thief'
'Guardian's Medallion'
'medallion_guardian'
'Ranger's Medallion'
'medallion_ranger'
'Medic's Medallion'
'medallion_medic'
'Scout's Medallion'
'medallion_scout'
'Bard's Medallion'
'medallion_bard'
'Traveler's Ribbon'
'ribbon_traveler'
'Explorer's Ribbon'
'ribbon_explorer'
'Adventurer's Ribbon'
'ribbon_adventurer'
'Hero's Ribbon'
'ribbon_hero'
'Adventurer's Journal'
'journal_adventurer'
'Raw Essence Crystal'
'essence_crystal'
'Address Book'
'book_address'
'"I Love the Mail" Button'
'button_lovemail'
'"I Hate the Mail" Button'
'button_hatemail'
'Favorite Teal Meteorite'
'meteorite_fav_teal'
'Favorite Purple Meteorite'
'meteorite_fav_purple'
'Cute Ghosty Plushy'
'ghostplush_cute'
'Silver-Painted Candle'
'painted_candle'
'Careful Watcher Blanket'
'blanket_watchful'
'Wooden Antlers'
'wooden_antlers'
'Glass Ghosty Bauble'
'bauble_ghosty'
'Scary Ghosty Plushy'
'ghostplush_scary'
'Favorite Jingly Bell'
'favorite_bell'
'Old Gilded Crest'
'crest_gilded'
'Copper Hound Figurines'
'copper_hounds'
'Royal Orchid'
'orchid_royal'
'Snow Orchid'
'orchid_snow'
'Bold Orchid'
'orchid_bold'
'Ice Orchid'
'orchid_ice'
'Ornate Gold Treasure Chalice'
'chalice_gold'
'Ornate Silver Treasure Chalice'
'chalice_silver'
'Ornate Copper Treasure Chalice'
'chalice_copper'
'Stash of Stolen Jewels'
'stolen_jewels'
'Large Sea Monster Tooth'
'seatooth_large'
'Old Glass Kitty Figurine'
'oldglass_kitty'
'Old Glass Fishy Figurine'
'oldglass_fishy'
'Lucky Fishing Lure'
'fishing_lure'
'Driftwood Lizard'
'driftwood_lizard'
'Driftwood Dragon'
'driftwood_dragon'
'Gilded Stone Bracelet'
'bracelet_gildedstone'
'Polished Eye Agate'
'agate_eye'
'Old Indigo Bottle'
'oldbottle_indigo'
'Striped Wind Sock'
'windsock'
'Blue Sea Dragon Scale'
'seadragonscale_blue'
'Red Sea Dragon Scale'
'seadragonscale_red'
'Bone Dice'
'bone_dice'
'Spiraling Snail Shell'
'snailshell_spiraling'
'Found Porcelain Mouse'
'porcelain_mouse'
'Found Porcelain Turtle'
'porcelain_turtle'
'Banded Snail Shell'
'snailshell_banded'
'Polished Banded Agate'
'agate_banded'
'Old Bottle Opener'
'oldbottle_opener'
'Folded Paper Fish'
'foldedpaper_fish'
'Porcelain Sea Shell'
'porcelain_seashell'
'Fancy Silver Spoons'
'spoons_silver'
'Porcelain Snail Shell'
'porcelain_snailshell'
'Small Pouch of Gold'
'pouch_gold'
'Small Pouch of Silver'
'pouch_silver'
'Ruby Sea Star Pendant'
'pendant_rubystar'
'Blue-Painted Candle'
'candle_bluepaint'
'Wooden Deer Mask'
'mask_wood_deer'
'Wooden Bunny Mask'
'mask_wood_bunny'
'Wooden Bird Mask'
'mask_wood_bird'
'Haunted Snowmeowto Bauble'
'bauble_snowmeowto'
'Favorite Purple Ribbon'
'ribbon_favorite_purple'
'Favorite Midnight Ribbon'
'ribbon_favorite_midnight'
'Favorite Blue Pea Plant'
'peaplant_blue'
'Favorite Indigo Pea Plant'
'peaplant_indigo'
'Favorite Purple Pea Plant'
'peaplant_purple'
'Favorite White Pea Plant'
'peaplant_white'`
    console.log(text)
    let textarray = text.split("\n")
    console.log(textarray)
    let newtext = ""
    for (let i = 0; i < textarray.length; i++) {
        if (isEven(i)) {
            //this is the name of the trinket
            newtext += "" + String(textarray[i]) + ": "
        }
        if (isOdd(i)) {
            // this is the file name of the trinket
            newtext += String(textarray[i]) + ", "
        }
    }
    console.log(newtext)
    }

function isEven(n) {
    return n % 2 == 0
}

function isOdd(n) {
    return Math.abs(n % 2) == 1
}