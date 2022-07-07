import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const Backdrop = ({ hideCartHandler }) => {
  return <div className="backdrop" onClick={hideCartHandler}></div>;
};

const ModalOverlay = ({ children }) => {
  return (
    <div className="modal">
      <div className="content">{children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

export default function Modal({ hideCartHandler }) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop hideCartHandler={hideCartHandler} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
}
