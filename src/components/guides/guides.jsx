/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { GrAdd } from "react-icons/gr";
import { IoMdNotifications } from "react-icons/io";

const Guides = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  let navigate = useNavigate();
  let getdata = async () => {
    let url = query
      ? `/guides?q=${query}&page[offset]=${offset}&page[limit]=${limit}`
      : `/guides?page[offset]=${offset}&page[limit]=${limit}`;

    let { data } = await axios.get(url);
    //
    setTotal(data?.pageInfo?.total);

    setData(data.data);
  };
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    getdata();
  }, [query, limit, offset]);

  let hendleDelete = (p) => {
    let config = {
      method: "delete",
      url: `/guides/${p}`,
    };

    axios
      .request(config)
      .then((response) => {
        toast("Successfully deleted", { type: "info" });
      })
      .catch((error) => {
        toast("Error try again", { type: "error" });
      });
  };

  const userRole = localStorage.getItem("role");

  return (
    <Container
      style={{ maxWidth: "820px", marginBottom: "100px" }}
      className="mt-4"
    >
      <div className="d-flex" style={{ justifyContent: "space-between" }}>
        <h1>Guide Page</h1>
        {userRole === "admin" && (
          <Link
            className="btn btn-outline-primary text-light"
            style={{ alignItems: "center", alignSelf: "center" }}
            to={"/guide/add"}
          >
            <GrAdd style={{ color: "white" }} />
          </Link>
        )}

        <Link
          className="btn btn-outline-primary text-light"
          style={{ alignItems: "center", alignSelf: "center" }}
          to={"/notification"}
        >
          <IoMdNotifications style={{ color: "black" }} />
        </Link>
      </div>
      <input
        type="text"
        placeholder="search"
        name="search"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <select
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
      </select>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Content</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((guide, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{guide.title}</td>
              <td>{guide.content}</td>
              <td
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                <Button
                  variant="info"
                  onClick={() => {
                    navigate(`/guide/${guide._id}`);
                  }}
                >
                  <i className="bx bx-show-alt"></i>
                </Button>
                {userRole === "admin" && (
                  <Button
                    variant="primary"
                    onClick={() => {
                      navigate(`/guide/edit/${guide._id}`);
                    }}
                  >
                    <i className="bx bx-edit"></i>
                  </Button>
                )}
                {userRole === "admin" && (
                  <Button
                    variant="danger"
                    onClick={() => {
                      hendleDelete(guide._id);
                    }}
                  >
                    <i className="bx bx-trash"></i>
                  </Button>
                )}
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
    </Container>
  );
};

export default Guides;
