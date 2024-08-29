"use client"

import {useUser} from "@clerk/nextjs";
import NavBar from "@/Components/NavBar";
import {db} from "../../firebase";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {collection, doc, getDoc, setDoc, query, getDocs, deleteDoc} from "firebase/firestore";
import {Box, Card, CardActionArea, CardContent, Grid, Typography, Button, Stack} from "@mui/material";
import Loading from "@/Components/Loading";
import BottomNav from "@/Components/BottomNav";

export default  function Flashcards(){
    const {isLoaded, user, isSignedIn} = useUser();
    const router = useRouter();
    const [flashcards, setFlashcards] = useState([]);
    const [showedCards, setShowedCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [isLoading, setLoading] = useState(false);



    async function getAllFlashcards(){
        const userDocRef = doc(collection(db, "users"), user.id);
        const userDocSnap = await getDoc(userDocRef);
        return userDocSnap.data();
    }

    useEffect(() => {
        async function getFlashCards(){
            if(!user){
                return;
            }
            setLoading(true);
            const userDocRef = doc(collection(db, "users"), user.id);
            const userDocSnap = await getDoc(userDocRef);

            if(userDocSnap.exists()){
                setFlashcards(userDocSnap.data().flashcards);
                console.log(flashcards);
            }else{
                await setDoc(userDocRef, {flashcards : []})
            }
            setLoading(false);
        }
        getFlashCards();
    }, [user]);

    if(isLoaded && !isSignedIn){
        router.push("/sign-in");
    }

    async function handleDelete(index){
        const temp = [];
        const deletedSet = flashcards[index];
        for(let i = 0; i < flashcards.length; i++){
            if(i != index){
                temp.push(flashcards[i]);
            }
        }

        setFlashcards(temp);
        setShowedCards([]);
        setFlipped([]);

        const docRef = doc(collection(db, "users"), user.id);
        setDoc(docRef, {flashcards : temp});

        const collRef = query(collection(docRef, deletedSet.name));
        const collSnap = await getDocs(collRef);

        collSnap.forEach((document) => deleteDoc(document.ref));
    }

    async function handleSetClick(id) {
        const userDocRef = doc(collection(db, "users"), user.id);
        const collRef = query(collection(userDocRef, flashcards[id].name));
        const data = await getDocs(collRef);

        const temp = [];

        data.forEach((card) => {
            temp.push(card.data())
        });

        setShowedCards(temp);
        setFlipped([]);
    }

    const handleCardClick = (id) => {
        setFlipped((prev) => (
            {
                ...prev,
                [id] : !prev[id]
            }
        ))
    }

    return <>
        {
            isLoading && <Loading></Loading>
        }
        <NavBar></NavBar>
        <Typography variant = "h3" textAlign = "center" m = {5}> Your saved flashcards </Typography>
        {
            flashcards.length == 0 && (
                <Box display = "flex" justifyContent = "center">
                    <Stack>
                        <Typography variant = "h6"> Hm... seems a little empty here </Typography>
                        <Box display = "flex" justifyContent = "center">
                            <Button variant = "contained" sx = {{width : "100px"}} onClick = {() => router.push("/generate")}> Generate </Button>

                        </Box>
                    </Stack>
                </Box>
            )
        }
        <Box sx = {{height : "100%"}}>
            <Grid container m = {2} height = "100%" spacing = {2}>
                <Grid item xs = {3}>
                    <Grid container spacing = {2}>
                        {
                            flashcards.map((flashcard, index) => (
                                <Grid item xs = {12} key = {index}>
                                    <Card display = "flex">
                                        <Box display = "flex" justifyContent = "space-between">
                                            <CardActionArea onClick = {() => handleSetClick(index)}>
                                                <CardContent>
                                                    <Typography>
                                                        {flashcard.name}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <Button variant = "contained" onClick = {() => handleDelete(index)}> Delete </Button>
                                        </Box>

                                    </Card>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
                <Grid item xs = {8}>
                    <Grid container spacing = {2}>
                            {
                                showedCards.length > 0 && showedCards.map((flashcard, index) => (
                                    <Grid item xs = {4} key = {index}>
                                        <Card>
                                            <CardActionArea onClick = {() => handleCardClick(index)}>
                                                <CardContent>
                                                    <Box sx = {{
                                                        perspective : "1000px",
                                                        "& > div" : {
                                                            transition : "transform 0.6s",
                                                            transformStyle : "preserve-3d",
                                                            position : "relative",
                                                            width : "100%",
                                                            height : "200px",
                                                            transform: flipped[index] ? "rotateY(180deg)" : "rotateY(0deg)"
                                                        },
                                                        "& > div > div" : {
                                                            position : "absolute",
                                                            width : "100%",
                                                            height : "100%",
                                                            backfaceVisibility : "hidden",
                                                            display : "flex",
                                                            justifyContent : "center",
                                                            alignItems : "center",
                                                            padding : 2,
                                                            boxSizing : "border-box"
                                                        },
                                                        "& > div > div: nth-of-type(2)" : {
                                                            transform : "rotateY(180deg)"
                                                        }
                                                    }}>
                                                        <div>
                                                            <div>
                                                                <Typography variant = "h5" component = "div">
                                                                    {flashcard.front}
                                                                </Typography>
                                                            </div>
                                                            <div>
                                                                <Typography variant = "h5" component = "div">
                                                                    {flashcard.back}
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    </Box>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                ))
                            }
                    </Grid>
                </Grid>
            </Grid>
        </Box>
        <BottomNav></BottomNav>
    </>;
}