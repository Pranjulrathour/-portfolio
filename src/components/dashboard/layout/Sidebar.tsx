import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  LayoutDashboard,
  Calendar,
  Users,
  Settings,
  HelpCircle,
  FolderKanban,
} from "lucide-react";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  isActive?: boolean;
}

interface SidebarProps {
  items?: NavItem[];
  activeItem?: string;
  onItemClick?: (label: string) => void;
}

const defaultNavItems: NavItem[] = [
  { icon: <Home size={20} />, label: "Home", isActive: true },
  { icon: <LayoutDashboard size={20} />, label: "Dashboard" },
  { icon: <FolderKanban size={20} />, label: "Projects" },
  { icon: <Calendar size={20} />, label: "Calendar" },
  { icon: <Users size={20} />, label: "Team" },
];

const defaultBottomItems: NavItem[] = [
  { icon: <Settings size={20} />, label: "Settings" },
  { icon: <HelpCircle size={20} />, label: "Help" },
];

const Sidebar = ({
  items = defaultNavItems,
  activeItem = "Home",
  onItemClick = () => {},
}: SidebarProps) => {
  return (
    <div className="w-[280px] h-full bg-background border-r flex flex-col">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">Projects</h2>
        <p className="text-sm text-muted-foreground">
          Manage your projects and tasks
        </p>
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-2">
          {items.map((item) => (
            <Button
              key={item.label}
              variant={item.label === activeItem ? "secondary" : "ghost"}
              className="w-full justify-start gap-2"
              onClick={() => onItemClick(item.label)}
            >
              {item.icon}
              {item.label}
            </Button>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="space-y-2">
          <h3 className="text-sm font-medium px-4 py-2">Filters</h3>
          <Button variant="ghost" className="w-full justify-start gap-2">
            🟢 Active
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            🔴 High Priority
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            🟡 In Progress
          </Button>
        </div>
      </ScrollArea>

      <div className="p-4 mt-auto border-t">
        {defaultBottomItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className="w-full justify-start gap-2 mb-2"
            onClick={() => onItemClick(item.label)}
          >
            {item.icon}
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
