import React, { Fragment } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

function Expenses(props) {
  const expenses=useSelector(state=>state.expense.expenses)
  const deleteExpense = async () => {
   
    const res = await fetch(
      `https://react-http-62209-default-rtdb.firebaseio.com/expense/${props.id}.json`,
      {
        method: "DELETE",
      }
    );
    props.fetchExpenses();
  };

  const editExpense = async () => {
    props.showExpenseForm();
    props.editIdHandler(props.id);
  };
  console.log(expenses);

  return (
    <Fragment>
      <Row>
        <Col>{props.description}</Col>
        <Col>{props.category}</Col>
        <Col>{props.date}</Col>
        <Col>Rs {props.price}</Col>
        <Col>
          <FontAwesomeIcon
            icon={faPenToSquare}
            style={{ color: "blue", marginRight: "2.5rem", cursor: "pointer" }}
            onClick={editExpense}
          />{" "}
          <FontAwesomeIcon
            icon={faTrash}
            style={{ color: "red", cursor: "pointer" }}
            onClick={deleteExpense}
          />{" "}
        </Col>
      </Row>
      <hr />
    </Fragment>
  );
}

export default Expenses;
