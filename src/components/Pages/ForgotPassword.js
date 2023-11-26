import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      let response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB_o7vD1dv2xerksf4mLLdbKjlKU8zRKQw",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            requestType: "PASSWORD_RESET",
          }),
        }
      );
      if (response.ok) {
        alert("A password reset link is sent to your registered email");
        navigate("/login", { replace: true });
      } else {
        response.json().then((data) => {
          //show an error modal
          alert(data.error.message);
        });
      }
    } catch {
      alert("Error while reseting password");
    }
  };
  return (
    <Container>
      <Row className="mt-5">
        <Col sm={6}>
          <img
            className={styles.img}
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            alt=""
          />
        </Col>
        <Col>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>
                Enter the email with which you have registered
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={emailHandler}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Send Link
            </Button>
            <br />
          </Form>
          <br />
          <p>
            Already a user? <Link to="/login">Login here </Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default ForgotPassword;
