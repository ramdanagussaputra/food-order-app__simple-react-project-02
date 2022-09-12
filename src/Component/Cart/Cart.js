import React, { useContext } from 'react';
import CartContext from '../../Context/cart-context';
import CartItem from './CartItem/CartItem';

import Modal from '../UI/Modal/Modal';

import styles from './Cart.module.css';
import CheckoutContext from '../../Context/checkout-context';

const Cart = () => {
    const cartCtx = useContext(CartContext);
    const checkCtx = useContext(CheckoutContext);

    // HANDLER
    const onAdd = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const onRemove = (id) => {
        cartCtx.removeItem(id);
    };

    return (
        <Modal>
            <ul className={styles['cart-items']}>
                {cartCtx.items.map((item) => (
                    <CartItem
                        key={item.id}
                        item={item}
                        onAdd={onAdd.bind(null, item)}
                        onRemove={onRemove.bind(null, item.id)}
                    />
                ))}
            </ul>

            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{`$${cartCtx.totalPrice}`}</span>
            </div>

            <div className={styles.actions}>
                <button onClick={cartCtx.onCloseClick} className={styles['button--alt']}>
                    Close
                </button>

                {cartCtx.items.length > 0 && (
                    <button onClick={checkCtx.clickHandler} className={styles.button}>
                        Order
                    </button>
                )}
            </div>
        </Modal>
    );
};

export default Cart;
