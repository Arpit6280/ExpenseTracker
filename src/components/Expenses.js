import React from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Expenses(props) {
  return (
    <Row>
        <Col>{props.description}</Col>
        <Col>{props.category}</Col>
        <Col>{props.date}</Col>
        <Col>Rs {props.price}</Col>
    </Row>
  )
}

export default Expenses