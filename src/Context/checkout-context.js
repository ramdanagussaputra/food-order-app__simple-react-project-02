import React, { useReducer } from 'react';

const CheckoutContext = React.createContext({
    isShow: false,
    clickHandler: () => {},
    closeHandler: () => {},
});

const checkReducer = (prevState, action) => {
    if (action.type === 'SHOW') return { ...prevState, isShow: true };
    if (action.type === 'CLOSE') return { ...prevState, isShow: false };
};

export const CheckoutProvider = (props) => {
    // REDUCER
    const [checkState, checkDispatch] = useReducer(checkReducer, {
        isShow: false,
    });

    // HANDLER
    const clickHandler = () => {
        checkDispatch({ type: 'SHOW' });
    };

    const closeHandler = () => {
        checkDispatch({ type: 'CLOSE' });
    };

    // VALUE
    const value = {
        isShow: checkState.isShow,
        clickHandler,
        closeHandler,
    };

    return (
        <CheckoutContext.Provider value={value}>
            {props.children}
        </CheckoutContext.Provider>
    );
};

export default CheckoutContext;
