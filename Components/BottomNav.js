"use client"

import {
    AppBar,
    Button,
    Toolbar,
    Typography,
    Link,
    Box,
    BottomNavigation,
    Paper,
    BottomNavigationAction
} from "@mui/material";
import {SignedIn, SignedOut} from "@clerk/nextjs";
import {useRouter} from "next/navigation";

const BottomNav = () => {
    const router = useRouter();
    return <>
        <Box sx={{".MuiBottomNavigation-root" : {
            position: 'fixed', bottom: 0, left: 0, right: 0 , bgcolor : "#1976d2"
        }}} >
            <SignedOut>
                <BottomNavigation showLabels>
                    <BottomNavigationAction onClick = {() => router.push("/sign-in")} sx = {{".MuiBottomNavigationAction-label" : {color : "white", fontSize : "16px"}}} label="Login"/>
                    <BottomNavigationAction onClick = {() => router.push("/sign-up")} sx = {{".MuiBottomNavigationAction-label" : {color : "white", fontSize : "16px"}}} label="Sign up"/>
                </BottomNavigation>
            </SignedOut>

            <SignedIn>
                <BottomNavigation showLabels>
                    <BottomNavigationAction onClick = {() => router.push("/generate")} sx = {{".MuiBottomNavigationAction-label" : {color : "white", fontSize : "16px"}}} label="Generate"/>
                    <BottomNavigationAction onClick = {() => router.push("/flashcards")} sx = {{".MuiBottomNavigationAction-label" : {color : "white", fontSize : "16px"}}} label="Saved cards"/>
                </BottomNavigation>
            </SignedIn>

        </Box>
    </>
}

export default BottomNav;