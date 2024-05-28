import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { FaBars, FaUserCircle, FaShoppingCart, FaTachometerAlt, FaListAlt, FaSignOutAlt } from 'react-icons/fa';

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.root}>
      <div style={styles.drawer}>
        <div style={styles.toolbar} />
        <div style={styles.divider} />
        <ul style={styles.list}>
          <li style={styles.listItem} onClick={() => navigate('/dashboard')}>
            <FaTachometerAlt style={styles.icon} />
            <span>Dashboard</span>
          </li>
          <li style={styles.listItem} onClick={() => navigate('/cartss')}>
            <FaListAlt style={styles.icon} />
            <span>Add To Cart</span>
          </li>
          <li style={styles.listItem} onClick={() => navigate('/logout')}>
            <FaSignOutAlt style={styles.icon} />
            <span>Log Out</span>
          </li>
        </ul>
      </div>
      <div>
        <div style={styles.appBar}>
          <div style={styles.toolbar}>
            <FaBars style={styles.menuIcon} />
            <span style={styles.title}>Food E-Commerce Dashboard</span>
            <div>
              <FaUserCircle style={styles.iconButton} onClick={() => navigate('/profile')} />
              <FaShoppingCart style={styles.iconButton} onClick={() => navigate('/Carts')} />
            </div>
          </div>
        </div>
        <main style={styles.content}>
          <div style={styles.toolbarSpacer} />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const styles = {
  root: {
    display: 'flex',
  },
  appBar: {
    position: 'fixed',
    width: '100%',
    backgroundColor: '#3f51b5',
    zIndex: 1100,
  },
  drawer: {
    width: 240,
    flexShrink: 0,
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: '#ffffff',
    borderRight: '1px solid #ddd',
  },
  drawerPaper: {
    width: 240,
  },
  content: {
    flexGrow: 1,
    padding: '16px',
    marginLeft: 240,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px',
    height: '64px',
    backgroundColor: '#3f51b5',
    color: '#ffffff',
  },
  toolbarSpacer: {
    height: '64px',
  },
  divider: {
    height: '1px',
    backgroundColor: '#ddd',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
    cursor: 'pointer',
  },
  icon: {
    marginRight: '16px',
  },
  iconButton: {
    color: '#ffffff',
    cursor: 'pointer',
    marginLeft: '16px',
    fontSize: '24px',
  },
  title: {
    flexGrow: 1,
  },
  menuIcon: {
    color: '#ffffff',
    cursor: 'pointer',
    fontSize: '24px',
  },
};

export default UserDashboard;
