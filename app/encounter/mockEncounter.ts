import { Encounter } from './page';

const mockEncounter: Encounter = {
  creature: 'Orc',
  paragraph1:
    "You stand face to face with a fierce Orc, your bow and arrow at the ready. You can feel the tension in the air as the Orc's axe gleams in the moonlight and the bloodthirsty words that leave its lips send chills down your spine. You must act fast, or you will surely be lost in this encounter.",
  paragraph2:
    'You find yourself in a dark forest clearing, a single fire burning in the center of the space. To your left are two large boulders, and to your right is a thicket of trees. The Orc stands between you and the light of the fire, its eyes glowing in the night.',
  summary:
    'You are confronting an Orc in a forest clearing, between two boulders and a thicket of trees.',
  title: 'The Battle of the Brave Knight and the Bloodthirsty Orc',
  fatalOutcome1:
    'The ferocious Orc strikes with a powerful blow, and you feel the sharp pain of the axe slicing into your skin. You can feel the strength draining out of you and your vision slowly fading as you fall to the ground, defeated by the Orc.',
  fatalOutcome2:
    'The Orc stands victorious over your body, its glowing eyes never leaving you until the last of your breath escapes. You have lost the battle, and your life, to the Orc.',
  options: [
    {
      type: 'attack',
      description: 'Charge forward',
      damage: 12,
      outcome:
        'You swing your bow and arrow with all your might, but the Orc manages to dodge your attack and strikes you with its axe. You take 12 points of damage.',
      success: false,
      hidden: false,
    },
    {
      type: 'improvise',
      description: 'Make a distraction',
      damage: 8,
      outcome:
        'You throw a stone at the Orc’s feet, and it momentarily loses focus. However, its reflexes are too fast and it manages to strike you with its axe before you can escape. You take 8 points of damage.',
      success: false,
      hidden: false,
    },
    {
      type: 'evade',
      description: 'Dodge the axe',
      damage: 7,
      outcome:
        "You manage to dodge the Orc's axe and take a few steps back. However, it quickly regains its footing and strikes you with its axe. You take 7 points of damage.",
      success: false,
      hidden: false,
    },
    {
      type: 'defend',
      description: 'Block the axe',
      damage: 0,
      outcome:
        "You raise your bow and arrow and brace for the Orc's attack. You manage to block the axe with your bow and arrow and the Orc's force is diverted. You have won the battle.",
      success: true,
      hidden: false,
    },
  ],
  imageURL:
    'https://oaidalleapiprodscus.blob.core.windows.net/private/org-TvclE3HHlydCp5Hb9NvNeyl8/user-aELAcWRy1LRmLokHdUzjRo8t/img-7xjzvO8wJZpsTaJ6mM4Bf7Uz.png?st=2023-03-26T14%3A08%3A55Z&se=2023-03-26T16%3A08%3A55Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-25T22%3A35%3A13Z&ske=2023-03-26T22%3A35%3A13Z&sks=b&skv=2021-08-06&sig=5CmWKCXrMUbPAwtjrCMfkxYeD01l2bK9FiyzlRIQo6Y%3D',
};

export { mockEncounter };
