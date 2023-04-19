import React from 'react'

const CartTotals = ({cart, setCart}) => {

    return (
        <>
            <h3>Cart Total: €{cart.total}</h3>
        </>
    )
}

export default CartTotals