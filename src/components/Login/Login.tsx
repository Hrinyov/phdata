import React from "react";
import Modal from "../UI/Modal/Modal";
import useInput from "../../hooks/use-input";
import Classes from "./Login.module.css";

interface LoginProps {
  onClose: () => void
}

const Login: React.FC<LoginProps> = ({onClose}) => {

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

  const submitHandler = (event: any) => {
    event.preventDefault();
    if(!formIsValid){
      return;
    }
    console.log({usernameValue,passwordValue});
    usernameReset();
    passwordReset();
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