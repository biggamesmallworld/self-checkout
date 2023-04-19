import React, { useState } from 'react'
import './App.css'
import CartItemReader from './components/CartItemReader'
import CartTotals from './components/CartTotals'
import StripePurchase from './components/StripePurchase'
import {loadStripe} from '@stripe/stripe-js'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Col, Container, Row, Alert, Card } from 'react-bootstrap'
import CartItem from './components/CartItem'
import axios from 'axios'

const stripePromise = loadStripe('pk_test_51MyZSeImkZ8zihsi3zMNbpjkUeBokRnCKPIadUjL6qyyt03gEZIl9KO1mEXzg3fZbxvNP1PCbP9lu74H3VwZ5V7x00FanKrmgA')

const App = () => {
    const [cart, setCart] = useState({
        total: 0,
        products: []
    })
    const [showPayment, setShowPayment] = useState(false)
    const [clientSecret, setClientSecret] = useState("")
    const [loadingPayment, setLoadingPayment] = useState(false)
    const queryParameters = new URLSearchParams(window.location.search)

    const refresh = () => {
        window.location.reload()
    }


    const updateStripePaymentIntent = () => {
        setLoadingPayment(true)
        let totalCost = cart.total * 100, // stripe only reads in cents
            targetEndpoint = `http://localhost:8888/wp-marty/wp-json/wps_manual_checkout_routes/v1/create_payment_intent?total_cost=${totalCost}`
            
  
        axios.get(targetEndpoint)
            .then(res => {
                setClientSecret(JSON.parse(res.data).client_secret)
                setShowPayment(true)
            })
            .catch(err => {
                console.error(err)
                setLoadingPayment(false)
            })
    }

    return (
        <Container>
            {queryParameters.get("payment_complete") === "true" ?
                <Row>
                    <Col xs={4}>
                        <Alert variant={"success"}>
                            Your payment was successful! You may begin another order below.
                        </Alert>
                    </Col>
                </Row>
            : null}
            
           <Row>
                <Col xs={4}>
                    <Card className="p-3">
                        <Button className="my-3 btn-secondary mr-3" onClick={(event) => refresh(event)}>Refresh</Button>
                        {showPayment ?
                            <>
                                <Button onClick={(event) => setShowPayment(false)}>Back</Button>
                                {(clientSecret !== "") ? 
                                    <StripePurchase 
                                        stripePromise={stripePromise} 
                                        clientSecret={clientSecret}
                                    />
                                : null}
                            </>
                        : 
                            <div className="cart-wrapper align-items-start">
                                <div className="qr-wrapper w-100">
                                    <CartItemReader
                                        cart={cart} 
                                        setCart={setCart}
                                    />
                                </div>
                                <div className="mb-3 w-100">
                                    <h3>Cart Items</h3>
                                    {cart.products.length ? 
                                        <ul className='list-group'>
                                            {cart.products.map((product, index) => {
                                                return (
                                                    <CartItem 
                                                        key={index} 
                                                        itemIndex={index}
                                                        item={product} 
                                                        cart={cart}
                                                        setCart={setCart}
                                                    />
                                                )
                                            })}
                                        </ul>
                                    : <p className='mb-0'>Please add a product to begin!</p>}
                                </div>
                                <CartTotals 
                                    cart={cart}
                                    setCart={setCart}
                                />
                                {console.log(cart.products.length > 0)}
                                <Button 
                                    onClick={(event) => updateStripePaymentIntent()}
                                    disabled={loadingPayment || cart.products.length === 0}
                                    >
                                        Proceed to payment
                                </Button>
                            </div>
                        }
                    </Card>
                    
                </Col>
            </Row>
        </Container>
    )

}

export default App