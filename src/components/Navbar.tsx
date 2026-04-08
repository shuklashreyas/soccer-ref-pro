import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Upload, History } from "lucide-react";
import { cn } from "@/lib/utils";
import refaraLogo from "@/assets/refara-logo.png";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/upload", label: "Upload", icon: Upload },
  { to: "/history", label: "History", icon: History },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={refaraLogo} alt="Refara" width={36} height={36} className="rounded-lg" />
          <span className="font-display text-lg font-bold tracking-wider text-foreground">
            REFA<span className="text-primary">RA</span>
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
