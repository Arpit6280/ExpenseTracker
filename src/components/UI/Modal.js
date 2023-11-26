import React, { Fragment } from "react";
import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
const Backdrop = (props) => {
  return <div className={styles.backdrop}></div>;
};

const ModalOverlays = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

function Modal(props) {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop cartCloseHandler={props.cartCloseHandler} />,
        document.getElementById("overlays")
      )}
      {ReactDOM.createPortal(
        <ModalOverlays> {props.children} </ModalOverlays>,
        document.getElementById("overlays")
      )}
    </Fragment>
  );
}

export default Modal;
