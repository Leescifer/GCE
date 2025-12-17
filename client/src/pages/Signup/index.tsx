import Logo from "../../assets/GCElogo.png";
import { User, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Side */}
      <div className="flex flex-col justify-center p-10 space-y-8">
        <div className="w-full max-w-sm mx-auto space-y-6">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={Logo} alt="Logo" className="w-12" />
            <h1 className="text-3xl font-bold text-[#990718]">GCE</h1>
          </div>

          {/* Title */}
          <div>
            <h2 className="text-2xl font-bold">Create an Account</h2>
            <p className="text-gray-600 text-sm">
              Fill in your details to get started
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Leester Q. Cruspero"
                  className="w-full border rounded-xl p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-red-700"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <User />
                </span>
              </div>
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium mb-1">Age</label>
              <input
                type="number"
                placeholder="20"
                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-700"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-700">
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <select className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-700">
                <option value="">Select role</option>
                <option value="Admin">Admin</option>
                <option value="Staff">Staff</option>
                <option value="User">User</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Test123!"
                  className="w-full border rounded-xl p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-red-700"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <Lock />
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#990718] text-white py-3 rounded-xl hover:bg-red-800 transition font-light"
            >
              Sign Up
            </button>
          </form>

          {/* Footer Link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?
            <Link
              to="/signin"
              className="text-red-700 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden md:flex flex-col justify-center items-center bg-[#FFC300] p-10 text-center space-y-6">
        <img src={Logo} alt="Brand" className="w-48" />
        <h1 className="text-2xl font-bold text-gray-900">
          Dry Goods. Fresh Promise
        </h1>
        <p className="w-full text-gray-800 text-sm">
          Supplying quality dry goods with a fresh promise of taste, trust, and
          everyday reliability.
        </p>
      </div>
    </section>
  );
};

export default Signup;
