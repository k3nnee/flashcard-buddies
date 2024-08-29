"use client"

import getStripe from "@/utils/get-stripe";
import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs"
import {AppBar, Box, Button, Card, CardContent, Grid, Stack, Toolbar, Typography} from "@mui/material";
import NavBar from "@/Components/NavBar";
import Features from "@/Components/Features";
import BuyMenu from "@/Components/BuyMenu";
import BottomNav from "@/Components/BottomNav";

export default function Home() {
  return (
      <Box maxWidth = "100%">
        <NavBar></NavBar>
          <Box display="flex" justifyContent="center" minHeight = "80vh" style = {{alignItems : "center"}} mt = {10}>
              <Box textAlign = "center" mb = {20}>
                  <Box pb = {2}>
                      <Typography variant = "h1">
                          Welcome to Flashcard Buddies
                      </Typography>
                      <Typography variant = "h5">
                          The easiest way to create flashcards from your text
                      </Typography>
                  </Box>
                  <Button variant = "contained" href = "/sign-in"> Get Started</Button>
              </Box>
          </Box>
          <hr style = {{ border: 0, height: 0, borderTop: "1px solid rgba(0, 0, 0, 0.1)", borderBottom: "1px solid rgba(255, 255, 255, 0.3)"}}></hr>
          <Features></Features>
          <hr style = {{ border: 0, height: 0, borderTop: "1px solid rgba(0, 0, 0, 0.1)", borderBottom: "1px solid rgba(255, 255, 255, 0.3)"}}></hr>
          <BuyMenu></BuyMenu>
          <BottomNav></BottomNav>
      </Box>
  );
}
