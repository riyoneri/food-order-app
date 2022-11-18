import { useState, useEffect } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css'

// const DUMMY_MEALS = [
//     {
//         id: "m1",
//         name: "Sushi",
//         description: "Finest fish and veggies",
//         price: 22.99,
//     },
//     {
//         id: "m2",
//         name: "Schnitzel",
//         description: "A german specialty!",
//         price: 16.5,
//     },
//     {
//         id: "m3",
//         name: "Barbecue Burger",
//         description: "American, raw, meaty",
//         price: 12.99,
//     },
//     {
//         id: "m4",
//         name: "Green Bowl",
//         description: "Healthy...and green...",
//         price: 18.99,
//     },
// ];

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
    }, [meals])

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
                id={meal.id}
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