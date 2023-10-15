import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import axios from "axios";
function Crud() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [crudData, setCrudData] = useState([]);
  const [editData, setEditData] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setUpdate(false);
  };
  const handleShow = () => setShow(true);
  const [update, setUpdate] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      axios
        .post("http://localhost:8080/add", {
          name: name,
          email: email,
          number: number,
        })
        .then((res) => {
          getData();
          setShow(false);
          setName("");
          setEmail("");
          setNumber("");
        });
    } catch (e) {
        console.log("error", e);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const edit = (item) => {
    setEditData(item);
    setUpdate(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    try {
      axios
        .put(`http://localhost:8080/update/${editData?._id}`, {
          name: editData?.name,
          email: editData?.email,
          number: editData?.number,
        })
        .then((res) => {
          getData();
          setUpdate(false);
        });
    } catch (e) {
        console.log("error", e);
    }
  };

  const handleDelete = (id) => {
    console.log(id);
    try {
      axios.delete(`http://localhost:8080/delete/${id}`, {}).then((res) => {
        getData();
      });
    } catch (e) {}
  };

  const getData = () => {
    axios.get("http://localhost:8080/getAll").then((res) => {
      setCrudData(res?.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="container mt-4">
      <h1 className="mb-4">C_R_U_D</h1>
      <Button variant="warning" onClick={handleShow}>
        Create
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Mobile number</Form.Label>
              <Form.Control
                type="number"
                value={number}
                placeholder="10 digit number"
                onChange={(e) => setNumber(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Table className="mt-5" responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {crudData?.map((item, index) => {
            return (
              <>
                {" "}
                <tr>
                  <td>{index + 1}</td>
                  <td>{item?.name}</td>
                  <td>{item?.email}</td>
                  <td>{item?.number}</td>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "5px",
                    }}
                  >
                    <Button
                      className="px-2"
                      variant="info"
                      onClick={() => edit(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(item?._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>{" "}
              </>
            );
          })}
        </tbody>
      </Table>

      <Modal show={update} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editData?.name}
                name="name"
                placeholder="name"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={editData?.email}
                name="email"
                placeholder="name@example.com"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Mobile number</Form.Label>
              <Form.Control
                type="number"
                name="number"
                value={editData?.number}
                placeholder="10 digit number"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Crud;
