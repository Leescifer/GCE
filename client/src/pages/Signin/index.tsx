import Logo from "../../assets/GCElogo.png";

const Signin = () => {
  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center p-10">
        <div className="w-full max-w-sm space-y-6">

          <div className="">
                <img src={Logo} alt="Logo" className="w-32 mx-auto" />

          <h2 className="text-2xl font-semibold text-center">
            Login to your Account
          </h2>

          </div>
      

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Sign in
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a className="text-blue-600 hover:underline" href="#">
              Sign up
            </a>
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden md:flex flex-col justify-center items-center bg-[#FFC300] p-10 text-center space-y-4">
        <img src={Logo} alt="Logo" className="w-40" />
        <h1 className="text-3xl font-bold">Dry Goods, Fresh Promise</h1>
        <p className="max-w-sm text-gray-700 text-lg">
          Supplying quality dry goods with a fresh promise of taste, trust, and
          everyday reliability.
        </p>
      </div>
    </section>
  );
};

export default Signin;
