import { FC, useState } from "react";
import Modal from "../../../../components/UI/Modal/Modal";
import useInput from "../../../../hooks/useInput";
import Classes from "./Login.module.css";
import { useSetRecoilState } from "recoil";
import { tokenState } from "../../../../state/atoms/AppState";
import { loginUser, registerUser } from "../../../../lib/axios/axiosAuth";

interface LoginProps {
  onClose: () => void;
  isRegister?: boolean;
}

const Login: FC<LoginProps> = ({ onClose, isRegister = false }) => {
  const setToken = useSetRecoilState(tokenState);
  const [toRegister, setToRegister] = useState(isRegister);
  const [statusMessage, setStatusMessage] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const {
    value: usernameValue,
    isValid: usernameIsValid,
    hasError: hasUsernameError,
    inputBlurHandler: usernameInputBlurHandler,
    valueChangeHandler: usernameValueChangeHandler,
    reset: usernameReset,
  } = useInput((value: string) => value.trim() !== "");

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: hasPasswordError,
    inputBlurHandler: passwordInputBlurHandler,
    valueChangeHandler: passwordValueChangeHandler,
    reset: passwordReset,
  } = useInput((value: string) => value.trim().length > 4);


  let formIsValid = false;
  if (usernameIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const submitHandler = async (event: any) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    setShowLoader(true);
    try {
    const authService = toRegister ? registerUser : loginUser;
    const response = await authService(usernameValue, passwordValue);
  
      if(response.status === 200){
        const { token } = response.data;
        setToken(token);
        resetForm();
        setShowLoader(false);
        showStatusMessage("Login successful");
      }

      if(response.status === 201){
        setShowLoader(false);
        resetForm();
        showStatusMessage("User registered successfully");
      }

    } catch (error:any) {
      console.error("Login failed", error.response);
      setShowLoader(false);
      if(error.response.status === 401){
        showStatusMessage("Login failed. Please check your credentials.");
      }
      if(error.response.status === 400){
        showStatusMessage(error.response.data.message);
      }
    }
  };
  const resetForm = () => {
    usernameReset();
    passwordReset();
  }

  const showStatusMessage = (message: string, time: number = 3000) => {
    setStatusMessage(message);
    const timer = setTimeout(() => {
      setStatusMessage("");
      clearTimeout(timer);
    }, time);
  }

  const switchHandler = () => {
    setToRegister((prev) => !prev);
    resetForm();
  };

  const formName = toRegister ? "Registration" : "Login";
  const switchButtonName = toRegister ? "Login" : "Register";

  const usernameClasses = hasUsernameError
    ? `${Classes["form-input"]} ${Classes.invalid}`
    : `${Classes["form-input"]}`;
  const passwordClasses = hasPasswordError
    ? `${Classes["form-input"]} ${Classes.invalid}`
    : `${Classes["form-input"]}`;

  return (
    <Modal onClick={onClose}>
      <button onClick={onClose}>X</button>
      <form onSubmit={submitHandler} className={Classes.form}>
        <span className={Classes.name}>{formName}</span>
        <div className={usernameClasses}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={usernameValue}
            onBlur={usernameInputBlurHandler}
            onChange={usernameValueChangeHandler}
          />
        </div>
        <div className={passwordClasses}>
          <label htmlFor="password">Password </label>
          <input
            type="password"
            id="password"
            value={passwordValue}
            onBlur={passwordInputBlurHandler}
            onChange={passwordValueChangeHandler}
          />
        </div>
        <div className={Classes["buttons-wrapper"]}>
          <button disabled={!formIsValid}>Submit</button>
          <span> or </span>
          <button onClick={switchHandler}>{switchButtonName}</button>
        </div>
        {showLoader && <div className="loader">Loading</div>}
      </form>

      {statusMessage && (
        <div className={Classes.message}>
          <div className={Classes["message-text"]}>{statusMessage}</div>
        </div>
      )}
    </Modal>
  );
};

export default Login;
