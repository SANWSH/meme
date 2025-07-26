export const folderNames: Record<string, string> = {
  'AmonComplex': 'Karnak',
  'AmonComplex2': 'Luxor',
  'CutScenes': 'Cut Scenes',
  'DesertTemple': 'Desert Temple',
  'DreamWaterfalls': 'Moon Mountains',
  'Dunes': 'Dunes',
  'Fight': 'Fight',
  'GreatPyramid': 'Great Pyramid',
  'Hatshepsut': 'Hatshepsut',
  'KarnakApproaching': 'Alley of the Sphinxes ',
  'KarnakEnterComplex': 'Karnak Enter Complex',
  'Multiplayer': 'Multiplayer',
  'Oasis': 'Oasis',
  'RedCanyon': 'Valley of the Kings',
  'RichYards': 'Sacred Yards',
  'ThebesMetropolis': 'Thebes Metropolis',
  'ThebesSewers': 'Thebes Sewers',
  'ThebesSuburbs': 'Thebes Suburbs',
  'TombOfRamses': 'Tomb Of Ramses',
  'YellowTerrain': 'Sand Canyon',
  'BetaYellowTerrain': 'Sand Canyon v0.10',
  'BetaOasis': 'Oasis v0.10',
  'BetaDreamWaterfalls': 'Moon Mountains v0.10',
};

export const trackNames: Record<string, Record<string, string>> = {
  'AmonComplex': {
    'Medium': 'Medium',
    'Peace': 'Peace',
  },
  'AmonComplex2': {
    'Medium': 'Medium',
    'Peace': 'Peace',
  },
  'CutScenes': {
    'Bridge': 'Bridge',
    'FlyOverFinal': 'Fly Over Final',
    'GreatView': 'Great View',
    'Master08': 'Master 08',
    'MorphRoom': 'Morph Room',
    'MysticHorror': 'Mystic Horror',
    'Obelisk': 'Obelisk',
    'SequenceCompleted': 'Sequence Completed',
  },
  'DesertTemple': {
    'Egypt_MP1_medium': 'Medium',
    'egypt_MP1_peace': 'Peace',
  },
  'DreamWaterfalls': {
    'Medium': 'Medium',
    'Peace': 'Peace',
  },
  'Dunes': {
    'Medium': 'Medium',
    'Peace': 'Peace',
  },
  'Fight': {
    'Fight01': 'Fight 01',
    'Fight02': 'Fight 02',
    'Fight03': 'Fight 03',
    'Fight04': 'Fight 04',
    'Fight05': 'Fight 05',
    'Fight06': 'Fight 06',
    'Fight08': 'Fight 08',
  },
  'GreatPyramid': {
    'ApproachingPyramid': 'Approaching Pyramid',
    'GreatPyramid1': 'Speed x1',
    'GreatPyramid2': 'Speed x2',
    'GreatPyramid3': 'Speed x3',
    'GreatPyramid4': 'Speed x4',
    'LastFight': 'Last Fight',
  },
  'Hatshepsut': {
    'Intro': 'Intro',
    'Medium': 'Medium',
    'Peace': 'Peace',
  },
  'KarnakApproaching': {
    'Medium': 'Medium',
    'Peace': 'Peace',
  },
  'KarnakEnterComplex': {
    'Medium': 'Medium',
    'Peace': 'Peace',
  },
  'Multiplayer': {
    'Peace': 'Peace',
    'TheLostTomb': 'The Lost Tomb',
  },
  'Oasis': {
    'Medium': 'Medium',
    'Peace': 'Peace',
  },
  'RedCanyon': {
    'Medium': 'Medium',
    'Peace': 'Peace',
    'PeaceTemple': 'Peace Temple',
  },
  'RichYards': {
    'Medium': 'Medium',
    'Peace': 'Peace',
  },
  'ThebesMetropolis': {
    'Medium': 'Medium',
    'Peace': 'Peace',
  },
  'ThebesSewers': {
    'Medium': 'Medium',
    'Peace': 'Peace',
  },
  'ThebesSuburbs': {
    'Medium': 'Medium',
    'Peace': 'Peace',
  },
  'TombOfRamses': {
    'Medium': 'Medium',
    'Peace': 'Peace',
  },
  'YellowTerrain': {
    'Medium': 'Medium',
    'Peace': 'Peace',
    'TemplePeace': 'Temple Peace',
  },
  'BetaYellowTerrain': {
    'Medium': 'Medium',
    'Peace': 'Peace',
    'Fight': 'Fight',
  },
  'BetaOasis': {
    'Medium': 'Medium',
    'Peace': 'Peace',
  },
  'BetaDreamWaterfalls': {
    'Medium': 'Medium',
    'Peace': 'Peace',
    'Fight': 'Fight',
  },
};

export function getDisplayFolder(folder: string): string {
  return folderNames[folder] || folder;
}

export function getDisplayTrack(folder: string, track: string): string {
  return (trackNames[folder] && trackNames[folder][track]) || track;
}

export function getDisplayName(fullName: string): string {
  const [folder, track] = fullName.split(' - ');
  if (!folder || !track) return fullName;
  return `${getDisplayFolder(folder)} - ${getDisplayTrack(folder, track)}`;
} 