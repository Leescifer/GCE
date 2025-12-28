import { useState } from "react";

const Profile: React.FC = () => {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="ml-auto relative">
      <button
        onClick={() => setProfileOpen(!profileOpen)}
        className="flex items-center gap-2"
      >
        <img
          src="https://i.pravatar.cc/40"
          alt="Profile"
          className="w-10 h-10 rounded-full border"
        />
        <span className="hidden md:block font-medium">John Doe</span>
      </button>

      {/* Profile Dropdown */}
      {profileOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border z-50">
          <button className="block w-full px-4 py-2 text-sm hover:bg-slate-100 text-left">
            Profile
          </button>
          <button className="block w-full px-4 py-2 text-sm hover:bg-slate-100 text-left">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
