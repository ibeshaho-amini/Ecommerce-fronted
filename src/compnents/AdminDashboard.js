import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const DashboardLayout = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <span className="navbar-brand">Food E-Commerce Dashboard</span>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button className="nav-link" onClick={() => navigate('/ProductList')}>
                <i className="bi bi-list-ul"></i>
                <span className="ms-2">Products</span>
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={() => navigate('/OrderList')}>
                <i className="bi bi-list-ul"></i>
                <span className="ms-2">Orders</span>
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={() => navigate('/product')}>
                <i className="bi bi-list-ul"></i>
                <span className="ms-2">Add Product</span>
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={() => navigate('/Category')}>
                <i className="bi bi-list-ul"></i>
                <span className="ms-2">Add Category</span>
              </button>
            </li>
          </ul>
          <button className="btn btn-light" onClick={() => navigate('/profile')}>
            <i className="bi bi-person-circle"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default DashboardLayout;
