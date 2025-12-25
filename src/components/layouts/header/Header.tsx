import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { authService } from "@app/features/auth/services/authService";
import { Menu, ShoppingCart, Plus, FileText, User, LogOut, Settings, Users, List } from 'lucide-react';
import { Button } from '@app/components/ui/button';
import { ThemeToggle } from '@app/components/ui/theme-toggle';
import { cn } from '@app/lib/utils';

const navigationConfig = [
  {
    id: 'properties',
    label: 'Properties',
    icon: ShoppingCart,
    path: '/property-list',
    hasDropdown: true,
    items: [
      {
        label: 'Property List',
        icon: List,
        path: '/property-list',
        isButton: false,
      },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: FileText,
    path: '/reports',
    hasDropdown: false,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    path: '/settings',
    hasDropdown: true,
    items: [
      {
        label: 'User Management',
        icon: Users,
        path: '/user-list',
        isButton: false,
      },
      {
        label: 'Role Management',
        icon: User,
        path: '/settings/roles',
        isButton: false,
      },
      {
        label: 'Categories',
        icon: List,
        path: '/settings/categories',
        isButton: false,
      },
      {
        label: 'Form Builder',
        icon: FileText,
        path: '/settings/forms',
        isButton: false,
      },
      {
        label: 'Audit Logs',
        icon: List,
        path: '/settings/audit-logs',
        isButton: false,
      },
      {
        label: 'Security',
        icon: Settings,
        path: '/settings/security',
        isButton: false,
      },
    ],
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: User,
    path: '/my-profile',
    hasDropdown: false,
  },
];

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleDropdownOpen = (id: string) => setOpenDropdown(id);
  const handleDropdownClose = () => setOpenDropdown(null);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[1400] shadow-lg bg-brand-primary text-inverse">
        <div className="flex items-center px-4 min-h-16">
          <button 
            className="flex items-center gap-1 bg-transparent border-none text-inverse p-2 cursor-pointer rounded-md transition-colors hover:bg-white/10"
            aria-label="menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-grow font-bold tracking-wide text-xl ml-4">
            <Link to="/" className="no-underline transition-colors text-inverse">
              OLX Clone
            </Link>
          </div>

          <nav className="flex items-center gap-2">
            {navigationConfig.map((navItem) => {
              const Icon = navItem.icon;
              const isOpen = openDropdown === navItem.id;

              if (navItem.hasDropdown && navItem.items) {
                return (
                  <div
                    key={navItem.id}
                    className="relative"
                    onMouseEnter={() => handleDropdownOpen(navItem.id)}
                    onMouseLeave={handleDropdownClose}
                  >
                    <Link
                      to={navItem.path!}
                      className="flex items-center gap-1 bg-transparent border-none text-inverse px-4 py-2 cursor-pointer rounded-md transition-colors min-w-[120px] no-underline hover:bg-white/10"
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{navItem.label}</span>
                    </Link>
                    
                    <div
                      className={cn(
                        "absolute top-full pt-2 left-0 min-w-[200px]",
                        isOpen ? "block" : "hidden"
                      )}
                      onMouseEnter={() => handleDropdownOpen(navItem.id)}
                      onMouseLeave={handleDropdownClose}
                    >
                      <div className="shadow-lg rounded-md overflow-hidden bg-surface text-primary">
                      {navItem.items.map((item, index) => {
                        const ItemIcon = item.icon;
                        
                        if (item.isButton) {
                          return (
                            <button
                              key={index}
                              className="w-full flex items-center gap-2 px-4 py-2 cursor-pointer transition-colors text-left border-none bg-transparent text-primary hover:bg-surface-hover"
                              onClick={handleDropdownClose}
                            >
                              <ItemIcon className="w-5 h-5" />
                              <span>{item.label}</span>
                            </button>
                          );
                        }

                        return (
                          <Link
                            key={index}
                            to={item.path}
                            className="flex items-center gap-2 px-4 py-2 cursor-pointer transition-colors no-underline text-primary hover:bg-surface-hover"
                            onClick={handleDropdownClose}
                          >
                            <ItemIcon className="w-5 h-5" />
                            <span>{item.label}</span>
                          </Link>
                        );
                      })}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={navItem.id}
                  to={navItem.path!}
                  className="flex items-center gap-1 bg-transparent border-none text-inverse px-4 py-2 cursor-pointer rounded-md transition-colors no-underline hover:bg-white/10"
                >
                  <Icon className="w-5 h-5" />
                  <span>{navItem.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="h-8 w-px mx-4 bg-white/20" />

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {!authService.isAuthenticated() && (
              <>
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    className="border-inverse text-inverse bg-transparent hover:bg-white/10"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/auth/signup">
                  <Button 
                    className="bg-surface text-primary hover:opacity-90"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
            {authService.isAuthenticated() && (
              <Button
                className="flex items-center gap-2 bg-surface text-primary hover:opacity-90"
                onClick={() => {
                  authService.clearAuthData();
                  navigate('/login');
                }}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="h-16" />
    </>
  );
};

export default Header;
