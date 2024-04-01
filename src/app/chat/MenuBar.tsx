import { UserButton } from "@clerk/nextjs";
import { Moon, Sun, Users } from "lucide-react";
import { useTheme } from "../ThemeProvider";
import { set } from "zod";
import { dark } from "@clerk/themes";

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
        <Moon className="cursor-pointer" onClick={() => setTheme("light")} />
      </span>
    );
  }

  return (
    <span title="Enable dark theme">
      <Sun className="cursor-pointer" onClick={() => setTheme("dark")} />
    </span>
  );
}
