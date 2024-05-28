import React, { useState, useEffect } from 'react';

export default function CartList() {
    const [carts, setCarts] = useState([]);

    useEffect(() => {
        fetchCarts();
    }, []);

    const fetchCarts = async () => {
        try {
            const response = await fetch("http://localhost:8080/Cart/pendingCart");
            if (!response.ok) {
                throw new Error('Failed to fetch Carts');
            }
            const data = await response.json();
            setCarts(data);
        } catch (error) {
            console.error('Error fetching Cart:', error);
            alert('Failed to fetch cart items');
        }
    };

    const handleDeleteCartItem = async (cart_id) => {
        try {
            const response = await fetch(`http://localhost:8080/Cart/deleteCart/${cart_id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete cart item');
            }
            fetchCarts(); // Fetch updated cart data
        } catch (error) {
            console.error('Error deleting cart item:', error);
            alert('Failed to delete cart item');
        }
    };

    const handleIncrementQuantity = (cart_id) => {
        setCarts(carts.map(cart => 
            cart.cart_id === cart_id ? { ...cart, quantity: cart.quantity + 1 } : cart
        ));
    };

    const handleDecrementQuantity = (cart_id) => {
        setCarts(carts.map(cart => 
            cart.cart_id === cart_id && cart.quantity > 1 ? { ...cart, quantity: cart.quantity - 1 } : cart
        ));
    };

    const handleCheckout = async () => {
        try {
            for (let cart of carts) {
                const order = {
                    prod_name: cart.prod_name,
                    quantity: cart.quantity,
                    total_price: cart.total_price * cart.quantity
                };

                const response = await fetch("http://localhost:8080/Order/addOrder", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(order)
                });

                if (!response.ok) {
                    throw new Error('Failed to create order');
                } 
            }

            const response = await fetch(`http://localhost:8080/Cart/checkout`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(carts.map(cart => ({ cart_id: cart.cart_id, status: 'approved' })))
            });

            if (!response.ok) {
                throw new Error('Failed to checkout');
            }

            setCarts([]);
            alert('Your order has been successfully placed. Thank you for shopping with us!');
        } catch (error) {
            console.error('Error checking out:', error);
            alert('Oops! Something went wrong while placing your order. Please try again later.');
        }
    };

    const calculateTotalPrice = () => {
        return carts.reduce((total, cart) => total + (cart.total_price * cart.quantity), 0).toFixed(2);
    };

    return (
        <div className="container">
            <style>{`
                .container {
                    display: flex;
                    justify-content: center;
                    padding: 20px;
                }

                .paper {
                    width: 80%;
                    padding: 20px;
                    background-color: #000;
                    color: #fff;
                    border-radius: 8px;
                }

                .title {
                    font-size: 24px;
                    text-align: center;
                    color: #007BFF;
                    margin-bottom: 20px;
                }

                .product-card {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px;
                    margin-bottom: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    background-color: #333;
                }

                .quantity-controls {
                    display: flex;
                    align-items: center;
                }

                .quantity-controls button {
                    background-color: #007BFF;
                    color: #fff;
                    border: none;
                    padding: 5px 10px;
                    cursor: pointer;
                    border-radius: 4px;
                    margin: 0 5px;
                }

                .quantity-controls span {
                    margin: 0 10px;
                }

                .delete-button {
                    background-color: #FF0000;
                    color: #fff;
                    border: none;
                    padding: 5px 10px;
                    cursor: pointer;
                    border-radius: 4px;
                }

                .total-price-card {
                    text-align: center;
                    padding: 10px;
                    background-color: #333;
                    margin-top: 20px;
                    border-radius: 5px;
                }

                .checkout-button {
                    display: block;
                    width: 100%;
                    padding: 10px;
                    background-color: #007BFF;
                    color: #fff;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-top: 20px;
                }
            `}</style>
            <div className="paper">
                <h2 className="title">Your Shopping Cart</h2>
                {carts.map((cart) => (
                    <div key={cart.cart_id} className="product-card">
                        <h3>{cart.prod_name}</h3>
                        <div className="quantity-controls">
                            <button onClick={() => handleDecrementQuantity(cart.cart_id)}>-</button>
                            <span>{cart.quantity}</span>
                            <button onClick={() => handleIncrementQuantity(cart.cart_id)}>+</button>
                        </div>
                        <span>${(cart.total_price * cart.quantity).toFixed(2)}</span>
                        <button className="delete-button" onClick={() => handleDeleteCartItem(cart.cart_id)}>Delete</button>
                    </div>
                ))}
                <div className="total-price-card">
                    <h3>Total Price: ${calculateTotalPrice()}</h3>
                </div>
                <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
            </div>
        </div>
    );
}
