// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
importScripts('/__/firebase/3.9.0/firebase-app.js');
importScripts('/__/firebase/3.9.0/firebase-messaging.js');
importScripts('/__/firebase/init.js');
importScripts('/node_modules/idb-keyval/dist/idb-keyval-min.js');

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
      notificationOptions);
});

// importScripts('/node_modules/idb/lib/idb.js');

function createDB(){
  idb.open('cat_data', 1, function(upgradeDB){
    let basket = upgradeDB.createObjectStore('cats', {
      keypath: 'id'
    });
    basket.put({id:1, name:'Chester', color:'beige'});
    basket.put({id:2, name:'Poe', color:'white'});
  });
}

function storeData(dataEvent){
  let data = dataEvent.data;

}

function getData(dataEvent){
  let data = dataEvent.data;

}

// const dbPromise = idb.open('keyval-store', 1, upgradeDB => {
//   upgradeDB.createObjectStore('keyval');
// });

// self.addEventListener('install', () => {
//   // ^ install the service worker
//   //normally there would be some caching of assets here, but our site
//   // has almost no assets and this service worker is just for sending and recievign fetches
// })

self.addEventListener('activate', function(event) {
  // The activate event listener is automatically fired upon installation completing
  event.waitUntil(
    createDB()
  );
  console.log("activation complete, database created");
});

self.addEventListener('push', function(event) {
  console.log(`this is a push event : ${event}`);
  // Here I need to add an event listener to accept incoming data from John's server
  // here I need to send that data to the database using idb
});

// self.addEventListener('fetch', function(event){
//   console.log(`this was accepted by fetch`);
// });

// fetch('Andy_and_Johns_URL', {})


// Here I'll add an event listener for a get request from John's server
// Here I'll add a method to retrieve the requested data from the idb
//
