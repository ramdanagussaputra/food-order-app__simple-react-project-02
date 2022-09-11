import { useContext, Fragment } from 'react';
import ReactDOM from 'react-dom';
import CartContext from '../../../Context/cart-context';

import styles from './Modal.module.css';

const Modal = (props) => {
    const cartCtx = useContext(CartContext);

    return ReactDOM.createPortal(
        <Fragment>
            <div onClick={cartCtx.onCloseClick} className={styles.backdrop}></div>
            <div className={styles.modal}>{props.children}</div>
        </Fragment>,
        document.getElementById('modal-root')
    );
};

export default Modal;
