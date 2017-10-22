importScripts('/idb-keyval-min.js');

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

  console.log('this is a push event', event)
});
