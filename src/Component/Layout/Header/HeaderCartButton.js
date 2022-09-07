import { useContext, useEffect, useState } from 'react';
import CartContext from '../../../Context/cart-context';

import CartIcon from '../../Cart/CartIcon';

import styles from './HeaderCartButton.module.css';

const HeaderCartButton = () => {
    const cartCtx = useContext(CartContext);
    const [isBump, setIsBump] = useState(styles.bump);

    useEffect(() => {
        setIsBump('');

        const timer = setTimeout(() => setIsBump(styles.bump), 50);

        return () => {
            clearTimeout(timer);
        };
    }, [cartCtx.totalAmount]);

    return (
        <button onClick={cartCtx.onCartClick} className={`${styles.button} ${isBump}`}>
            <span className={styles.icon}>
                <CartIcon />
            </span>

            <span>Your cart</span>

            <span className={styles.badge}>{cartCtx.totalAmount}</span>
        </button>
    );
};

export default HeaderCartButton;
