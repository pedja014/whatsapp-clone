import { UserButton } from "@clerk/nextjs";
import { BellOff, BellRing, Moon, Sun, Users } from "lucide-react";
import { useTheme } from "../ThemeProvider";
import { set } from "zod";
import { dark } from "@clerk/themes";
import { useEffect, useState } from "react";
import {
  getCurrentPushSubscription,
  registerPushNotification,
  unregisterPushNotifications,
} from "@/notifications/pushService";
import { LoadingIndicator } from "stream-chat-react";
import DisappearingMessage from "@/components/DisappearingMessage";

interface MenuBarProps {
  onUserMenuCLick: () => void;
}

export default function MenuBar({ onUserMenuCLick }: MenuBarProps) {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex items-center  justify-between gap-3 border-e border-e-[#dbdde1] bg-white p-3 dark:border-e-gray-800 dark:bg-[#17191c]">
      <UserButton
        afterSignOutUrl="/"
        appearance={{ baseTheme: theme === "dark" ? dark : undefined }}
      />
      <div className="flex gap-6">
        <PushSubscriptionToggleButton />
        <span title="Show Users">
          <Users className="cursor-pointer" onClick={onUserMenuCLick} />
        </span>
        <ThemeToggleButton />
      </div>
    </div>
  );
}

function ThemeToggleButton() {
  const { setTheme, theme } = useTheme();

  if (theme === "dark") {
    return (
      <span title="Enable light theme">
        <Moon
          className="rotate-0 scale-100 cursor-pointer transition-all dark:-rotate-90 "
          onClick={() => setTheme("light")}
        />
      </span>
    );
  }

  return (
    <span title="Enable dark theme">
      <Sun
        className="rotate-90 cursor-pointer transition-all dark:rotate-0 dark:scale-100"
        onClick={() => setTheme("dark")}
      />
    </span>
  );
}

function PushSubscriptionToggleButton() {
  const [hasActivePushSubscription, setHasActivePushSubscription] =
    useState<boolean>();

  const [loading, setLoading] = useState(false);

  const [confirmationMessage, setConfirmationMessage] = useState<string>();

  useEffect(() => {
    async function getActivePushSubscription() {
      const subscription = await getCurrentPushSubscription();
      setHasActivePushSubscription(!!subscription);
    }

    getActivePushSubscription();
  }, []);

  async function setPushNotificationbsEnabled(enabled: boolean) {
    if (loading) return;

    setLoading(true);
    setConfirmationMessage(undefined);
    try {
      if (enabled) {
        // typo
        await registerPushNotification();
      } else {
        await unregisterPushNotifications();
      }
      setConfirmationMessage(
        "Push notifications " + (enabled ? "enabled" : "disabled")
      );
      setHasActivePushSubscription(enabled);
    } catch (error) {
      console.error(error);
      if (enabled && Notification.permission === "denied") {
        alert("Please enable push notifications in your browser settings");
      } else {
        alert("Something went wrong, please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  if (hasActivePushSubscription === undefined) return null;

  return (
    <div className="relative">
      {loading && (
        <span className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <LoadingIndicator />
        </span>
      )}
      {confirmationMessage && (
        <DisappearingMessage className="absolute left-1/2 top-8 z-10 -translate-x-1/2 rounded-lg bg-white px-2 py-1 shadow-md dark:bg-black">
          {confirmationMessage}
        </DisappearingMessage>
      )}
      {hasActivePushSubscription ? (
        <span title="Disable push notifications">
          <BellOff
            onClick={() => setPushNotificationbsEnabled(false)}
            className={`cursor-pointer ${loading ? "opacity-10" : ""}`}
          />
        </span>
      ) : (
        <span title="Enable push notifications">
          <BellRing
            onClick={() => setPushNotificationbsEnabled(true)}
            className={`cursor-pointer ${loading ? "opacity-10" : ""}`}
          />
        </span>
      )}
    </div>
  );
}
