import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./Profile.module.css";
// import AuthContext from "../../store/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useSelector } from "react-redux";


function Profile() {
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const token=useSelector(state=>state.auth.token)
  // const authCtx = useContext(AuthContext);

  const setNameHandler = (e) => {
    setName(e.target.value);
  };
  const setPhotoHandler = (e) => {
    setPhotoUrl(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    let user = {
      idToken: token,
      displayName: name,
      photoUrl: photoUrl,
      returnSecureToken: true,
    };
    try {
      let response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB_o7vD1dv2xerksf4mLLdbKjlKU8zRKQw",
        {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        let data = await response.json();
        console.log(data);
      } else {
        response.json().then((data) => {
          //show an error modal
          alert(data.error.message);
        });
      }
    } catch {
      alert("Error while updating Profile");
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <p>Winner never quite, Quitters never win</p>
          </Col>
          <Col>
            <p className={styles.right}>Your Profile is 64% complted.</p>
          </Col>
        </Row>
      </Container>
      <Form className={styles.form} onSubmit={submitHandler}>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label className="fw-bold">Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={name}
              onChange={setNameHandler}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label className="fw-bold">Profile Url</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={photoUrl}
              onChange={setPhotoHandler}
            />
          </Form.Group>
        </Row>

        <Button variant="danger" type="submit">
          Submit
        </Button>
        <FontAwesomeIcon icon={faGithub} />
      </Form>
    </>
  );
}

export default Profile;
