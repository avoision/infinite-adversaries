import { getRandomSeed } from '../util/helper';

const weaponSeeds = [
'Katana',
'Shotgun',
'Boomerang',
'Flamethrower',
'Battle Axe',
'Mace',
'Nunchucks',
'Crossbow',
'Poison Dart Gun',
'Chainsaw',
'Machete',
'Blowgun',
'Grenade Launcher',
'Harpoon',
'Cattle Prod',
'Samurai Sword',
'Rocket Launcher',
'Sling',
'War Hammer',
'Laser Rifle'
];


const encounterPrompt = `Use the following input to track my equippedItems:

{
  "weapon": ${getRandomSeed(weaponSeeds)}
}

Use this link from Wikipedia (https://en.wikipedia.org/wiki/List_of_legendary_creatures_by_type), and pick a random legendary creature as an adversary. In the style of a narrator at the beginning of a movie, using second person perspective, describe a scenario that involves an impending physical fight with this adversary in a paragraph five or six sentences long.

Additionally, describe the location and adversary, along with details about two or three specific objects that are visible. The description should be a single paragraph, five or six sentences long.

Additionally, provide seven keywords describing the adversary and location. 

Additionally, create a title describing the encounter, in the style of a fairy tale or fable. This title should be at least seven words long.

Store this information as JSON, using the following format:
{
"creature": "",
"paragraph1": "",
"paragraph2": "",
"keywords": "",
"title": ""
}

Present me with four options I can take: 'attack', 'defend', 'improvise', 'evade'. 

Each option should include a detailed description of the option, 7 to 10 words in length, describing what I would do if this option was chosen. Each option should include a damage number, between 10 and 30, indicating the damage I have taken.

Only one of the options should succeed, and this option should have a damage number of 0.

For each option, provide a 4 sentence description of the option outcome. For each failed outcome, end by mentioning the numeric damage taken by me.

Store the options as JSON, using the following format:
{
"options": [{
"type": "attack",
"description": "",
"damage": 12,
"outcome": "",
"success": false,
"hidden": false
}]}

Finally, combine all the stored information as a single JSON response, but omit equippedItems.`

export { encounterPrompt};
