import { getRandomSeed } from '../util/helper';

const artistSeeds = [
  'Albrecht Dürer',
  'Alexander Calder',
  'Amrita Sher-Gil',
  'Andrew Wyeth',
  'Amedeo Modigliani',
  'Andre Derain',
  'Andy Warhol',
  'Annibale Carracci',
  'Antony Gormley',
  'Arshile Gorky',
  'Artemisia Gentileschi',
  'Auguste Renoir',
  'Barnett Newman',
  'Ben Shahn',
  'Berthe Morisot',
  'Bill Traylor',
  'Camille Pissarro',
  'Caravaggio',
  'Carl Larsson',
  'Caspar David Friedrich',
  'Chaim Soutine',
  'Charles Demuth',
  'Charles Sheeler',
  'Childe Hassam',
  'Claude Monet',
  'Clyfford Still',
  'Constantin Brancusi',
  'Correggio',
  'Cy Twombly',
  'David Hockney',
  'Diego Rivera',
  'Edgar Degas',
  'Edouard Manet',
  'Edward Hopper',
  'Edward Weston',
  'Edwin Dickinson',
  'El Greco',
  'Ellsworth Kelly',
  'Emil Nolde',
  'Emily Carr',
  'Eric Fischl',
  'Ernst Ludwig Kirchner',
  'Eugene Delacroix',
  'Eva Hesse',
  'Francis Bacon',
  'Frank Stella',
  'Franz Kline',
  'Frederick Hammersley',
  'Frida Kahlo',
  'Gabriele Münter',
  'Georges Braque',
  'Georges Seurat',
  "Georgia O'Keeffe",
  'Gerhard Richter',
  'Giorgio de Chirico',
  'Gustav Klimt',
  'Hans Hofmann',
  'Helen Frankenthaler',
  'Henri Matisse',
  'Henri Rousseau',
  'Henry Moore',
  'Hokusai',
  'Howard Hodgkin',
  'Jackson Pollock',
  'Jacques-Louis David',
  'James Ensor',
  'James Turrell',
  'Jan van Eyck',
  'Jasper Johns',
  'Jean Dubuffet',
  'Jean-Auguste-Dominique Ingres',
  'Jean-Michel Basquiat',
  'Joan Mitchell',
  'John Constable',
  'John Currin',
  'John Singer Sargent',
  'Josef Albers',
  'Joseph Beuys',
  'Joseph Cornell',
  'Jules Olitski',
  'Käthe Kollwitz',
  'Kazimir Malevich',
  'Keith Haring',
  'Kiki Smith',
  'Klee',
  'Lee Krasner',
  'Leon Golub',
  'Leonardo da Vinci',
  'Léon Spilliaert',
  'Louise Bourgeois',
  'Lucian Freud',
  'Lucio Fontana',
  'Magdalena Abakanowicz',
  'Marc Chagall',
  'Marcel Duchamp',
  'Mark Rothko',
  'Mary Cassatt',
  'Max Beckmann',
  'Max Ernst',
  'Michelangelo',
  'Milton Avery',
  'Niki de Saint Phalle',
  'Odilon Redon',
  'Pablo Picasso',
  'Parmigianino',
  'Patrick Heron',
  'Paul Cézanne',
  'Paul Gauguin',
  'Paul Klee',
  'Paul Nash',
  'Paul Serusier',
  'Paul Strand',
  'Paula Modersohn-Becker',
  'Peter Lely',
  'Peter Paul Rubens',
  'Piet Mondrian',
  'Pierre Auguste Renoir',
  'Pierre Bonnard',
  'Pietro Perugino',
  'Pieter Bruegel the Elder',
  'R. B. Kitaj',
  'Raphael',
  'Rembrandt',
  'René Magritte',
  'Richard Diebenkorn',
  'Richard Estes',
  'Richard Hamilton',
  'Robert Delaunay',
  'Robert Rauschenberg',
  'Robert Ryman',
  'Rockwell Kent',
  'Roger Fry',
  'Romare Bearden',
  'Rosalba Carriera',
  'Rosa Bonheur',
  'Roy Lichtenstein',
  'Rubens Peale',
  'Salvador Dalí',
  'Sam Francis',
  'Samuel Morse',
  'Sandro Botticelli',
  'Sir Edwin Landseer',
  'Sir Thomas Lawrence',
  'Sofonisba Anguissola',
  'Stanley Spencer',
  'Susan Rothenberg',
  'Tarsila do Amaral',
  'Théodore Rousseau',
  'Thomas Cole',
  'Thomas Eakins',
  'Thomas Gainsborough',
  'Thomas Hart Benton',
  'Thomas Jones',
  'Thomas Moran',
  'Thomas Sully',
  'Tim Rollins',
  'Tom Wesselmann',
  'Tony Cragg',
  'Tsuguharu Foujita',
  'Uccello',
  'Vasari',
  'Velázquez',
  'Verner Panton',
  'Vermeer',
  'Vincent van Gogh',
  'Walter Crane',
  'Wassily Kandinsky',
  'Willem de Kooning',
  'William Blake',
  'William Bouguereau',
  'William Hogarth',
  'William Holman Hunt',
  'William Merritt Chase',
  'William Morris',
  'William Turner',
  'Winslow Homer',
  'Yayoi Kusama',
  'Yves Klein',
  'Zdzislaw Beksinski',
  'Zhang Daqian',
  'Zoe Leonard',
  'Zurburán',
];

