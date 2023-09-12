/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer/footer";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";

const EditGuide = () => {
  const [data, setData] = useState({});
  const [send, setSend] = useState({
    first_name: data.data?.first_name,
    last_name: data.data?.last_name,
    username: data.data?.username,
    age: data.data?.age,
  });
  let { id } = useParams();
  let navigate = useNavigate();
  let getdata = async () => {
    let { data } = await axios.get(`/guides/${id}`);

    setData(data);
  };
  useEffect(() => {
    getdata();
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let res = await axios.patch(`/guides/${id}`, send);

      if (res.status === 200) {
        toast("Edited successfully", { type: "success" });
        setData({});
        navigate(`/guide/${id}`);
      }
    } catch (error) {
      if (error.message === "Network Error") {
        toast("Problem with Internet", { type: "warning" });
      } else {
        toast("The information you entered is incorrect", { type: "error" });
      }
    }
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
      <Sidebar />
      <Container style={{ maxWidth: "820px", padding: "3rem" }}>
        <h2
          style={{
            marginBottom: "35px",
          }}
        >
          Edit Guide
        </h2>
        <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <Form.Group style={{ width: "100%" }} controlId="formName">
            <Form.Label>Title</Form.Label>
            <Form.Control
              style={{ width: "100%" }}
              type="title"
              name="title"
              defaultValue={data.data?.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group style={{ width: "100%" }} controlId="formlastName">
            <Form.Label>Content</Form.Label>
            <Form.Control
              style={{ width: "100%" }}
              type="content"
              name="content"
              defaultValue={data.data?.content}
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

export default EditGuide;
