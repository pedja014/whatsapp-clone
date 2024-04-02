import { env } from "@/env";
import { getReadyServiceWOrker } from "@/utils/serviceWorker";

export async function getCurrentPushSubscription(): Promise<PushSubscription | null> {
  const sw = await getReadyServiceWOrker();

  return sw.pushManager.getSubscription();
}

export async function registerPushNotification() {
  if (!("PushManager" in window)) {
    throw Error("Push notifications not supported by browser!");
  }

  const existingSubscription = await getCurrentPushSubscription();

  if (existingSubscription) {
    throw Error("Existing push subscription found");
  }

  const sw = await getReadyServiceWOrker();

  const subscription = await sw.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
  });

  await sendPushSubscriptionToServer(subscription);
}

export async function unregisterPushNotifications() {
  const existingSubscription = await getCurrentPushSubscription();

  if (!existingSubscription) {
    throw Error("No existing notification push subscription found");
  }

  await deletePushSubscriptionFromServer(existingSubscription);

  await existingSubscription.unsubscribe();
}

export async function sendPushSubscriptionToServer(
  subscription: PushSubscription
) {
  console.log("Sending push notification to server", subscription);
}

export async function deletePushSubscriptionFromServer(
  subscription: PushSubscription
) {
  console.log("Deleting push subscription from server", subscription);
}
