import MealItemForm from './MealItemForm';

import styles from './MealItem.module.css';

const MealItem = (props) => {
    const price = `$${props.data.price.toFixed(2)}`;

    return (
        <li className={styles.meal}>
            <div>
                <h3>{props.data.name}</h3>
                <p className={styles.description}>{props.data.description}</p>
                <p className={styles.price}>{price}</p>
            </div>

            <div>
                <MealItemForm data={props.data} />
            </div>
        </li>
    );
};

export default MealItem;
