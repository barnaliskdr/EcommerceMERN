import React from 'react';
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
    const currentYear = new Date().getFullYear();

  return (
    <footer className="footer mt-auto py-3" style={{backgroundColor:"pink"}}>
      <Container>
        <Row>
            <Col>
             <div>
                ShopMarket &copy; {currentYear}
             </div>
            </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
