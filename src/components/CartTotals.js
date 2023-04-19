import React from 'react'

const CartTotals = ({cart}) => {

    return (
        <h3>Cart Total: €{cart.total}</h3>
    )
}

export default CartTotals