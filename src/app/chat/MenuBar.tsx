import { UserButton } from "@clerk/nextjs";
import { Users } from "lucide-react";

interface MenuBarProps {
  onUserMenuCLick: () => void;
}

export default function MenuBar({ onUserMenuCLick }: MenuBarProps) {
  return (
    <div className="flex items-center  justify-between gap-3 border-e border-e-[#DBDDE1] bg-white p-3">
      <UserButton afterSignOutUrl="/" />
      <div className="flex gap-6">
        <span title="Show Users">
          <Users className="cursor-pointer" onClick={onUserMenuCLick} />
        </span>
      </div>
    </div>
  );
}
