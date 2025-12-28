import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { House, Box, LayoutGrid, User, Menu, X } from "lucide-react";
import Logo from "../../assets/GCElogo.png";
import Profile from "../../components/profile";

const Authenticated: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menu = [
    { title: "Dashboard", path: "/dashboard", icon: <House size={20} /> },
    { title: "Product Inventory", path: "/inventory", icon: <Box size={20} /> },
    { title: "Category", path: "/category", icon: <LayoutGrid size={20} /> },
    { title: "Customer", path: "/customer", icon: <User size={20} /> },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-40 inset-y-0 left-0 w-64 bg-white flex flex-col transform transition-transform
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:static lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="h-20 px-6 bg-[#FFC300] flex items-center space-x-2 font-bold border-b border-slate-800">
          <img src={Logo} alt="Logo" className="w-10" />
          <h1 className="text-3xl font-semibold text-slate-700">GCE</h1>

          <button
            className="ml-auto lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
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
              {item.title}
            </NavLink>
          ))}
        </nav>

        <div className="px-6 py-4 border-t text-sm text-slate-400">© 2025</div>
      </aside>

      {/* Main Area */}
      <div className="flex flex-col flex-1">
        {/* Top Bar */}
        <nav className="h-20 bg-[#FFC300] border-b border-slate-800 flex items-center px-6">
          {/* Left side */}
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu />
            </button>
          </div>

          {/* Right side (Profile) */}
          <Profile />
        </nav>

        {/* Content */}
        <main className="flex-1 bg-slate-100 p-6 overflow-y-auto">
          {/* Routed pages */}
        </main>
      </div>
    </div>
  );
};

export default Authenticated;
