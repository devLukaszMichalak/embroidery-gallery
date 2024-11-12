const imageNames = [
  'kwiatek-kontur.jpg',
  'alicja.jpg',
  'cecylia.jpg',
  'cecylia-blisko.jpg',
  'choinka-gory.jpg',
  'choinka-swiateczna.jpg',
  'bukiet.jpg',
  'gabrysia.jpg',
  'gabrysia-szkic.jpg',
  'gory.jpg',
  'kot.jpg',
  'krolikowskich.jpg',
  'martyny.jpg',
  'martyny-blisko.jpg',
//  'owoce.jpg',
  'owoce-kokarda.jpg',
  'cyndaquil-new.jpg',
//  'cyndaquil.jpg',
//  'cyndaquil-otoczony.jpg'
] as const;

export const imageUrls: MasonryElement[] = imageNames
  .map((element: typeof imageNames[number]): MasonryElement => `./assets/${element}`);

export type MasonryElement = `./assets/${typeof imageNames[number]}`;
