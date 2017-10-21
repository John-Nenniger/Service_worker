const idb = require("idb");

self.addEventListener('install', () => {

  const dbPromise = idb.open('keyval-store', 1, upgradeDB => {
  upgradeDB.createObjectStore('keyval');
});

  console.log('Installation complete.')
})
