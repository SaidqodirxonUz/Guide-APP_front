import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer/footer";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";

const EditMe = () => {
  const [data, setData] = useState({});
  const [send, setSend] = useState({
    first_name: data.data?.first_name,
    last_name: data.data?.last_name,
    username: data.data?.username,
    age: data.data?.age,
  });
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  let getdata = async () => {
    setLoading(true);
    let data = await axios.get(`/users/me`);
    console.log(data);
    setData(data.data);
    setLoading(false);
  };
  useEffect(() => {
    getdata();
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(data.data);
      let res = await axios.patch(`/users/me`, send);

      if (res.status === 200) {
        toast("Edited successfully", { type: "success" });
        setData({});
        navigate(`/`);
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
          Edit Profile
        </h2>
        <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <Form.Group style={{ width: "100%" }} controlId="formName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              style={{ width: "100%" }}
              type="first_name"
              name="first_name"
              defaultValue={data.data?.first_name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group style={{ width: "100%" }} controlId="formlastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              style={{ width: "100%" }}
              type="last_name"
              name="last_name"
              defaultValue={data.data?.last_name}
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
              defaultValue={data.data?.username}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group style={{ width: "100%" }} controlId="formAge">
            <Form.Label>Age</Form.Label>
            <Form.Control
              style={{ width: "100%" }}
              type="number"
              name="age"
              defaultValue={data.data?.age}
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

export default EditMe;
