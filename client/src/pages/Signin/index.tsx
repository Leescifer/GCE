/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../../hooks/useSignin';
import Logo from "../../assets/GCElogo.png";
import { User, Lock } from "lucide-react";

const Signin = () => {
  const navigate = useNavigate();
  const {login} = useAuth();

   const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(userName, password);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  }
  
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
            <h2 className="text-2xl font-bold">Log in to your Account</h2>
            <p className="text-gray-600 text-sm">Welcome back!</p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full border rounded-xl p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-red-700"
                  placeholder="Username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <User />
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full border rounded-xl p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-red-700"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <Lock />
                </span>
              </div>
              <div className="text-right mt-1">
                <Link to="/forgot-password" className="text-xs text-gray-600 hover:underline">
                  Forgot Password?
                </Link>
              </div>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-[#990718] text-white py-3 rounded-xl hover:bg-red-800 transition font-light"
            >
              Log in
            </button>
          </form>

          {/* Footer Link */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-red-700 font-medium hover:underline"
            >
              Create account
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

export default Signin;
