/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const getdata = async () => {
    try {
      let token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
      } else {
        const response = await axios.get("/users/me", {
          headers: {
            Authorization: `${token}`,
          },
        });

        if (response.data.data.role == "admin") {
          localStorage.setItem("role", response.data.data.role);
        }

        setData(response.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <Container style={{ maxWidth: "820px", padding: "3rem" }}>
      <div className="d-flex" style={{ justifyContent: "space-between" }}>
        <h2
          style={{
            marginBottom: "35px",
          }}
        >
          My Profile
        </h2>

        <Link to={"/users/me"}>
          <i className="bx bx-edit fs-2"></i>
        </Link>
      </div>

      <Row>
        <Col md={12}>
          <h2>
            {data.first_name} {data.last_name}
          </h2>
          <p>{data.name}</p>
        </Col>

        <Col md={2}>
          <h5>Age:</h5>
          <p>{data.age}</p>
        </Col>

        <Col md={2}>
          <h5>Role:</h5>
          <p>{data.role}</p>
        </Col>

        <Col md={2}>
          <h5>Total:</h5>
          <p>{data.total_guides || 0}</p>
        </Col>

        <Col md={2}>
          <h5>Not read:</h5>
          <p>{data.todo_guides || 0}</p>
        </Col>
        <Col md={2}>
          <h5>Read:</h5>
          <p>{data.read_guides || 0}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
