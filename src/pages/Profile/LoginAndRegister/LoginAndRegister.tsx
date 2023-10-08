import { FC, useState } from "react";
import Classes from "./LoginAndRegister.module.css";
import Login from "./Login/Login";

const LoginAndRegister: FC = () => {
  const [loginIsShow, setLoginIsShow] = useState(false);
  const [registerIsShow, setRegisterIsShow] = useState(false);

  const closeForm = () => {
    setLoginIsShow(false);
    setRegisterIsShow(false);
  };

  return (
    <>
      <div className={Classes.wrapper}>
        <div className={Classes.card}>
          <h3>Please login</h3>
          <button
            onClick={() => {
              setLoginIsShow(true);
            }}
          >
            Login
          </button>
        </div>
        <span>or</span>
        <div className={Classes.card}>
          <h3>Create account</h3>
          <button
            onClick={() => {
              setRegisterIsShow(true);
            }}
          >
            Register
          </button>
        </div>
      </div>
      {loginIsShow && <Login onClose={closeForm} />}
      {registerIsShow && <Login onClose={closeForm} isRegister={true} />}
    </>
  );
};

export default LoginAndRegister;
