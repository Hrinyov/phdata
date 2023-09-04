import React from "react";
import Modal from "../UI/Modal/Modal";
import useInput from "../../hooks/use-input";
import Classes from "./Login.module.css";
import axios from "axios";

interface LoginProps {
  onClose: () => void;
  onSetToken: (userToken: { token: string }) => void;
}

const Login: React.FC<LoginProps> = ({onClose, onSetToken}) => {

  const {
    value: usernameValue,
    isValid: usernameIsValid,
    hasError: hasUsernameError,
    inputBlurHandler: usernameInputBlurHandler,
    valueChangeHandler: usernameValueChangeHandler,
    reset: usernameReset
  } = useInput((value:string) => value.trim() !== "");

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: hasPasswordError,
    inputBlurHandler: passwordInputBlurHandler,
    valueChangeHandler: passwordValueChangeHandler,
    reset: passwordReset,
  } = useInput((value: string) => value.trim().length > 4);

  let formIsValid = false;
  if(usernameIsValid && passwordIsValid){
    formIsValid = true;
  }

  const submitHandler = async (event: any) => {
    event.preventDefault();
    if(!formIsValid){
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/login", {
        username: usernameValue,
        password: passwordValue,
      });

      const { token } = response.data; 

      onSetToken({ token });
      usernameReset();
      passwordReset();
    } catch (error) {
      console.error("Login failed", error);
    }
    
  }


  const usernameClasses = hasUsernameError
    ? `${Classes["form-input"]} ${Classes.invalid}`
    : `${Classes["form-input"]}`;
  const passwordClasses = hasPasswordError
    ? `${Classes["form-input"]} ${Classes.invalid}`
    : `${Classes["form-input"]}`;
    
 return (
  <Modal onClick={onClose}>
    <form onSubmit={submitHandler} className={Classes.form}>
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
          onChange={passwordValueChangeHandler}/>
      </div>
      <div>
       <button disabled={!formIsValid}>Submit</button>
      </div>
   </form>
  </Modal>
   
 );
}

export default Login