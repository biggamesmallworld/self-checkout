import React, { useEffect, useState } from "react"
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js"
import { Button } from "react-bootstrap"


const CheckoutForm = () => {
    const stripe = useStripe()
    const elements = useElements()

    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        if(elements) {
            setIsLoading(false)
        }

        if (!stripe) {
            return
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        )

        if (!clientSecret) {
            return
        }

    }, [stripe, elements])

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return
        }
    
        setIsLoading(true)
    
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `http://localhost:3000/?payment_complete=true`,
            },
        })
    
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message)
        } else {
            setMessage("An unexpected error occurred.")
        }
    
        setIsLoading(false)
    }
    
    const paymentElementOptions = {
        layout: "tabs"
    }

    return (
        <form id="payment-form" className="mt-3" onSubmit={(event) => handleSubmit(event)}>
            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <Button 
                className="mt-3"
                disabled={isLoading || !stripe || !elements} 
                id="submit"
                type="submit"
            >
                <span id="button-text">
                    {"Pay Now"}
                </span>
            </Button>
        </form>
    )
}

export default CheckoutForm
