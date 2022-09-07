import { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';

import styles from './Header.module.css';
import mealImg from '../../../Assets/meals.jpg';

const Header = () => {
    return (
        <Fragment>
            <header className={styles.header}>
                <h1>ReactMeal</h1>
                <HeaderCartButton />
            </header>

            <div className={styles['main-image']}>
                <img src={mealImg} alt="Meal img" />
            </div>
        </Fragment>
    );
};

export default Header;
