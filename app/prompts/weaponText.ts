import { getRandomSeed } from '../util/helper';

const trustedFamilyMemberSeeds = ['father', 'mother', 'grandfather', 'grandmother'];

function getRandomTrustedFamilyMember() {
  return getRandomSeed(trustedFamilyMemberSeeds);
}

const initScenarioSeeds = [
  'a room with a table that you might find in a fantasy adventure movie',
  'a random encounter with a merchant, offering to sell you mysterious wares',
  'an armory, where you are presented with a variety of weapon options',
  `being led into an attic by your ${getRandomTrustedFamilyMember()}, revealing several weapons that are family heirlooms`,
  'a clearing in a forest, where several weapons are leaning against the trees',
  'a secret room in your house that you have never seen, until now... revealing several weapons hanging on the wall',
];

function getRandomInitScenario() {
  return getRandomSeed(initScenarioSeeds);
}

const weaponPrompt = `Generate a list of 20 random weapons by name only, ranging from modern, historical, mythical, and makeshift. Make one of these weapons a silly item, but do not use the word silly. Make one of these weapons an item that could be purchased for less than $5.

Next: in a paragraph, describe ${getRandomInitScenario()}. The scene should be mysterious, and evoke a sense of anticipation. Describe the surroundings, where four weapons are seemingly waiting for one of them to be chosen, but do not describe the weapons or mention any weapon by name. 

Finally, combine all the information as a single JSON response, using the following format:

{
  "weaponOptions": [{
    "weaponName": "weapon"
  }],
  "paragraph": "description text"
}`;

export { weaponPrompt };
