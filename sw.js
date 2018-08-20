// help from https://www.youtube.com/watch?v=ksXwaWHCW6k
const staticCacheName = 'restaurant-reviews-v1'; 
const cacheFiles = [
	'index.html', 
	'restaurant.html',
	'js/dbhelper.js',
	'js/main.js',
	'js/restaurant_info.js',
	'css/phone.css',
	'css/tablet.css',
	'css/desktop.css',
	'data/restaurants.json',
	'img/1.jpg', 
	'img/2.jpg',
	'img/3.jpg',
	'img/4.jpg',
	'img/5.jpg',
	'img/6.jpg',
	'img/7.jpg',
	'img/8.jpg',
	'img/9.jpg',
	'img/10.jpg'
];

//installs new cache
self.addEventListener('install', function(event) {
	console.log('Installed'); 
	event.waitUntil(
		caches.open(staticCacheName).then(function(cache) {
			cache.addAll(cacheFiles); 
		}).then(function() {
			self.skipWaiting()
		})
	);
}); 

//this cleans up old cache
self.addEventListener('activate', function(event) {
	console.log('Activated');
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function(cacheName) {
					return cacheName.startsWith('restaurant-') &&
						cacheName !== staticCacheName;
				}).map(function(cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
}); 

//shows the cached files when offline
self.addEventListener('fetch', function(event) {
	console.log('fetching cache content'); 
	event.respondWith(
		fetch(event.request).catch(function() {
			console.log('offline');
			caches.match(event.request);
		})
	); 
});
