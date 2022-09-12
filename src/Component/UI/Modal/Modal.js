import { useContext, Fragment } from 'react';
import ReactDOM from 'react-dom';
import CartContext from '../../../Context/cart-context';
import CheckoutContext from '../../../Context/checkout-context';

import styles from './Modal.module.css';

const Backdrop = () => {
    const cartCtx = useContext(CartContext);
    const checkCtx = useContext(CheckoutContext);

    const backdropOnClick = () => {
        cartCtx.onCloseClick();
        checkCtx.closeHandler();
    };

    return <div onClick={backdropOnClick} className={styles.backdrop}></div>;
};

const Modal = (props) => {
    return ReactDOM.createPortal(
        <Fragment>
            <Backdrop />
            <div className={styles.modal}>{props.children}</div>
        </Fragment>,
        document.getElementById('modal-root')
    );
};

export default Modal;
