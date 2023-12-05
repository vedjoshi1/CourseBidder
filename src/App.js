import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Profile from "./pages/Account/Profile"
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";

const Layout = () => {
  return (
    <div>
      <Header />
      <HeaderBottom />
      <Outlet />
    </div>
  );
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        {/* ==================== Header Navlink Start here =================== */}
        <Route index element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        {/* ==================== Header Navlink End here ===================== */}
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
    </Route>
  )
);

function App() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
