import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CartPage from '../pages/Cartpage/CartPage';
import FoodPage from '../pages/Food/FoodPage';
import HomePage from '../pages/Homepage/Homepage';
import LoginPage from '../pages/Login/LoginPage';
import RegisterPage from '../pages/Register/RegisterPage';
import PaymentPage from '../pages/Payment/PaymentPage';
import CheckoutPage from '../pages/Checkout/CheckoutPage';
import AuthRoute from '../components/AuthRoute/AuthRoute';
import AdminRoute from '../components/AdminRoute/AdminRoute';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import OrderTrackPage from '../pages/OrderTrack/OrderTrackPage';
import Dashboard from '../pages/Dashboard/Dashboard';
import OrderPage from '../pages/Order/OrderPage';
import FoodsAdminPage from '../pages/FoodsAdmin/FoodsAdminPage';
import FoodEditPage from '../pages/FoodEdit/FoodEditPage';
import UsersPage from '../pages/UsersPage/UsersPage';
import UserEditPage from '../pages/UserEdit/UserEditPage';

export default function AppRoutes() {
  return (
    
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/search/:searchTerm" element={<HomePage/>}/>
      <Route path="/tag/:tag" element={<HomePage/>}/>
      <Route path="/food/:id" element={<FoodPage/>}/>
      <Route path="/cart" element={<CartPage/>}/>
      <Route path="/checkout" element={
        <AuthRoute>
      <CheckoutPage/>
      </AuthRoute>
      }/>
        <Route path="/payment" element={
        <AuthRoute>
      <PaymentPage/>
      </AuthRoute>
      }/>
      <Route
        path="/profile"
        element={
          <AuthRoute>
            <ProfilePage />
          </AuthRoute>
        }
      />
      <Route
        path="/track/:orderId"
        element={
          <AuthRoute>
            <OrderTrackPage />
          </AuthRoute>
        }
      />
      <Route
        path="/orders/:filter?"
        element={
          <AuthRoute>
            <OrderPage />
          </AuthRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <AuthRoute>
            <Dashboard />
          </AuthRoute>
        }
    />
        <Route
         path="/admin/foods/:searchTerm?"
         element={
           <AdminRoute>
             <FoodsAdminPage />
           </AdminRoute>
         }
       />
        <Route
         path="/admin/addFood"
         element={
           <AdminRoute>
             <FoodEditPage/>
           </AdminRoute>
         }
       />
             <Route
        path="/admin/editFood/:foodId"
        element={
          <AdminRoute>
            <FoodEditPage />
          </AdminRoute>
        }
      />
       <Route
         path="/admin/users/:searchTerm?"
         element={
           <AdminRoute>
             <UsersPage/>
           </AdminRoute>
         }
       />
        <Route
         path="/admin/editUser/:userId"
         element={
           <AdminRoute>
             <UserEditPage/>
           </AdminRoute>
         }
       />
       
      </Routes>  
        
  );
}
