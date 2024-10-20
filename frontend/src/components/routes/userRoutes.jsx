import React from "react"
import { Route } from "react-router-dom"
import Register from "../auth/Register.jsx";
import Login from '../auth/Login.jsx';
import Profile from "../user/Profile.jsx";
import UpdateProfile from "../user/UpdateProfile.jsx";
import ProtectedRoute from "../auth/ProtectedRoute.jsx";
import UploadAvatar from "../user/UploadAvatar.jsx";
import UpdatePassword from "../user/UpdatePassword.jsx";
import ForgotPassword from "../user/ForgotPassword.jsx"
import ResetPassword from "../auth/ResetPassword.jsx"
import Cart from "../cart/Cart.jsx";
import Shipping from "../cart/Shipping.jsx"
import ConfirmOrder from "../cart/ConfirmOrder.jsx";
import PaymentMethod from "../cart/PaymentMethod.jsx";
import MyOrders from "../order/MyOrders.jsx";
import OrderDetails from "../order/OrderDetails.jsx";
import Invoice from "../invoice/invoice.jsx";
import ProductDetails from "../layouts/product/productDetails.jsx";
import Home from "../layouts/home"

const userRoutes = () => {

    return (
        <>
        <Route path = "" element = {<Home />} />
                <Route path = "/product/:id" element = {<ProductDetails />} />
                <Route path = "/login" element = {<Login />} />
                <Route path = "/register" element = {<Register />} />
                <Route path = "/password/forgot" element = {<ForgotPassword />} />
                <Route path = "/api/v1/password/reset/:token" element = {<ResetPassword />} />
                <Route path = "/cart" element = {<Cart />} />
                <Route path = "/shipping" element = {
                <ProtectedRoute>
                  <Shipping />
                  </ProtectedRoute> 
                } />
                 <Route path = "/confirm_order" element = {
                <ProtectedRoute>
                  <ConfirmOrder />
                  </ProtectedRoute> 
                } />
                <Route path = "/me/profile" element = {
                <ProtectedRoute>
                <Profile />
                </ProtectedRoute>
                } />
                <Route path = "/me/update_profile" element = {
                <ProtectedRoute>
                <UpdateProfile />
                </ProtectedRoute>
                } />
                <Route path = "/me/upload_avatar" element = {
                <ProtectedRoute>
                <UploadAvatar />
                </ProtectedRoute>
                } />
                <Route path = "/me/update_password" element = {
                <ProtectedRoute>
                <UpdatePassword />
                </ProtectedRoute>
                } />
                <Route path = "/me/orders" element = {
                <ProtectedRoute>
                <MyOrders />
                </ProtectedRoute>
                } />
                <Route path = "/me/order/:id" element = {
                <ProtectedRoute>
                <OrderDetails />
                </ProtectedRoute>
                } />
                <Route path = "/invoice/order/:id" element = {
                <ProtectedRoute>
                <Invoice />
                </ProtectedRoute>
                } />
                <Route path = "/payment" element = {

                <PaymentMethod />

                } />
        </>
    )

}

export default userRoutes