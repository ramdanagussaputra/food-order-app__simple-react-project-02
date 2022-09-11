import MealItem from '../MealItem/MealItem';
import Card from '../../UI/Card/Card';

import styles from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';
import useFetch from '../../../hooks/useFetch';

// const DUMMY_MEALS = [
//     {
//         id: 'm1',
//         name: 'Sushi',
//         description: 'Finest fish and veggies',
//         price: 22.99,
//     },
//     {
//         id: 'm2',
//         name: 'Schnitzel',
//         description: 'A german specialty!',
//         price: 16.5,
//     },
//     {
//         id: 'm3',
//         name: 'Barbecue Burger',
//         description: 'American, raw, meaty',
//         price: 12.99,
//     },
//     {
//         id: 'm4',
//         name: 'Green Bowl',
//         description: 'Healthy...and green...',
//         price: 18.99,
//     },
// ];

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);

    const { sendRequest } = useFetch();

    useEffect(() => {
        const reqConfig = {
            method: 'get',
            url: 'https://food-order-app-28938-default-rtdb.firebaseio.com/available-meals.json',
        };

        const dataHandler = (data) => {
            const mealsArr = Object.entries(data).map((meal) => {
                return {
                    ...meal[1],
                    id: meal[0],
                };
            });

            setMeals(mealsArr);
        };

        sendRequest(reqConfig, dataHandler);
    }, [sendRequest]);

    const mealList = meals.map((meal) => <MealItem key={meal.id} data={meal} />);

    return (
        <div className={styles.meals}>
            <Card>
                <ul>{mealList}</ul>
            </Card>
        </div>
    );
};

export default AvailableMeals;
