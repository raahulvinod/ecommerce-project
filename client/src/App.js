import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import OurStore from './pages/OurStore';
import Blog from './pages/Blog';
import CompareProduct from './pages/CompareProduct';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Forgotpassword from './pages/Forgotpassword';
import ResetPassword from './pages/ResetPassword';
import SingleBlog from './pages/SingleBlog';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { PrivateRoutes } from './routing/privateRoutes';
import { OpenRoutes } from './routing/openRoutes';
import Orders from './pages/Orders';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index path="/" element={<Home />}></Route>
            <Route path="contact" element={<Contact />} />
            <Route path="product" element={<OurStore />} />
            <Route path="/product/:id" element={<SingleProduct />} />
            <Route path="blogs" element={<Blog />} />
            <Route path="/blog/:id" element={<SingleBlog />} />
            <Route path="about" element={<About />} />
            <Route path="compare-product" element={<CompareProduct />} />
            <Route
              path="wishlist"
              element={
                <PrivateRoutes>
                  <Wishlist />
                </PrivateRoutes>
              }
            />
            <Route
              path="cart"
              element={
                <PrivateRoutes>
                  <Cart />
                </PrivateRoutes>
              }
            />
            <Route
              path="my-orders"
              element={
                <PrivateRoutes>
                  <Orders />
                </PrivateRoutes>
              }
            />
            <Route
              path="my-profile"
              element={
                <PrivateRoutes>
                  <Profile />
                </PrivateRoutes>
              }
            />
            <Route
              path="checkout"
              element={
                <PrivateRoutes>
                  <Checkout />
                </PrivateRoutes>
              }
            />
            <Route
              path="login"
              element={
                <OpenRoutes>
                  <Login />
                </OpenRoutes>
              }
            />
            <Route
              path="signup"
              element={
                <OpenRoutes>
                  <Signup />
                </OpenRoutes>
              }
            />
            <Route path="forgot-password" element={<Forgotpassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
            <Route path="Terms-conditions" element={<TermsAndConditions />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="refund-policy" element={<RefundPolicy />} />
            <Route path="Shipping-policy" element={<ShippingPolicy />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
