import { useContext, useEffect, useState } from 'react';

import CartContext from '../../Context/cart-context';
import CheckoutContext from '../../Context/checkout-context';

import useInput from '../../hooks/useInput';
import useFetch from '../../hooks/useFetch';

import Modal from '../UI/Modal/Modal';

import classes from './Checkout.module.css';

// VALIDATION FUNCTION
const notEmptyValidation = (value) => value.trim().length > 0;
const postalCodeValidation = (value) => isFinite(value) && value.length === 5;

// COMPONENT
const Checkout = () => {
    // STATE
    const [didSubmit, setDidSubmit] = useState(false);

    // CONTEXT
    const checkCtx = useContext(CheckoutContext);
    const cartCtx = useContext(CartContext);

    // FETCH HOOK
    const { sendRequest, isLoading, error } = useFetch();

    // INPUT HOOK
    // Name field
    const {
        value: nameValue,
        valueIsValid: nameIsValid,
        valueHasError: nameHasError,
        changeHandler: nameChangeHandler,
        blurHandler: nameBlurHandler,
        styleClass: nameClass,
        reset: nameReset,
    } = useInput(notEmptyValidation);

    // Street field
    const {
        value: streetValue,
        valueIsValid: streetIsValid,
        valueHasError: streetHasError,
        changeHandler: streetChangeHandler,
        blurHandler: streetBlurHandler,
        styleClass: streetClass,
        reset: streetReset,
    } = useInput(notEmptyValidation);

    // Postal field
    const {
        value: postalValue,
        valueIsValid: postalIsValid,
        valueHasError: postalHasError,
        changeHandler: postalChangeHandler,
        blurHandler: postalBlurHandler,
        styleClass: postalClass,
        reset: postalReset,
    } = useInput(postalCodeValidation);

    // City field
    const {
        value: cityValue,
        valueIsValid: cityIsValid,
        valueHasError: cityHasError,
        changeHandler: cityChangeHandler,
        blurHandler: cityBlurHandler,
        styleClass: cityClass,
        reset: cityReset,
    } = useInput(notEmptyValidation);

    // EFFECT HOOK
    const { reset } = cartCtx;
    useEffect(() => {
        if (!error && didSubmit) reset();
    }, [error, didSubmit, reset]);

    // FORM VALID
    const formValid = nameIsValid && streetIsValid && postalIsValid && cityIsValid;

    // HANDLER
    const onConfirm = async (e) => {
        e.preventDefault();

        if (!formValid) return;
        await sendRequest({
            method: 'POST',
            url: 'https://food-order-app-28938-default-rtdb.firebaseio.com/orders.json',
            data: {
                name: nameValue,
                street: streetValue,
                postalCode: postalValue,
                city: cityValue,
                item: cartCtx.items,
            },
        });

        cityReset();
        postalReset();
        streetReset();
        nameReset();

        setDidSubmit(true);
    };

    if (isLoading)
        return (
            <Modal>
                <p>Process the checkout...</p>
            </Modal>
        );

    if (error) {
        return (
            <Modal>
                <p>Failed to checkout</p>

                <div className={classes.actions}>
                    <button type="button" onClick={checkCtx.closeHandler}>
                        Cancel
                    </button>
                </div>
            </Modal>
        );
    }

    if (!error && didSubmit)
        return (
            <Modal>
                <p>Checkout success</p>

                <div className={classes.actions}>
                    <button type="button" onClick={checkCtx.closeHandler}>
                        Cancel
                    </button>
                </div>
            </Modal>
        );

    return (
        <Modal>
            <form onSubmit={onConfirm} className={classes.form}>
                <div className={nameClass}>
                    <label htmlFor="name">Your Name</label>
                    <input
                        onChange={nameChangeHandler}
                        onBlur={nameBlurHandler}
                        type="text"
                        id="name"
                        value={nameValue}
                    />
                    {nameHasError && <p className={classes.error}>Name must not empty</p>}
                </div>

                <div className={streetClass}>
                    <label htmlFor="street">Street</label>
                    <input
                        onChange={streetChangeHandler}
                        onBlur={streetBlurHandler}
                        type="text"
                        id="street"
                        value={streetValue}
                    />
                    {streetHasError && (
                        <p className={classes.error}>Street must not empty</p>
                    )}
                </div>

                <div className={postalClass}>
                    <label htmlFor="postal">Postal Code</label>
                    <input
                        onChange={postalChangeHandler}
                        onBlur={postalBlurHandler}
                        type="text"
                        id="postal"
                        value={postalValue}
                    />
                    {postalHasError && (
                        <p className={classes.error}>Input valid postal code</p>
                    )}
                </div>

                <div className={cityClass}>
                    <label htmlFor="city">City</label>
                    <input
                        onChange={cityChangeHandler}
                        onBlur={cityBlurHandler}
                        type="text"
                        id="city"
                        value={cityValue}
                    />
                    {cityHasError && <p className={classes.error}>City must not empty</p>}
                </div>

                <div className={classes.actions}>
                    <button type="button" onClick={checkCtx.closeHandler}>
                        Cancel
                    </button>

                    <button disabled={!formValid} className={classes.submit}>
                        Confirm
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default Checkout;
