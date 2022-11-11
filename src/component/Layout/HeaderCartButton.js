import { useContext, useEffect, useState } from 'react';

import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'

const HeaderCartButton = props => {
    const cartCtx = useContext(CartContext)

    const [cartHighlighted, setCartHighlighted] = useState(false)

    const {items} = cartCtx

    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0)

    const btnClasses = `${classes.button} ${cartHighlighted && classes.bump}`

    useEffect(() => {
        if(items.length === 0){
            return;
        }

        const timer = setTimeout(() => {
            setCartHighlighted(false)
        }, 300);

        setCartHighlighted(true)

        return () => {
            clearTimeout(timer)
        }
    }, [items])

    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
}

export default HeaderCartButton