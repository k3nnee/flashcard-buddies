import {Box, Button, Card, CardContent, Grid, Stack, Typography} from "@mui/material";
import getStripe from "@/utils/get-stripe";

const BuyMenu = () => {
    async function handleSubmit(){
        const checkoutSession = await fetch("/api/checkout_sessions", {
            method : "POST",
            headers : {
                origin : "http://localhost:3000/",
            }
        });

        const checkoutJson = await checkoutSession.json();
        const stripe = await getStripe();
        const {error} = await stripe.redirectToCheckout({
            sessionId : checkoutJson.id
        });

        if(error){
            console.warn(error.message);
        }
    }

    async function handleSubmit2(){
        const checkoutSession = await fetch("/api/checkout_sessions_basic", {
            method : "POST",
            headers : {
                origin : "http://localhost:3000/",
            }
        });

        const checkoutJson = await checkoutSession.json();
        const stripe = await getStripe();
        const {error} = await stripe.redirectToCheckout({
            sessionId : checkoutJson.id
        });

        if(error){
            console.warn(error.message);
        }
    }

    return <>
        <Stack>
            <Typography variant = "h2" textAlign = "center" mt = {5}> Prices </Typography>
            <Box display = "flex" justifyContent = "center" pt ={2} px = {20} pb = {5} textAlign = "center">
                <Grid container spacing = {3}>
                    <Grid item xs = {6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5"> Basic </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary"> $5 / month </Typography>
                                <Typography variant="body2" mb = {2}>
                                    Access to basic flashcard features and limited storage
                                </Typography>
                                <Button variant = "contained"  onClick = {() => handleSubmit2()}> Choose basic </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs = {6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5"> Pro </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary"> $10 / month </Typography>
                                <Typography variant="body2" mb = {2}>
                                    Access to unlimited flashcard features and unlimited storage
                                </Typography>
                                <Button variant = "contained" onClick = {() => handleSubmit()}> Choose Pro </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Stack>
    </>
};

export default BuyMenu;