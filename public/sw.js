const NAME = 'Cinemadict';
const VERSION = '1';
const CASHE_NAME = `${NAME}-${VERSION}`;
const urlsToCashe = [
  '/',
  'public/index.html',
  'public/bundle.js',
  'public/css/main.css',
  'public/fonts/OpenSans-Bold.woff2',
  'public/fonts/OpenSans-ExtraBold.woff2',
  'public/fonts/OpenSans-Regular.woff2',
  'public/images/emoji/angry.png',
  'public/images/emoji/puke.png',
  'public/images/emoji/sleeping.png',
  'public/images/emoji/smile.png',
  'public/images/icons/icon-favorite-active.svg',
  'public/images/icons/icon-favorite.svg',
  'public/images/icons/icon-watched-active.svg',
  'public/images/icons/icon-watched.svg',
  'public/images/icons/icon-watchlist-active.svg',
  'public/images/icons/icon-watchlist.svg',
  'public/images/posters/made-for-each-other.png',
  'public/images/posters/popeye-meets-sinbad.png',
  'public/images/posters/sagebrush-trail.jpg',
  'public/images/posters/santa-claus-conquers-the-martians.jpg',
  'public/images/posters/the-dance-of-life.jpg',
  'public/images/posters/the-great-flamarion.jpg',
  'public/images/posters/the-man-with-the-golden-arm.jpg',
  'public/images/background.png',
  'public/images/bitmap.png',
  'public/images/bitmap@2x.png',
  'public/images/bitmap@3x.png',
];
self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CASHE_NAME)
      .then((сache) => {
        console.log('opeN cashe');
        return сache.addAll(urlsToCashe);}));
});
