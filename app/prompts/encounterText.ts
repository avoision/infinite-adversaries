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

function getRandomWeapon() {
  return getRandomSeed(weaponSeeds);
}

const monsterSeeds = [];

function buildAdversaryType() {
  const sources = [
    'pick a random legendary creature from folklore',
    'pick a random legendary creature from mythology',
    'pick a random legendary creature from a country outside of the USA',
    'pick a random creature from Star Wars',
    'pick a random alien race from Star Trek',
    'pick a random monster from the Dungeons and Dragons "Monster Manual"',
    'pick a random monster from the game Zork',
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

  return options.join(', ');
}

const buildEncounterPrompt = (weapon: string) =>
  `Assume a protagonist is armed with: ${weapon}. 
  
  For these responses, act as a storyteller and create exciting stories full of action and fantasy. Always respond using second person perspective. These stories should be similar to fairy tales or myths.

  First, ${buildAdversaryType()} as an adversary. 
  
  Describe a scenario that involves an impending physical fight with this adversary. This description should be five or six sentences long.

  Next, describe the location and adversary, along with details about two or three specific objects that are visible. The description should be a single paragraph, five or six sentences long.

  Next, in the style of an image prompt for DALL-E, summarize the adversary and location in two sentences, with the first sentence describing the adversary, and the second sentence describing the location.

  Next, create a title describing the encounter. This title should be at least seven words long.

  Next, describe a fatal outcome where I succumb to the wounds I have received and where the adversary has triumphed. The tone should be one of finality, and be dramatic. This description should be two paragraphs long, with each paragraph at least five or six sentences long.

  Return this as a JSON object, using the following format:
  {
  "creature": "",
  "paragraph1": "",
  "paragraph2": "",
  "summary": "",
  "title": "",
  "fatalOutcome1": "",
  "fatalOutcome2": ""
  }`;

const buildOptionsPrompt = (weapon: string, creature: string, scenario: string) =>
  `Assume a protagonist is armed with: ${weapon}.

For these results, act as a storyteller. You should use second person perspective, and create exciting stories full of action and fantasy. You should never use the words "I" or "me". These stories should be similar to fairy tales or myths.

Use the following input that describes an impending physical fight with a ${creature} as an adversary: 

"${scenario}"

Provide four options: ${buildOptions()}. 

With imperative verbs, use three to six words to describe each option. 

Each option should include a damage number, between 5 and 30, indicating the damage inflicted by the adversary.

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

Return this JSON object.`;

export { buildEncounterPrompt, buildOptionsPrompt, getRandomWeapon };
