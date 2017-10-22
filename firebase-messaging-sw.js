// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
importScripts('/__/firebase/3.9.0/firebase-app.js');
importScripts('/__/firebase/3.9.0/firebase-messaging.js');
importScripts('/__/firebase/init.js');
importScripts('/idb-keyval-min.js');
// importScripts('/node_modules/idb/lib/idb.js');

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


// function createDB(){
//   idb.open('cat_data', 1, function(upgradeDB){
//     let basket = upgradeDB.createObjectStore('cats', {
//       keypath: 'id'
//     });
//     basket.put({id:1, name:'Chester', color:'beige'});
//     basket.put({id:2, name:'Poe', color:'white'});
//   });
// }

self.addEventListener('install', () => {
  // ^ install the service worker
  //normally there would be some caching of assets here, but our site
  // has almost no assets and this service worker is just for sending and recievign fetches
})

self.addEventListener('activate', function(event) {
  // The activate event listener is automatically fired upon installation completing
  console.log("activation complete, database created");
});

function storeDataKeyVal(data){
  idbKeyval.set(data.key, data.value)
    .then(function(data){ return `stored ${data.key} and ${data.value}`})
    .catch(err => console.log(err))
}

function getDataKeyVal(data){
  idbKeyval.get(data.key)
    .then(function(val) {return val})
    .catch(err => console.log(err))
}

// const dbPromise = idb.open('keyval-store', 1, upgradeDB => {
//   upgradeDB.createObjectStore('keyval');
// });

self.addEventListener('push', function(event) {
  fetch('URL/ready')
    .then(function(response){
      console.log(response);
      return response.json })
    .then(function(json){
      if (json.method==='GET' ){
        getDataKeyVal(data).then(function(message){ return message })
      } else if ( json.method==='POST' ){
        storeDataKeyVal(data).then(function(message){ return message })
      } else {return `I don't know what to do with a request with ${response.method}`}
    })
    .then(function(message){ fetch('URL/ready', { method:'POST', body:`${message}`}
      .then(resp => console.log(resp))
      .catch(err => console.log(err))
    )}
  )
  // console.log(`this is a push event : ${event}`);
  // Here I need to add an event listener to accept incoming data from John's server

});

// self.addEventListener('fetch', function(event){
//   console.log(`this was accepted by fetch`);
// });

// fetch('Andy_and_Johns_URL', {})


// Here I'll add an event listener for a get request from John's server
// Here I'll add a method to retrieve the requested data from the idb
//
