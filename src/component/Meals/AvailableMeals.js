import { useState, useEffect } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css'

const AvailableMeals = () => {

    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        setIsLoading(true)
        fetch('/meals')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Something went wrong!')
                }
                return res.json()
            })
            .then(data => {
                setMeals(data.meals)
            })
            .catch(err => setError(err.message))
        setIsLoading(false)
    }, [])

    let content = <li>No Meals Available</li>

    if (error) {
        content = <li>{error}</li>
    }

    if (isLoading) {
        content = <li>Meals are Loading....</li>
    }

    if (meals.length > 0) {
        content = meals.map(meal =>
            <MealItem
                key={meal._id}
                id={meal._id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
            />
        )
    }

    return <section className={classes.meals}>
        <Card>
            <ul>{content}</ul>
        </Card>
    </section>
}

export default AvailableMeals