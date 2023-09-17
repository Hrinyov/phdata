import React, { useState } from "react";
import Classes from "./LoginAndRegister.module.css";
import Login from "./Login/Login";

interface LogAndRegProps {
  onSetToken: (userToken: string | null) => void;
}

const LoginAndRegister: React.FC<LogAndRegProps> = ({ onSetToken }) => {
  const [loginIsShow, setLoginIsShow] = useState(false);
  const [registerIsShow, setRegisterIsShow] = useState(false);

  const closeLogin = () => {
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
      {loginIsShow && <Login onClose={closeLogin} onSetToken={onSetToken} />}
      {registerIsShow && <Login onClose={closeLogin} onSetToken={onSetToken} register={true} />}
    </>
  );
};

export default LoginAndRegister;
