importScripts('/node_modules/idb/lib/idb.js');

function createDB(){
  idb.open('cat_data', 1, function(upgradeDB){
    let basket = upgradeDB.createObjectStore('cats', {
      keypath: 'id'
    });
    basket.put({id:1, name:'Chester', color:'beige'});
    basket.put({id:2, name:'Poe', color:'white'});
  });
}

const dbPromise = idb.open('keyval-store', 1, upgradeDB => {
  upgradeDB.createObjectStore('keyval');
});

self.addEventListener('install', () => {
// ^ install the service worker
  console.log('Installation complete.');
  // Here I need to send a message to John's server to say that the node is online
})

self.addEventListener('push', function(event) {
  console.log(`this is a push event : ${event}`)

  // Here I need to add an event listener to accept incoming data from John's server
  // here I need to send that data to the database using idb
})

fetch("Andy_and_Johns_URL")
  .then()



// Here I'll add an event listener for a get request from John's server
// Here I'll add a method to retrieve the requested data from the idb
//
