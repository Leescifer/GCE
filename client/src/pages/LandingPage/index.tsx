import Logo from "../../assets/GCElogo.png";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface FeatureProps {
  title: string;
  description: string;
}

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={Logo} alt="GCE Logo" className="w-10" />
            <span className="text-xl font-bold text-[#990718]">GCE</span>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/signin"
              className="text-sm font-medium text-gray-700 hover:text-[#990718]"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-[#990718] text-white px-5 py-2 rounded-xl text-sm hover:bg-red-800 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Home Section */}
      <section className="bg-[#990718] text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            Dry Goods. Fresh Promise
          </h1>
          <p className="max-w-xl mx-auto text-gray-100">
            Supplying quality dry goods with a fresh promise of taste, trust,
            and everyday reliability.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-[#FFC300] text-gray-900 px-8 py-3 rounded-2xl font-semibold hover:opacity-90 transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose GCE?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Feature
              title="Quality Products"
              description="We ensure only top-quality dry goods reach your business."
            />
            <Feature
              title="Trusted Supply"
              description="Reliable sourcing and consistent stock availability."
            />
            <Feature
              title="Affordable Pricing"
              description="Competitive prices designed to help your business grow."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10 mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <img src={Logo} alt="GCE Logo" className="w-10" />
            <span className="font-semibold text-white">GCE</span>
          </div>
          <p className="text-sm">
            © {new Date().getFullYear()} GCE. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

const Feature: React.FC<FeatureProps> = ({ title, description }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-8 text-center space-y-4">
      <CheckCircle className="mx-auto text-[#990718]" size={32} />
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default LandingPage;
