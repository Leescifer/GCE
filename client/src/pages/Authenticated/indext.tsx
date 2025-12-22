import React from "react";
import { NavLink } from "react-router-dom";
import { House, Box, LayoutGrid, User } from "lucide-react";

const Authenticated: React.FC = () => {
  const menu = [
    {
      title: "Dashboard",
      path: "/dashboard",
      visible: true,
      icon: <House size={20} />,
    },
    {
      title: "Product Inventory",
      path: "/inventory",
      visible: true,
      icon: <Box size={20} />,
    },
    {
      title: "Category",
      path: "/category",
      visible: true,
      icon: <LayoutGrid size={20} />,
    },
    {
      title: "Customer",
      path: "/customer",
      visible: true,
      icon: <User size={20} />,
    },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col">
        <div className="px-6 py-5 text-xl font-bold border-b border-slate-800">
          My App
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {menu
            .filter((item) => item.visible)
            .map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition
                   ${
                     isActive
                       ? "bg-slate-800 text-white"
                       : "text-slate-400 hover:bg-slate-800 hover:text-white"
                   }`
                }
              >
                {item.icon}
                <span>{item.title}</span>
              </NavLink>
            ))}
        </nav>

        <div className="px-6 py-4 border-t border-slate-800 text-sm text-slate-400">
          © 2025
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-slate-100 p-6 overflow-y-auto">
        {/* Your routed pages render here */}
      </main>
    </div>
  );
};

export default Authenticated;
