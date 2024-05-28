//import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Router} from 'react-router-dom';
import Appbar from './compnents/Appbar';
import User from './compnents/User';
import Login from './compnents/Login';
import Category from './compnents/Category';
import Product from './compnents/Product';
import ProductList from './compnents/ProductList';
import ClientSide from './compnents/ClientSide';
import React, { useState} from 'react';
import CartList from './compnents/CartLIst';
import OrderList from './compnents/OrderList';
import AdminDashboard from './compnents/AdminDashboard';
import DashboardLayout from './compnents/AdminDashboard';
import UserDashboard from './compnents/UserDashboard';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='' element={<Appbar/>}/>
        <Route path='/Login' exact element={<Login/>} />
        <Route path='/User' element={<User/>} />
        <Route path='/Category' element={<Category/>} />
        <Route path='/Product' element={<Product/>} />
        <Route path='/ProductList' element={<ProductList/>} />
        <Route path='/ClientSIde' element={<ClientSide/>} />
        <Route path='/Cartlist' element={<CartList/>} />
        <Route path='/OrderList' element={<OrderList/>} />
        <Route path='/AdminDashboard' element={<AdminDashboard/>} />
        <Route path='/UserDashboard' element={<UserDashboard/>} />

        <Route path='/' element={<DashboardLayout/>} >
            <Route path="dashboard" element={<ProductList />} />
            <Route path="products" element={<ProductList />} />
            <Route path="orders" element={<OrderList />} />
            <Route path="logout" element={<Login />} />
            <Route path="product" element={<Product />} />
       </Route>
          
       <Route path="/" element={<UserDashboard />}>
          <Route path="Carts" element={<CartList />} />
          <Route path="cartss" element={<ClientSide />} />
          <Route path="logout" element={<Login />} />
        </Route>
      </Routes>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
