import axios from "axios";
import { useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer/footer";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";

const CreateUser = () => {
  const [send, setSend] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    role: "employee",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      let res = await axios.post(`/users`, send);

      if (res.status === 201) {
        toast("Created successfully", { type: "success" });
        navigate(`/users`);
      }
    } catch (error) {
      if (error.message === "Network Error") {
        toast("Problem with Internet", { type: "warning" });
      } else {
        toast("The information you entered is incorrect", { type: "error" });
      }
    }
    setLoading(false);
  }

  function handleChange(e) {
    setSend((oldValues) => {
      return {
        ...oldValues,
        [e.target.name]: e.target.value,
      };
    });
  }

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
          Add User
        </h2>
        <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <Form.Group style={{ width: "100%" }} controlId="formName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              style={{ width: "100%" }}
              type="text"
              name="first_name"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group style={{ width: "100%" }} controlId="formlastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              style={{ width: "100%" }}
              type="text"
              name="last_name"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group style={{ width: "100%" }} controlId="formAge">
            <Form.Label>Age</Form.Label>
            <Form.Control
              style={{ width: "100%" }}
              type="number"
              name="age"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group style={{ width: "100%" }} controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              style={{ width: "100%" }}
              type="text"
              placeholder="username"
              name="username"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group style={{ width: "100%" }} controlId="formUsername">
            <Form.Label>Password</Form.Label>
            <Form.Control
              style={{ width: "100%" }}
              type="password"
              name="password"
              onChange={handleChange}
            />
          </Form.Group>
          <button
            style={{
              width: "50%",
              marginTop: "1rem",
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              backgroundColor: "rgb(48,142,254)",
              border: "none",
              borderRadius: "10px",
              fontWeight: "bold",
              fontSize: "14px",
              color: "#fff",
            }}
            type="submit"
          >
            Send
          </button>
        </Form>
      </Container>
      <Footer />
    </div>
  );
};

export default CreateUser;
