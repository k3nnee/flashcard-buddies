import {Box, Card, CardContent, Grid, Stack, Typography} from "@mui/material";

const Features = () => {
    return <>
        <Stack>
            <Typography variant = "h2" textAlign = "center"> Features </Typography>
            <Box display = "flex" justifyContent = "center" pt ={2} px = {20} pb = {5} textAlign = "center">
                <Grid container spacing = {3}>
                    <Grid item xs = {6} display = "flex" justifyContent = "end">
                        <Card sx={{ maxWidth: 250 , minHeight: 200}}>
                            <CardContent>
                                <Typography mb = {1.5} color="text.secondary">
                                    Our AI intelligently breaks down your text into concise flashcards, perfect for studying
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs = {6}>
                        <Card sx={{ maxWidth: 250, minHeight: 200}}>
                            <CardContent>
                                <Typography mb = {1.5} color="text.secondary">
                                    Easy to use
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs = {6} display = "flex" justifyContent = "end">
                        <Card sx={{ maxWidth: 250, minHeight: 200}}>
                            <CardContent>
                                <Typography mb = {1.5} color="text.secondary">
                                    Access your cards from any device, on the go
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs = {6}>
                        <Card sx={{ maxWidth: 250, minHeight: 200}}>
                            <CardContent>
                                <Typography mb = {1.5} color="text.secondary">
                                    Affordable
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Stack>
    </>
};

export default Features;