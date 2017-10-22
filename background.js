console.log("Javascript file loaded")

if ('serviceWorker' in navigator && 'PushManager' in window) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/firebase-messaging-sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
      swReg = registration;
      initialize();
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function initialize () {
  const pushButton = document.querySelector('#button')
  pushButton.addEventListener('click', function() {
    pushButton.disabled = true;
    if (isSubscribed) {
      // TODO: Unsubscribe user
    } else {
      subscribeUser();
    }
  });

  swReg.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);
    updateBtn()
  })
}

function updateBtn() {
  const pushButton = document.querySelector('#button')
  if (isSubscribed) {
    pushButton.innerText = 'Already signed up'
  }
}

function subscribeUser () {
  swReg.pushManager.subscribe({
    userVisibleOnly: true,
  })
  .then(function(subscription) {
    console.log('User is subscribed.');

    updateSubscriptionOnServer(subscription);

    isSubscribed = true;

    updateBtn();
  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
    updateBtn();
  });
}

function updateSubscriptionOnServer (subscription) {
  console.log('update subscription', subscription)
  const body = JSON.stringify({ token: subscription.endpoint })
  fetch('http://10.30.21.201:3001/nodes', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    mode: 'no-cors',
    body: body
  })
}
