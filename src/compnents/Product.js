import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

export default function Product() {
  const [productName, setProductName] = useState('');
  const [unit_price, setUnitPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null);
  const [categorydata, setCategoryData] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8080/category/display_category");
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategoryData(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('pname', productName);
    formData.append('price', unit_price);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('prod_id', productId);
    formData.append('quantity', quantity);
    formData.append('file', image);

    fetch("http://localhost:8080/Product/addproduct", {
      method: "POST",
      body: formData,
    }).then(() => {
      console.log("New Product added");
    }).catch(error => {
      console.error('Error adding product:', error);
    });
  };

  return (
    <Container>
      <h4 className="text-primary text-center mt-4">Add Product</h4>
      <Form className="mt-4" encType='multipart/form-data'>
        <Form.Group className="mb-3" controlId="productName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            size="sm"
            className="col-md-6" // Set input to 6 columns on medium screens and larger
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="unitPrice">
          <Form.Label>Unit Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter unit price"
            value={unit_price}
            onChange={(e) => setUnitPrice(e.target.value)}
            size="sm"
            className="col-md-6" // Set input to 6 columns on medium screens and larger
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Select value={category} onChange={(e) => setCategory(e.target.value)} size="sm" className="col-md-6"> {/* Set select to 6 columns on medium screens and larger */}
            {categorydata.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            size="sm"
            className="col-md-6" // Set textarea to 6 columns on medium screens and larger
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="productId">
          <Form.Label>Product ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            size="sm"
            className="col-md-6" // Set input to 6 columns on medium screens and larger
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            size="sm"
            className="col-md-6" // Set input to 6 columns on medium screens and larger
          />
        </Form.Group>
        {/* Input for file upload */}
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Product Image</Form.Label>
          <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} size="sm" className="col-md-6" /> {/* Set input to 6 columns on medium screens and larger */}
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSave} size="sm" className="col-md-6"> {/* Set button to 6 columns on medium screens and larger */}
          Save
        </Button>
      </Form>
    </Container>
  );
}
