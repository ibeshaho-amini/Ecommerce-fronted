import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { BsPencilSquare, BsTrash } from 'react-icons/bs'; // Importing icons from React Icons

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

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

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowEditModal(true);
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:8080/Product/updateProduct/${editingProduct.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editingProduct),
            });
            if (!response.ok) {
                throw new Error('Failed to update product');
            }
            fetchProducts();
            setShowEditModal(false);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingProduct({ ...editingProduct, [name]: value });
    };

    const handleDelete = (product) => {
        setProductToDelete(product);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/Product/deleteProduct/${productToDelete.id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            fetchProducts();
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <Container>
            <h3 style={{ color: 'green', paddingBottom: '20px' }}>All Products</h3>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>ID</th>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>
                                <img
                                    src={`data:image/jpeg;base64, ${product.image}`}
                                    alt="Product"
                                    style={{ width: '200px', height: '150px' }}
                                />
                            </td>
                            <td>{product.id}</td>
                            <td>{product.prod_id}</td>
                            <td>{product.prod_name}</td>
                            <td>{product.category.name}</td>
                            <td>{product.quantity}</td>
                            <td>{product.unit_price}</td>
                            <td>{product.description}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleEdit(product)} style={{ marginRight: '10px' }}>
                                    <BsPencilSquare /> {/* Edit icon */}
                                </Button>
                                <Button variant="danger" onClick={() => handleDelete(product)}>
                                    <BsTrash /> {/* Delete icon */}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {editingProduct && (
                <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formProductName">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="prod_name"
                                    value={editingProduct.prod_name}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formCategory">
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="category"
                                    value={editingProduct.category.name}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formQuantity">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="quantity"
                                    value={editingProduct.quantity}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="unit_price"
                                    value={editingProduct.unit_price}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="description"
                                    value={editingProduct.description}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSave}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

            {productToDelete && (
                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Are you sure you want to delete the product "{productToDelete.prod_name}"?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={confirmDelete}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </Container>
    );
}
