import Classes from "../components/UI/Modal/Modal.module.css";

//need to fix props to backdrop (function - props:boolean)
const Backdrop = (props:any) => {
  return <div className={Classes.backdrop} onClick={props.onClick}></div>;
};

export default Backdrop;