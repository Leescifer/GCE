import LandingPage from "./pages/LandingPage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Authenticated from "./pages/Authenticated/indext";
import Dashboard from "./pages/Dashboard";
import ProductInventory from "./pages/ProductInventory";
import Category from "./pages/Category";
import Customer from "./pages/Customer";

export const routes = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/authenticated",
    element: <Authenticated />,
  },
  {
    path: "/dasboard",
    element: <Dashboard />,
  },
  {
    path: "/inventory",
    element: <ProductInventory />,
  },
  {
    path: "/category",
    element: <Category />,
  },
  {
    path: "/customer",
    element: <Customer />,
  },
];
