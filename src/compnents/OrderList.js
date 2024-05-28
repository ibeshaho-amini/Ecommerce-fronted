import React, { useState, useEffect } from 'react';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:8080/Order/displayOrder");
      if (!response.ok) {
        throw new Error('Failed to fetch Orders');
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching Orders:', error);
      alert('Failed to fetch orders');
    }
  };

  const handleUpdateOrderStatus = async (order_id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8080/Order/updateOrderStatus/${order_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update order status to ${newStatus}`);
      }

      // Update the local state to reflect the change
      setOrders(orders.map(order => 
        order.order_id === order_id ? { ...order, status: newStatus } : order
      ));

      alert(`Order status has been updated to ${newStatus}`);
    } catch (error) {
      console.error(`Error updating order status to ${newStatus}:`, error);
      alert(`Failed to update order status to ${newStatus}`);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Orders Made</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{order.prod_id}</td>
              <td>{order.quantity}</td>
              <td>${order.total_price}</td>
              <td>{order.status}</td>
              <td>
                {order.status === 'pending' && (
                  <>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => handleUpdateOrderStatus(order.order_id, 'approved')}
                    >
                      Proceed
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleUpdateOrderStatus(order.order_id, 'denied')}
                    >
                      Deny
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
