import {AppBar, Button, Toolbar, Typography, Link, Box} from "@mui/material";
import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs";

const NavBar = () => {
    return <>
        <AppBar position = "static">
            <Toolbar>
                <SignedOut>
                    <Link flexGrow = {1} href = "/" variant = "h5" sx = {{color: "inherit", textDecoration: "none", cursor : "pointer"}}> Flashcard Buddies </Link>
                    <Button color = "inherit" href = "/sign-in"> Login </Button>
                    <Button color = "inherit" href = "/sign-up"> Sign up </Button>
                </SignedOut>
                <SignedIn>
                    <Link href = "/" variant = "h6" sx = {{color: "inherit", textDecoration: "none", cursor : "pointer", marginRight : "20px"}}> Flashcard Buddies </Link>
                    <Box flexGrow = {1} sx = {{paddingTop : "2px"}}>
                        <Link href = "/generate" variant = "p" sx = {{color: "inherit", textDecoration: "none", cursor : "pointer", marginRight : "10px"}}> Generate </Link>
                        <Link href = "/flashcards" variant = "p" sx = {{color: "inherit", textDecoration: "none", cursor : "pointer"}}> Saved Cards </Link>
                    </Box>
                    <UserButton></UserButton>
                </SignedIn>
            </Toolbar>
        </AppBar>
    </>
}

export default NavBar;