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

const monsterSeeds = [];

function buildAdversaryType() {
  const sources = [
    // 'Pick a random legendary creature',
    // 'Pick a random legendary creature from China',
    // 'Pick a random legendary creature from Japan',
    // 'Pick a random creature from Star Wars',
    // 'Pick a random alien race from Star Trek',
    // 'Pick a random monster from the Dungeons and Dragons "Monster Manual"',
    'Pick a random monster from the game Zork',
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

const buildEncounterPrompt = (
  weapon: string = getRandomSeed(weaponSeeds),
) => `Use the following input to track my equippedItems:

{
  "weapon": ${weapon}
}

${buildAdversaryType()} as an adversary. In the style of a narrator at the beginning of a movie, using second person perspective, describe a scenario that involves an impending physical fight with this adversary in a paragraph five or six sentences long. 

Next, describe the location and adversary, along with details about two or three specific objects that are visible. The description should be a single paragraph, five or six sentences long.

Next, in the style of an image prompt for DALL-E, summarize the adversary and location in two sentences, with the first sentence describing the adversary, and the second sentence describing the location.

Next, create a title describing the encounter, in the style of a fairy tale or fable. This title should be at least seven words long, or longer.

Next, describe a fatal outcome where I succumb to the wounds I have received and where the adversary has triumphed. The tone should be one of finality, and be similar to the ending of a story. This description should be two paragraphs long, with each paragraph at least five or six sentences long.

Store this information as JSON, using the following format:
{
"creature": "",
"paragraph1": "",
"paragraph2": "",
"summary": "",
"title": "",
"fatalOutcome1": "",
"fatalOutcome2": ""
}

Present me with four options I can take: ${buildOptions()}. 

Each option should include a detailed description of the option, 7 to 10 words in length, describing what I would do if this option was chosen. Use imperative verbs. Each option should include a damage number, between 5 and 30, indicating the damage I have taken.

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
