import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";

function Registration() {
  const [email, setEmail] = useState("");
  const [emailValidate, setEmailValidate] = useState(false);
  const [password, setPassword] = useState("");
  const [pswdValidate, setPswdValidate] = useState(false);
  const [confirmPswd, setConfirmPswd] = useState("");
  const [confirmPswdValidate, setConfirmPswdValidate] = useState(false);

  const emailHandler = (e) => {
    setEmailValidate(false);
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPswdValidate(false);
    setPassword(e.target.value);
  };
  const confirmPassWordHandler = (e) => {
    setConfirmPswdValidate(false);
    setConfirmPswd(e.target.value);
  };
  const submitHandler = async (e) => {
    console.log("kk");
    e.preventDefault();
    if (email.includes("@") === false) {
      setEmailValidate(true);
      return;
    } else if (password.length < 6) {
      setPswdValidate(true);
      return;
    } else if (password !== confirmPswd) {
      setConfirmPswdValidate(true);
      return;
    }
    let user = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    try {
      let response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB_o7vD1dv2xerksf4mLLdbKjlKU8zRKQw",
        {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log("User Sign Up succesfully");
        setEmail("");
        setConfirmPswd("");
        setPassword("");
      } else {
        response.json().then((data) => {
          //show an error modal
          alert(data.error.message);
        });
      }
    } catch {
      alert("Error while sign Up ");
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
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={emailHandler}
              />
              {emailValidate && (
                <p className={styles.error}>Email must contain @</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={passwordHandler}
              />
              {pswdValidate && (
                <p className={styles.error}>
                  Password should be atleast 6 character long
                </p>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPswd}
                onChange={confirmPassWordHandler}
              />
              {confirmPswdValidate && (
                <p className={styles.error}>
                  {" "}
                  Password and confirm password should be same{" "}
                </p>
              )}
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>

          <p>
            Have an account? <Link to="/login">Login here </Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Registration;
