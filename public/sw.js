const NAME = 'Cinemadict';
const VERSION = '1';
const CACHE_NAME = `${NAME}-${VERSION}`;
const RESPONSE_SAFE_TYPE = 'basic';
const HTTP_STATUS_OK = 200;
const urlsToCache = [
  '/',
  '/index.html',
  '/bundle.js',
  '/css/main.css',
  '/fonts/OpenSans-Bold.woff2',
  '/fonts/OpenSans-ExtraBold.woff2',
  '/fonts/OpenSans-Regular.woff2',
  '/images/emoji/angry.png',
  '/images/emoji/puke.png',
  '/images/emoji/sleeping.png',
  '/images/emoji/smile.png',
  '/images/icons/icon-favorite-active.svg',
  '/images/icons/icon-favorite.svg',
  '/images/icons/icon-watched-active.svg',
  '/images/icons/icon-watched.svg',
  '/images/icons/icon-watchlist-active.svg',
  '/images/icons/icon-watchlist.svg',
  '/images/posters/made-for-each-other.png',
  '/images/posters/popeye-meets-sinbad.png',
  '/images/posters/sagebrush-trail.jpg',
  '/images/posters/santa-claus-conquers-the-martians.jpg',
  '/images/posters/the-dance-of-life.jpg',
  '/images/posters/the-great-flamarion.jpg',
  '/images/posters/the-man-with-the-golden-arm.jpg',
  '/images/background.png',
  '/images/bitmap.png',
  '/images/bitmap@2x.png',
  '/images/bitmap@3x.png',
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME)
      .then((сache) => {
        return сache.addAll(urlsToCache);}));
});


self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys()
      .then(
        (keys) => Promise.all(
          keys.map(
            (key) => {

              if (key.startsWith(NAME) && key !== CACHE_NAME) {
                return caches.delete(key);
              }
              return null;
            })
            .filter((key) => key !== null),
        ),
      ),
  );
});
self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches.match(evt.request)
      .then((response) => {
        if (response) {
          return response;
        }

        const fetchRequest = evt.request.clone();

        return fetch(fetchRequest)
          .then((response) => {
            if (!response || response.status !== HTTP_STATUS_OK || response.type !== RESPONSE_SAFE_TYPE) {
              return response;
            }
            const responseClone = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => cache.put(fetchRequest, responseClone));

            return response;

          });
      }),
  );
});
