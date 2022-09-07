import { useContext, useRef } from 'react';
import CartContext from '../../../Context/cart-context';
import Input from '../../UI/Input/Input';

import styles from './MealItemForm.module.css';

const MealItemForm = (props) => {
    const cartCtx = useContext(CartContext);
    const formRef = useRef();

    const input = {
        id: `amount-${props.data.id}`,
        type: 'number',
        min: 1,
        max: 5,
        step: 1,
        defaultValue: 1,
        name: `amount`,
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(formRef.current).entries());

        cartCtx.addItem({
            amount: formData.amount,
            name: props.data.name,
            price: +props.data.price,
            id: props.data.id,
        });
    };

    return (
        <form ref={formRef} onSubmit={onSubmit} className={styles.form}>
            <Input name="amount" input={input} label={'Amount'} />
            <button>+Add</button>
        </form>
    );
};

export default MealItemForm;
