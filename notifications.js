const app = (() => {
  "use strict";

  let swRegistration = null;

  const notifyButton = document.getElementById("notify-btn");


  if ("Notification" in window) {
    Notification.requestPermission((status) => {
      console.log("Notification permission status:", status);
    });
  }
  function displayNotification() {
    if (Notification.permission === "granted") {
      navigator.serviceWorker.getRegistration().then((reg) => {
        const options = {
          body: "Welcome to my PWA Portfolio! 🚀",
          icon: "manifest_and_icons/icon512_rounded.png",
          badge: "manifest_and_icons/icon512_maskable.png", 
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
          },
          actions: [ 
            { action: "explore", title: "View Projects" },
            { action: "close", title: "Close" }
          ]
        };
        reg.showNotification("Heba Portfolio", options);
      });
    } else {
      console.log("Permission not granted for notifications");
    }
  }

  if (notifyButton) {
    notifyButton.addEventListener("click", () => {
      displayNotification();
    });
  }

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js")
        .then((swReg) => {
          console.log("Service Worker is registered", swReg);
          swRegistration = swReg;
        })
        .catch((err) => {
          console.error("Service Worker Error", err);
        });
    });
  }
})();