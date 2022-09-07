import { useContext } from 'react';
import ReactDOM from 'react-dom';
import CartContext from '../../../Context/cart-context';

import styles from './Modal.module.css';

const Modal = (props) => {
    const cartCtx = useContext(CartContext);

    return ReactDOM.createPortal(
        <div onClick={cartCtx.onCloseClick} className={styles.backdrop}>
            <div className={styles.modal}>{props.children}</div>
        </div>,
        document.getElementById('modal-root')
    );
};

export default Modal;
