import Classes from "../components/UI/Modal/Modal.module.css";

const ModalOverlay = (props: any) => {
  return (
    <div className={Classes.modal}>
      <div className={Classes.content}>{props.children}</div>
    </div>
  );
};

export default ModalOverlay;