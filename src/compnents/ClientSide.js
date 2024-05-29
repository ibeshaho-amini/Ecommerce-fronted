import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [error, setError] = useState("");
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:8080/Product/displayProduct");
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleAddToCart = (product) => {
        setSelectedProduct(product);
        setModalOpen(true);
        setQuantity(1);
        setTotalPrice(product.unit_price);
    };

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value);
        setQuantity(value);
        const total = value * selectedProduct.unit_price;
        setTotalPrice(total);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setQuantity(1);
        setTotalPrice(0);
    };

    const handleAddToCartModal = () => {
        if (!userId) {
            setError('User ID not found');
            return;
        }

        const newItem = { 
            prod_name: selectedProduct.prod_name,
            quantity: quantity,
            total_price: totalPrice,
            user_id: userId
        };

        fetch("http://localhost:8080/Cart/addCart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newItem)
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Failed to add product to cart');
            }
            return response.json();
        }).then((data) => {
            console.log("Product added to cart:", data);
            setModalOpen(false);
            
        }).catch(error => {
            console.error('Error adding product to cart:', error);
            setError('Product added to cart well. You can check your cart now.');
            // navigate('/UserDashboard');
        });
    };

    return (
        <div style={styles.root}>
            <div style={styles.container}>
                <div style={styles.paper}>
                    <h2 style={styles.title}>Explore Delicious Food</h2>
                    <div style={styles.grid}>
                        {products.map((product) => (
                            <div key={product.id} style={styles.cardContainer}>
                                <div 
                                    style={styles.card} 
                                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)'}
                                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'}
                                >
                                    <div
                                        style={{ ...styles.media, backgroundImage: `url(data:image/jpeg;base64,${product.image})` }}
                                        title={product.prod_name}
                                    />
                                    <div style={styles.cardContent}>
                                        <h3>{product.prod_name}</h3>
                                        <p>Price: ${product.unit_price}</p>
                                        <p>{product.description}</p>
                                        <button style={styles.button} onClick={() => handleAddToCart(product)}>Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {modalOpen && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <h2>{selectedProduct && selectedProduct.prod_name}</h2>
                        <p>Quantity: {quantity}</p>
                        <p>Total Price: ${totalPrice}</p>
                        <input
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            style={styles.input}
                        />
                        <button style={styles.modalButton} onClick={handleAddToCartModal}>Add To Cart</button>
                        {error && <p style={styles.error}>{error}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}

const styles = {
    root: {
        flexGrow: 1,
        paddingTop: '32px',
        paddingBottom: '32px',
    },
    container: {
        maxWidth: '1300px',
        margin: '0 auto',
        padding: '16px',
    },
    paper: {
        padding: '24px',
        backgroundColor: '#f8f8f8',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '24px',
    },
    grid: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
    },
    cardContainer: {
        width: '100%',
        maxWidth: '345px',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s ease',
        cursor: 'pointer',
        overflow: 'hidden',
    },
    media: {
        height: '200px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    cardContent: {
        padding: '16px',
    },
    button: {
        display: 'block',
        width: '100%',
        padding: '12px 0',
        marginTop: '16px',
        backgroundColor: '#f50057',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        textAlign: 'center',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: '1000',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '32px',
        borderRadius: '8px',
        width: '400px',
        textAlign: 'center',
    },
    input: {
        width: '100%',
        padding: '8px',
        margin: '16px 0',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    modalButton: {
        display: 'block',
        width: '100%',
        padding: '12px 0',
        marginTop: '16px',
        backgroundColor: '#f50057',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        textAlign: 'center',
    },
    error: {
        color: 'red',
        marginTop: '16px',
    },
};
