import { useState } from 'react';
import styleCheckout from '../Component/Checkout/Checkout.module.css';

const useInput = (validation) => {
    const [value, setValue] = useState('');
    const [isTouch, setIsTouch] = useState(false);

    // VALIDATION
    const valueIsValid = validation(value);
    const valueHasError = !valueIsValid && isTouch;

    // HANDLER
    const changeHandler = (e) => {
        setValue(e.target.value);
    };

    const blurHandler = () => {
        setIsTouch(true);
    };

    // CSS CLASS
    const styleClass = valueHasError
        ? `${styleCheckout.control} ${styleCheckout.invalid}`
        : `${styleCheckout.control}`;

    // RESET
    const reset = () => {
        setIsTouch(false);
        setValue('');
    };

    return {
        value,
        valueIsValid,
        valueHasError,
        changeHandler,
        blurHandler,
        styleClass,
        reset,
    };
};

export default useInput;
