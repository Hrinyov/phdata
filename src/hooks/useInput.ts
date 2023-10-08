import { useState } from "react"


const useInput = (validateInput: any) =>{
    const [inputValue, setInputValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateInput(inputValue);
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = (event: any) =>{
        setInputValue(event.target.value);
    }
    const inputBlurHandler = () =>{
        setIsTouched(true);
    }
    const reset = () =>{
        setInputValue('');
        setIsTouched(false);
    }

    return {
        value: inputValue,
        isValid: valueIsValid,
        hasError,
        inputBlurHandler,
        valueChangeHandler,
        reset
    }
}
export default useInput;