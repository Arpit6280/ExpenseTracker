import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./Profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthContext from "../../store/auth-context";
// import { faInstag} from '@fortawesome/free-solid-svg-icons'

function Profile() {
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const authCtx = useContext(AuthContext);

  const setNameHandler = (e) => {
    setName(e.target.value);
  };
  const setPhotoHandler = (e) => {
    setPhotoUrl(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    let user = {
      idToken: authCtx.token,
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

  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyB_o7vD1dv2xerksf4mLLdbKjlKU8zRKQw",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {console.log(data)
       let user= data.users[0]
       console.log(user);
       setName(user.email)
       setPhotoUrl(user.photoUrl)
    })
      .catch((er) => {
        alert("Error", er);
      });
  });

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
        {/* <FontAwesomeIcon icon="fa-brands fa-github" />
        <FontAwesomeIcon icon={faGithub} /> */}
      </Form>
    </>
  );
}

export default Profile;