const photographerSeeds = [
  'Adam Fuss',
  'Adam Jones',
  'Albert Watson',
  'Alex Webb',
  'Alfred Stieglitz',
  'Alison Jackson',
  'Allan Sekula',
  'Andreas Gursky',
  'Annie Leibovitz',
  'Anton Corbijn',
  'Arnold Newman',
  'Art Wolfe',
  'August Sander',
  'Berenice Abbott',
  'Bill Brandt',
  'Bill Cunningham',
  'Brassai',
  'Brett Weston',
  'Bruce Davidson',
  'Bruce Gilden',
  'Candida Höfer',
  'Cindy Sherman',
  'Clarence John Laughlin',
  'Dan Winters',
  'Daido Moriyama',
  'Daniele Tamagni',
  'David Bailey',
  'David LaChapelle',
  'Diane Arbus',
  'Duane Michals',
  'Eadweard Muybridge',
  'Ed Ruscha',
  'Edward Burtynsky',
  'Edward Steichen',
  'Edward Weston',
  'Elliott Erwitt',
  'Emmet Gowin',
  'Ernst Haas',
  'Eve Arnold',
  'Francis Frith',
  'Francesca Woodman',
  'Frank Hurley',
  'Garry Winogrand',
  'George Hurrell',
  'George Rodger',
  'Graciela Iturbide',
  'Gregory Crewdson',
  'Guy Bourdin',
  'Hans Bellmer',
  'Harry Callahan',
  'Helen Levitt',
  'Helmut Newton',
  'Henri Cartier-Bresson',
  'Herb Ritts',
  'Hiroshi Sugimoto',
  'Horst P. Horst',
  'Imogen Cunningham',
  'Irving Penn',
  'Jill Greenberg',
  'Jim Goldberg',
  'Joel-Peter Witkin',
  'John Baldessari',
  'John Coffer',
  'John Coplans',
  'John Divola',
  'John Gossage',
  'John Gutmann',
  'John Heartfield',
  'John Sexton',
  'Jojo Laboube',
  'Josef Sudek',
  'Josef Koudelka',
  'Joseph Nicéphore Niépce',
  'Joyce Tenneson',
  'Jules Spinatsch',
  'Julia Margaret Cameron',
  'Julius Shulman',
  'Juno Calypso',
  'Kawauchi Rinko',
  'Ken Domon',
  'Kenro Izu',
  'Kevin Carter',
  'Kimiko Yoshida',
  'Larry Clark',
  'Laura Letinsky',
  'Lee Friedlander',
  'Lee Miller',
  'Lena Herzog',
  'Lewis Hine',
  'Lillian Bassman',
  'Lise Sarfati',
  'Lisette Model',
  'Liu Zheng',
  'Lois Greenfield',
  'Lola Álvarez Bravo',
  'Loretta Lux',
  'Lou Stoumen',
  'Luigi Ghirri',
  'Mads Nissen',
  'Man Ray',
  'Manuel Álvarez Bravo',
  'Marco Breuer',
  'Margaret Bourke-White',
  'Marie Cosindas',
  'Mark Klett',
  'Martin Parr',
  'Mary Ellen Mark',
  'Masahisa Fukase',
  'Matt Black',
  'Michael Kenna',
  'Michael Wolf',
  'Minor White',
  'Mitch Epstein',
  'Moholy-Nagy',
  'Nadav Kander',
  'Nan Goldin',
  'Nick Knight',
  'Nobuyoshi Araki',
  'Ori Gersht',
  'Oscar Gustave Rejlander',
  'Paolo Pellegrin',
  'Patrick Demarchelier',
  'Paul Outerbridge',
  'Paul Strand',
  'Pedro Meyer',
  'Pennie Smith',
  'Peter Beard',
  'Peter Lindbergh',
  'Philip-Lorca diCorcia',
  'Pieter Hugo',
  'Rineke Dijkstra',
  'Richard Avedon',
  'Richard Billingham',
  'Richard Misrach',
  'Robert Adams',
  'Robert Capa',
  'Robert Doisneau',
  'Robert Frank',
  'Robert Mapplethorpe',
  'Roe Ethridge',
  'Roni Horn',
  'Roy DeCarava',
  'Ryan McGinley',
  'Sally Mann',
  'Sam Abell',
  'Sarah Moon',
  'Saul Leiter',
  'Sebastião Salgado',
  'Shirin Neshat',
  'Simryn Gill',
  'Stephen Shore',
  'Steve McCurry',
  'Steven Meisel',
  'Susan Meiselas',
  'Takashi Homma',
  'Thomas Ruff',
  'Todd Hido',
  'Vivian Maier',
  'William Eggleston',
];

