import {NextResponse} from "next/server"
import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export async function GET (req){
    const searchParams = req.nextUrl.searchParams;
    const session_id = searchParams.get("session_id");

    try{
        const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
        return NextResponse.json(checkoutSession);
    }catch(e){
        console.error("Error retrieving checkout session", error);
        return NextResponse.json(error, {message: error.message}, {status : 500});
    }
}
export async function POST (req) {
    //This is the parameter that goes inside a session creation
    const params = {
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
            {
                price_data : {
                    currency : "usd",
                    product_data : {
                        name : "Pro Subscription"
                    },
                    //Stripe only takes cents
                    unit_amount : 1000,
                    recurring : {
                        interval : "month",
                        interval_count : 1
                    }
                },
                quantity: 1,
            },
        ],
        //URL if the payment was a success
        success_url: `${req.headers.get("origin")}/result?session_id={CHECKOUT_SESSION_ID}`,
        //URL to cancel payment
        cancel_url: `${req.headers.get("origin")}/result?session_id={CHECKOUT_SESSION_ID}`,
    };

    //We create a checkout session with stripe
    const checkoutSession = await stripe.checkout.sessions.create(params);
    //Creates a NextResponse that converts our checkout session into JSON
    return NextResponse.json(checkoutSession);

}