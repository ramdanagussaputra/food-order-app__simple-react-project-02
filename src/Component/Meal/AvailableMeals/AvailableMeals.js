import MealItem from '../MealItem/MealItem';
import Card from '../../UI/Card/Card';

import styles from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';
import useFetch from '../../../hooks/useFetch';

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const { sendRequest, isLoading, error } = useFetch();

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

    // CONTENT
    if (error)
        return (
            <div className={styles.meals}>
                <Card>
                    <p>Failed to fetch</p>
                </Card>
            </div>
        );

    if (isLoading)
        return (
            <div className={styles.meals}>
                <Card>
                    <p>Fetching data...</p>
                </Card>
            </div>
        );

    if (meals.length > 0)
        return (
            <div className={styles.meals}>
                <Card>
                    <ul>{mealList}</ul>
                </Card>
            </div>
        );

    return (
        <div className={styles.meals}>
            <Card>
                <p>No Meal Available</p>
            </Card>
        </div>
    );
};

export default AvailableMeals;
