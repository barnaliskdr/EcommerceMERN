import React from 'react';
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
    const currentYear = new Date().getFullYear();

  return (
    <div class="position-relative">
    <footer className="footer bottom-0 mt-auto py-3" style={{backgroundColor:"pink"}}>
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
    </div>
  )
}

export default Footer;
