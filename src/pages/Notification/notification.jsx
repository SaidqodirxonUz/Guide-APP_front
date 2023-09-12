import axios from "axios";
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  Pagination,
  Form,
  Spinner,
} from "react-bootstrap";
import Sidebar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer/footer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Notification = () => {
  const [data, setData] = useState([]);
  const [read, setRead] = useState("");
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [filter, setFilter] = useState(false);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  let getdata = async () => {
    setLoading(true);
    let url = `/user-guides?page[offset]=${offset}&page[limit]=${limit}&filters[completed]=${filter}`;
    console.log(filter);
    // if (filter) {
    //   url += `&filters[completed]=${filter}`;
    // }
    let { data } = await axios.get(url);
    // console.log(data?.pageInfo?.total, "total");
    setTotal(data?.pageInfo?.total);
    console.log(data, "in use");
    setData(data.data);
    setLoading(false);
  };
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    getdata();
  }, [filter, limit, offset, read]);
  // let getdata = async () => {
  //   let { data } = await axios.get(`/user-guides`);
  //   console.log(data, "aaaaaaa");
  //   setData(data.data);
  // };
  // useEffect(() => {
  //   getdata();
  // }, [read]);

  async function hendleRead(id) {
    try {
      setLoading(true);

      let config = {
        method: "post",
        url: `/user-guides/${id}/read`,
      };

      let { data } = await axios(config);

      console.log(data, "read");
      setRead(data.data._id);
      toast("Successfully completed", { type: "success" });
      setLoading(false);
    } catch (error) {
      toast("Not completed", { type: "error" });
    }
  }

  return (
    <>
      <div
        hidden={!loading}
        style={{
          width: "100%",
          height: "100vh",
          zIndex: "1",
          backgroundColor: "rgba(134, 105, 105, 0.2)",
          position: "fixed",
          top: "0",
          left: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
      <Sidebar />
      <Container style={{ maxWidth: "820px", padding: "3rem" }}>
        <h2
          style={{
            marginBottom: "35px",
          }}
        >
          Notification
        </h2>
        <InputGroup size="lg" style={{ margin: "2rem 0" }}>
          <Form.Select
            size="lg"
            name="limit"
            id="limit"
            onChange={(e) => {
              console.log(e.target.value, "val");
              setLimit(e.target.value);
            }}
          >
            <option value="" disabled selected>
              Select limit
            </option>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </Form.Select>
          <Form.Select
            size="lg"
            name="filters"
            id="filters"
            onChange={(e) => {
              console.log(e.target.value, "f");
              setFilter(e.target.value);
              setOffset(0);
            }}
          >
            <option selected value={false}>
              Incompleted
            </option>
            <option value={true}>Completed</option>
          </Form.Select>
        </InputGroup>
        {data.map((n) => {
          return (
            <article key={n._id}>
              <Row>
                <Col md={12}>
                  <h3>{n?.guide.title}</h3>
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <h5>Status:</h5>
                  <p>{n.completed === false ? "unread" : "read"}</p>
                </Col>
              </Row>

              <p>{n.guide?.content}</p>

              <Button
                style={{ margin: "1rem 0" }}
                variant="primary"
                onClick={() => {
                  hendleRead(n._id);
                }}
              >
                Read
              </Button>
            </article>
          );
        })}
        <Pagination>
          <Pagination.Prev
            disabled={offset <= 0}
            onClick={() => {
              console.log(total);
              setOffset(offset - limit);
            }}
          />

          <Pagination.Item>__</Pagination.Item>

          <Pagination.Next
            disabled={offset + limit >= total}
            onClick={() => {
              console.log(total);
              setOffset(offset + limit);
            }}
          />
        </Pagination>
      </Container>
      <Footer />
    </>
  );
};

export default Notification;
