import _ from 'lodash';
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
  'Laser Rifle',
];

function buildAdversaryType() {
  const sources = [
    // 'Pick a random legendary creature',
    // 'Pick a random creature from Star Wars',
    // 'Pick a random alien race from Star Trek',
    'Pick a random monster from mythology',

    // 'Use this link from Wikipedia (https://en.wikipedia.org/wiki/List_of_Star_Wars_creatures), and pick a random creature',
    // 'Use this link from Wikipedia (https://en.wikipedia.org/wiki/List_of_Star_Trek_aliens), and pick a random alien'
  ];

  return getRandomSeed(sources);
}

function buildOptions() {
  const seriousOptions = ['attack', 'defend', 'improvise', 'evade'];
  const sillyOptions = [
    'flirt',
    'barter',
    'beg',
    'panic',
    'debate',
    'taunt',
    'insult',
    'entertain',
    'give PowerPoint presentation',
  ];

  const useSillyOption = Math.floor(Math.random() * 100) < 20;

  let options;

  if (useSillyOption) {
    options = [..._.shuffle(seriousOptions).slice(0, 3), ..._.shuffle(sillyOptions).slice(0, 1)];
  } else {
    options = [..._.shuffle(seriousOptions).slice(0, 4)];
  }

  return options;
}

const buildEncounterPrompt = (
  weapon: string = getRandomSeed(weaponSeeds),
) => `Use the following input to track my equippedItems:

{
  "weapon": ${weapon}
}

${buildAdversaryType()} as an adversary. In the style of a narrator at the beginning of a movie, using second person perspective, describe a scenario that involves an impending physical fight with this adversary in a paragraph five or six sentences long. 

Next, describe the location and adversary, along with details about two or three specific objects that are visible. The description should be a single paragraph, five or six sentences long.

Next, provide seven keywords describing the adversary and location. 

Next, create a title describing the encounter, in the style of a fairy tale or fable. This title should be at least seven words long.

Store this information as JSON, using the following format:
{
"creature": "",
"paragraph1": "",
"paragraph2": "",
"keywords": "",
"title": ""
}

Present me with four options I can take: ${buildOptions()}. 

Each option should include a detailed description of the option, 7 to 10 words in length, describing what I would do if this option was chosen. Use imperative verbs. Each option should include a damage number, between 10 and 30, indicating the damage I have taken.

Only one of the options should succeed, and this option should have a damage number of 0.

For each option, provide a detailed description of the option outcome as a paragraph, at least 6 sentences long. For each failed outcome, end by mentioning the numeric damage taken by me.

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

Finally, combine all the stored information as a single JSON response, but omit equippedItems.`;

export { buildEncounterPrompt };