const imageStyleSeeds = [
  'isometric anime',
  'analytic drawing',
  'infographic drawing',
  'coloring book',
  'diagrammatic drawing',
  'diagrammatic portrait',
  'double exposure',
  '2D illustration',
  'isometric illustration',
  'pixel art',
  'futuristic style',
  'ornamental watercolour',
  'dark fantasy',
  'paper cut craft',
  'paper quilling',
  'patchwork collage',
  'iridescent',
  'ukiyo-e art',
  'watercolour landscape',
  'op art',
  'Japanese ink',
  'pastel drawing',
  'dripping art',
  'stained glass portrait',
  'graffiti portrait',
  'winter oil painting',
  'anime portrait',
  'cinematographic style',
  'typography art',
  'one-line drawing',
  'polaroid photo',
  'tattoo art',
];

const imageTypeSeeds = [
  'oil painting',
  'watercolor painting',
  'photograph',
  'polaroid',
  'stencil',
  'anime',
  'pixel art',
  'stained glass',
  'tattoo',
];

const photoLightingSeeds = [
  'Natural light',
  'Studio light',
  'Softbox',
  'Umbrella',
  'Beauty dish',
  'Ring light',
  'Strobe light',
  'Continuous light',
  'LED light',
  'Flashlight',
  'On-camera flash',
  'Off-camera flash',
  'Grid spot',
  'Snoot',
  'Fresnel',
  'Parabolic reflector',
  'Barn doors',
  'Gobo',
  'Reflector',
  'Diffuser',
  'Scrim',
  'Flag',
  'Gel',
  'Colored gels',
  'CTO (Color Temperature Orange) gel',
  'CTB (Color Temperature Blue) gel',
  'ND (Neutral Density) filter',
  'Polarizing filter',
  'Graduated ND filter',
  'Infrared filter',
  'UV filter',
  'Beauty lighting',
  'Key light',
  'Fill light',
  'Backlight',
  'Rim light',
  'Hair light',
  'Accent light',
  'Butterfly lighting',
  'Rembrandt lighting',
  'Loop lighting',
  'Split lighting',
  'High key lighting',
  'Low key lighting',
  'Hard light',
  'Soft light',
  'Directional light',
  'Flat light',
  'Broad light',
  'Short light',
];

const photoPerspectiveSeeds = [
  'Linear perspective',
  'Atmospheric perspective',
  'Fisheye perspective',
  'Forced perspective',
  "Bird's-eye view perspective",
  "Worm's-eye view perspective",
  'High angle perspective',
  'Low angle perspective',
  'Dutch angle perspective',
  'Tilted perspective',
  'Wide-angle perspective',
  'Telephoto perspective',
  'Macro perspective',
  'Panoramic perspective',
  '360-degree perspective',
  'Split-level perspective',
  'Reflection perspective',
  'Shadow perspective',
  'Texture perspective',
  'Symmetrical perspective',
];

const photoShotSeeds = [
  'Establishing Shot',
  'Extreme Wide Shot',
  'Wide Shot',
  'Full Shot',
  'Medium Wide Shot',
  'Cowboy Shot',
  'Medium Shot',
  'Medium Close Up',
  'Close Up',
  'Extreme Close Up',
];

const imagePrompt = (description: string) => {
  // const prompt = `Create a ${getRandomSeed(imageTypeSeeds)}, in the style of ${getRandomSeed(photographerSeeds)} using the following keywords: + ${keywords}`;

  // const prompt = `Create a ${getRandomSeed(photoShotSeeds)} photo, using ${getRandomSeed(photoPerspectiveSeeds)} and ${getRandomSeed(photoLightingSeeds)}, based on the following: ${description}.`

  const prompt = `Create a ${getRandomSeed(photoShotSeeds)} photo, in the style of ${getRandomSeed(
    photographerSeeds,
  )}, based on the following: ${description}.`;

  return prompt;
};

export { imagePrompt };
