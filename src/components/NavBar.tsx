
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutGrid, Home, Lock, User, Settings, Bookmark, Calendar, Mail, Bell } from 'lucide-react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar } from 'antd';
import { Button } from "@/components/ui/button";

const AppGridItem = ({ icon, title, path, color = "#52bfcb" }) => {
  const navigate = useNavigate();
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant="ghost"
          size="lg"
          className="flex flex-col items-center justify-center h-24 gap-2 transition-all duration-200 hover:bg-secondary/50 rounded-xl"
          onClick={() => navigate(path)}
        >
          {React.cloneElement(icon, { size: 24, color: color })}
          <span className="text-sm font-medium">{title}</span>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-0">
        <div className="p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {React.cloneElement(icon, { size: 20, color: color })}
            <h4 className="text-sm font-medium">{title}</h4>
          </div>
          <p className="text-xs text-muted-foreground">
            Access the {title.toLowerCase()} application to manage your settings and preferences.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

const NavBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-3 backdrop-blur-md bg-white/60 border-b border-border">
      <div className="flex items-center gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-primary rounded-full p-2 hover:bg-secondary/50 flex items-center justify-center"
                  >
                    <LayoutGrid size={24} className="text-primary" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-[420px] p-4 bg-white" 
                  align="start"
                  sideOffset={10}
                >
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Applications</h3>
                    <p className="text-sm text-muted-foreground">
                      Quick access to all your applications
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <AppGridItem icon={<Home />} title="Home" path="/" />
                    <AppGridItem icon={<User />} title="Profile" path="/profile" />
                    <AppGridItem icon={<Lock />} title="Security" path="/password-recovery" />
                    <AppGridItem icon={<Settings />} title="Settings" path="/settings" />
                    <AppGridItem icon={<Bookmark />} title="Bookmarks" path="/bookmarks" />
                    <AppGridItem icon={<Calendar />} title="Calendar" path="/calendar" />
                    <AppGridItem icon={<Mail />} title="Messages" path="/messages" />
                    <AppGridItem icon={<Bell />} title="Notifications" path="/notifications" />
                  </div>
                </PopoverContent>
              </Popover>
            </TooltipTrigger>
            <TooltipContent>
              <p>Applications</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <span className="text-lg font-semibold bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
          AdminDash
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <Avatar 
          size="small" 
          icon={<User size={16} />} 
          style={{ backgroundColor: '#52bfcb' }} 
        />
      </div>
    </div>
  );
};

export default NavBar;
