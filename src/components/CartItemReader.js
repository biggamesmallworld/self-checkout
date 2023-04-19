import React, {useState} from 'react'
import {QrScanner} from '@yudiel/react-qr-scanner'
import loader from '../assets/loader.gif'

const CartItemReader = ({cart, setCart}) => {
    const [handlingQR, setHandlingQR] = useState(false)

    const upDateCart = (result) => {
        setHandlingQR(true)
        let cartItem = JSON.parse(result),
            cartTotal = parseFloat(cartItem.price) + parseFloat(cart.total),
            formattedCartTotal =  cartTotal.toFixed(2)

        setCart({
            ...cart,
            total: formattedCartTotal,
            products: [
                ...cart.products,
                {
                    ...cartItem,
                    price: cartItem.price.toFixed(2)
                }
            ]
        })

        setTimeout(() => {
            setHandlingQR(false)
        }, "700")
    }

    return (
        <>
            {handlingQR ? 
                <div className='d-flex w-100 h-100 align-items-center justify-content-center'>
                    <img src={loader} alt='Loading' />
                </div>
            : 
                <QrScanner
                    onDecode={(result) => upDateCart(result)}
                    onError={(error) => console.log(error?.message)}
                />
            }
        </>
    )
}

export default CartItemReader