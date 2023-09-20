import ReactDOM from "react-dom";
import Backdrop from "../../../layouts/Backdrop";
import ModalOverlay from "../../../layouts/ModalOverlay";



const portalElement = document.getElementById("overlays")!;

const Modal = (props:any) => {

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onClick} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;