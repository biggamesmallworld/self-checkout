import {Elements} from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'


const StripePurchase = ({stripePromise, clientSecret}) => {

    const options = {
        // passing the client secret obtained from the server
        clientSecret: clientSecret,
    }
    
    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
        </Elements>
    )
}

export default StripePurchase
