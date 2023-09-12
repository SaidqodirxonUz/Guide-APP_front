/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer/footer";

const UserInfo = () => {
  const [data, setData] = useState({});
  let { id } = useParams();
  let getdata = async () => {
    let data = await axios.get(`/users/${id}`);
    console.log(data);
    setData(data.data);
  };
  useEffect(() => {
    getdata();
  }, []);
  return (
    <div>
      <Sidebar />
      <Container style={{ maxWidth: "820px", padding: "3rem" }}>
        <h2
          style={{
            marginBottom: "35px",
          }}
        >
          User Info
        </h2>
        <Row>
          <Col md={12}>
            <h2>
              {data.data?.first_name} {data.data?.last_name}
            </h2>
            <p>{data.data?.username}</p>
          </Col>

          <Col md={3}>
            <h5>Age:</h5>
            <p>{data.data?.age}</p>
          </Col>

          <Col md={3}>
            <h5>Role:</h5>
            <p>{data.data?.role}</p>
          </Col>

          <Col md={3}>
            <h5>Guides:</h5>
            <p>{data.data?.total_guides}</p>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default UserInfo;
