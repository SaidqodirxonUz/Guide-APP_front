import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer>
      <div
        style={{
          position: "fixed",
          bottom: "0",
          right: "0",
          height: "50px",
          width: "100vw",
          zIndex: "10",
          backgroundColor: "rgb(48,142,254)",
          paddingTop: "10px",
        }}
      >
        <Row>
          <Col className="text-center align-middle">
            <p className="align-middle">
              <img
                src="/logo.jpg"
                alt=""
                style={{ width: "2rem", borderRadius: "50%" }}
              />
              <a
                href="https://saidqodirxon.uz"
                className="text-light mx-3 fs-5"
                style={{ textDecoration: "none" }}
              >
                Saidqodirxon Rahimov
              </a>
            </p>
          </Col>
        </Row>
      </div>
    </footer>
  );
};

export default Footer;
