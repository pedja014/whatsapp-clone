export async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    throw Error("Service workers are not supported bu this browser!");
  }
  await navigator.serviceWorker.register("/serviceWorker.js");
}

export async function getReadyServiceWOrker() {
  if (!("serviceWorker" in navigator)) {
    throw Error("Service workers are not supported bu this browser!");
  }
  return navigator.serviceWorker.ready;
}
