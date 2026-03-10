import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./screens/Home";
import MyOrder from "./screens/MyOrder";
import Signup from "./screens/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import Cart from "./components/Cart";
import { CartProvider } from "./components/ContextReducer";
import Login from "./screens/Login";
import Admin from "./Admin/Admin";
import Adminorders from "./Admin/Adminorders";
import Privateroutes from "./Privateroutes";
import { Provider } from "react-redux";
import appStore from "./utils/store";
import { Menumanage } from "./Admin/Menumanage";
import Menu from "./Admin/Menu";
import Picsupload from "./components/Picsupload";
import Userinfo from "./components/UserInfo";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          <CartProvider>
            <Routes>
              <Route path="/user" element={<Userinfo />} />
              <Route path="/" element={<Home />} />
              <Route path="/myorder" element={<MyOrder />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/pics" element={<Picsupload />} />
              <Route path="/admin" element={<Admin />} />

              <Route element={<Privateroutes />}>
                <Route path="/admin/user" element={<Admin />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/order" element={<Adminorders />} />
                <Route path="/addmenu" element={<Menumanage />} />
              </Route>
            </Routes>
          </CartProvider>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
