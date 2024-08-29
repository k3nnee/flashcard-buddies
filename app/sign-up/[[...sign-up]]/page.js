//Dynamic segments can be made using [[...name]], this will catch all subsequent segments for example, sign-in/a, sign-in/a/b, ...

import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {SignUp} from "@clerk/nextjs";
import Link from "next/link";

export default function Page(){
    return (
        <>
            <AppBar position = "static">
                <Toolbar>
                    <Link flexGrow = {1} href = "/" variant = "h5" sx = {{color: "inherit", textDecoration: "none", cursor : "pointer"}}> Flashcard Buddies </Link>
                    <Box>
                        <Button color = "inherit" href = "/sign-in">
                            Login
                        </Button>
                        <Button color = "inherit" href = "/sign-up">
                            Sign up
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box display = "flex" flexDirection = "column" alignItems = "center" justifyContent= "center" p = {6}>
                <Typography variant = "h4" my = {2}> Sign Up </Typography>
                <SignUp></SignUp>
            </Box>
        </>
    )
}