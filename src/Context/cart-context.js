import React, { useReducer } from 'react';

const CartContext = React.createContext({
    isClick: false,
    onCartClick: () => {},
    onCloseClick: () => {},
    items: [],
    addItem: () => {},
    removeItem: () => {},
    totalPrice: 0,
    totalAmount: 0,
});

// REDUCER FUNCTION
const cartReducer = (prevState, action) => {
    if (action.type === 'CART_CLICK') return { ...prevState, isClick: true };

    if (action.type === 'CLOSE_CLICK') return { ...prevState, isClick: false };

    if (action.type === 'ADD_ITEM') {
        // Check if selected item exist
        const existItemIndex = prevState.items.findIndex(
            (item) => item.id === action.item.id
        );

        let updatedItems;
        let updatedItem;

        // If item exist
        if (existItemIndex >= 0) {
            // Copy seleted item
            updatedItem = { ...prevState.items[existItemIndex] };

            // Update selected amount
            updatedItem.amount = +updatedItem.amount + +action.item.amount;

            // Copy items
            updatedItems = [...prevState.items];

            // Update seleted item
            updatedItems[existItemIndex] = updatedItem;
        }

        // If item not exist
        if (existItemIndex < 0) {
            updatedItems = [...prevState.items, action.item];
        }

        return {
            ...prevState,
            totalAmount: updatedItems.reduce((prev, cur) => prev + +cur.amount, 0),
            // prettier-ignore
            totalPrice: updatedItems.reduce((prev, cur) => prev + cur.amount * cur.price, 0),
            items: updatedItems,
        };
    }

    if (action.type === 'REMOVE_ITEM') {
        // Find remove item
        const removeItemIndex = prevState.items.findIndex(
            (item) => item.id === action.id
        );

        const updatedItem = { ...prevState.items[removeItemIndex] };
        const updatedItems = [...prevState.items];

        if (updatedItem.amount > 0) {
            updatedItem.amount = +updatedItem.amount - 1;
            updatedItems[removeItemIndex] = updatedItem;
        }

        if (updatedItem.amount <= 0) updatedItems.splice(removeItemIndex, 1);

        return {
            ...prevState,
            totalAmount: updatedItems.reduce((prev, cur) => prev + +cur.amount, 0),
            // prettier-ignore
            totalPrice: updatedItems.reduce((prev, cur) => prev + cur.amount * cur.price, 0),
            items: updatedItems,
        };
    }
};

export const CartProvider = (props) => {
    // STATE
    const [cartState, cartDispatch] = useReducer(cartReducer, {
        isClick: false,
        totalAmount: 0,
        items: [],
        totalPrice: 0,
    });

    // HANDLER
    const onCartClick = () => {
        cartDispatch({ type: 'CART_CLICK' });
    };

    const onCloseClick = (e) => {
        cartDispatch({ type: 'CLOSE_CLICK' });
    };

    const addItem = (item) => {
        cartDispatch({ type: 'ADD_ITEM', item });
    };

    const removeItem = (id) => {
        cartDispatch({ type: 'REMOVE_ITEM', id });
    };

    // VALUE
    const value = {
        isClick: cartState.isClick,
        onCartClick,
        onCloseClick,
        addItem,
        removeItem,
        items: cartState.items,
        totalPrice: cartState.totalPrice.toFixed(2),
        totalAmount: cartState.totalAmount,
    };

    return <CartContext.Provider value={value}>{props.children}</CartContext.Provider>;
};

export default CartContext;
