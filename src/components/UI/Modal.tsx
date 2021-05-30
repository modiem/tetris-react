import { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Backdrop: React.FC<{ onClose: (event: React.MouseEvent) => void }> = (
  props
) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay: React.FC = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overLay") as HTMLElement;

const Modal: React.FC<{ onClose: (event: React.MouseEvent) => void }> = (
  props
) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
