import React, {useState} from 'react'

const CartItem = ({item, itemIndex, cart, setCart}) => {

    const removeItem = (item) => {
        let newTotal = parseFloat(cart.total - item.price).toFixed(2)
        setCart({
            ...cart,
            total: newTotal,
            products: cart.products.filter((product, index) => {
                return index !== itemIndex
            })
        })
    }
   
    return (
        <li className="list-group-item d-inline-flex justify-content-between">
            <div className="d-inline-flex align-items-center">
                <button className='remove' onClick={(event) => removeItem(item)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </button>
                
                <span>{item.name}</span>
            </div> 
            <span>€{item.price}</span>
        </li>
    )
}

export default CartItem