/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Pagination,
  Table,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer/footer";
import { Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const GuideInfo = () => {
  const [data, setData] = useState({});
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [limit, setLimit] = useState(3);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
  const [loading, setLoading] = useState(true);

  let { id } = useParams();
  let getdata = async () => {
    setLoading(true);
    let data = await axios.get(`/guides/${id}`);
    setData(data.data);
    setLoading(false);
  };
  let getUsers = async () => {
    setLoading(true);
    let url = query
      ? `/users?q=${query}&page[offset]=${offset}&page[limit]=${limit}`
      : `/users?page[offset]=${offset}&page[limit]=${limit}`;

    if (filter != "") {
      let { data } = await axios.get(url + `&filters[role]=${filter}`);

      setTotal(data?.pageInfo?.total);
      setUsers(data.data);
      setLoading(false);
      return;
    }

    let { data } = await axios.get(url);
    setTotal(data?.pageInfo?.total);
    setUsers(data?.data);
    setLoading(false);
  };
  useEffect(() => {
    getUsers();
  }, [query, limit, offset]);
  useEffect(() => {
    getdata();
  }, [id]);

  let guideId = data.data?._id;
  const sendGuide = () => {
    setLoading(true);

    let data = JSON.stringify({
      guide_id: guideId,
      user_ids: selectedUser,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/user-guides/bulk",
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        toast("Guide sended to users succesfully", { type: "success" });
        setShowModal(false);
      })
      .catch((error) => {
        toast("Something went wront try again", { type: "error" });
      });

    setLoading(false);
  };
  async function hendleSelect(_id) {
    setSelectedUser([...selectedUser, _id]);
  }

  let role = localStorage.getItem("role");
  return (
    <div>
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
          Guide Info
        </h2>
        <Row>
          <Col md={12}>
            <h3>{data.data?.title}</h3>
          </Col>
        </Row>

        <p>{data.data?.content}</p>

        <Row>
          <Col md={3}>
            <h5>Revisions:</h5>
            <p>{data.data?.revisions}</p>
          </Col>
        </Row>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Notify Users</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup size="lg" style={{ margin: "2rem 0" }}>
              <InputGroup.Text id="inputGroup-sizing-lg">
                Search
              </InputGroup.Text>
              <Form.Control
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
                type="text"
                placeholder="Type here"
                name="search"
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
              <Form.Select
                size="lg"
                name="limit"
                id="limit"
                onChange={(e) => {
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
                name="filter"
                id="filter"
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
              >
                <option value="" disabled selected>
                  Select role
                </option>
                <option value="">All</option>
                <option value="admin">admin</option>
                <option value="employee">employee</option>
              </Form.Select>
            </InputGroup>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Full Name</th>
                  <th>Username</th>
                  <th>Age</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {user.first_name} {user.last_name}
                    </td>
                    <td>{user.username}</td>
                    <td>{user.age}</td>
                    <td
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: "1rem",
                      }}
                    >
                      <Form.Check
                        reverse
                        name="group1"
                        type="checkbox"
                        id={`reverse-checkbox-1`}
                        onClick={() => hendleSelect(user._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination>
              <Pagination.Prev
                disabled={offset <= 0}
                onClick={() => {
                  setOffset(offset - limit);
                }}
              />

              <Pagination.Item>__</Pagination.Item>

              <Pagination.Next
                disabled={offset + limit >= total}
                onClick={() => {
                  setOffset(offset + limit);
                }}
              />
            </Pagination>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={sendGuide}>
              Send
            </Button>
          </Modal.Footer>
        </Modal>
        <Button
          hidden={role ? false : true}
          variant="primary"
          onClick={() => setShowModal(true)}
        >
          Notify Users
        </Button>
      </Container>
      <Footer />
    </div>
  );
};

export default GuideInfo;
