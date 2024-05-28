import React from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import dining from '../image/slaaa.png';

const Appbar = () => {
  return (
    <Container fluid className="px-0 bg-white text-dark">
      <Navbar bg="light" expand="md" className="mb-4 py-3"> {/* Increased padding top and bottom */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"> {/* Placed the menu on the left side */}
            <Nav.Link href="/Appbar" className="text-dark">Home</Nav.Link>
            <Nav.Link href="/User" className="text-dark">Sign Up</Nav.Link>
            <Nav.Link href="/Login" className="text-dark">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Brand href="#" style={{ marginRight: '1em', fontSize: '3em' }} className="text-dark font-weight-bold">FoodDay</Navbar.Brand> {/* Increased font size and added margin */}
      </Navbar>
      <br /><br /><br />
      <Row className="m-0 justify-content-center align-items-center">
        <Col xs={12} md={4} className="p-0">
          <img src={dining} alt="Dining" className="w-100" />
        </Col>
        <Col xs={12} md={4} className="p-0 d-flex justify-content-center align-items-center flex-column">
          <h1 className="text-center mb-4">Healthy food for busy people</h1>
          <p className="text-center">Imagine devouring delicious, healthy meals daily without so much as lifting a pot.</p>
          <button className="btn btn-warning">Now see how it works</button>
        </Col>
      </Row>
    </Container>
  );
}

export default Appbar;
