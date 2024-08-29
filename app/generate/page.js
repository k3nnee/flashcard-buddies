'use client'

import {useRouter} from "next/navigation";
import  {db} from "../../firebase"
import {collection, getDoc, doc, writeBatch} from "firebase/firestore";
import {
    Box,
    Button,
    Card,
    Container,
    Grid,
    Paper,
    Stack,
    TextField,
    Typography,
    CardActionArea,
    CardContent,
    Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";
import {useUser} from "@clerk/nextjs";
import {useState} from "react";
import NavBar from "../../Components/NavBar"
import Loading from "@/Components/Loading";
import BottomNav from "@/Components/BottomNav";

export default function Generate(){
    const {isLoaded, user, isSignedIn} = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [text, setText] = useState("");
    const [name, setName] = useState("");
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        console.log(isSignedIn);
        if(!isSignedIn){
            alert("Please sign in");
            return;
        }

        if(text.length == 0){
            alert("Please enter text to generate your cards");
            return false;
        }

        await fetch("/api/generate", {
            method : "POST",
            body : text,
        })
            .then((res) => res.json())
            .then((data) => setFlashcards(data));
        setLoading(false);
    }

    const handleCardClick = (id) => {
        setFlipped((prev) => (
            {
                ...prev,
                [id] : !prev[id]
            }
        ))
    }

    const handleOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
    };

    const saveFlashcards = async () => {
        if(!name){
            alert("Please enter a name");
        }

        if(!isSignedIn){
            alert("Please sign in");
            return;
        }

        //Collection gets the collection
        //Doc gets the document
        const batch = writeBatch(db);
        //This grabs the document reference of the user
        const userDocRef = doc(collection(db, "users"), user.id);
        const userDocSnapshot = await getDoc(userDocRef);

        //If the user exists
        if(userDocSnapshot.exists()){
            // || [] is used to provide a default value
            const collections = userDocSnapshot.data().flashcards || [];
            if(collections.find((f) => f.name === name)){
                alert("Flashcard collection with the name already exists");
                return
            }else{
                //Adding the name object into the collection
                collections.push({name});
                batch.set(userDocRef, {flashcards: collections}, { merge: true });
            }
        }else{
            //We are setting a value for the user to be the names of the flashcards : {flashcard : [{name1}, {name2}, ...]}
            batch.set(userDocRef, {flashcards: [{name}]});
        }

        //Collection within a document
        const collectionRef = collection(userDocRef, name);
        flashcards.forEach((flashcard) => {
            const cardDocRef = doc(collectionRef);
            batch.set(cardDocRef, flashcard);
        });

        await batch.commit();
        handleClose();
        await router.push("/flashcards");
    }

    return (
        <Box sx = {{height : "100vh"}}>
            {
                isLoading && <Loading></Loading>
            }
            <NavBar></NavBar>
            <Typography variant = "h3" textAlign = "center" m = {5}> Generate Flashcards </Typography>
            <Grid container spacing = {2}>
                <Grid item xs = {4}>
                    <Box display = "flex" justifyContent = "center" width = "100%">
                        <Stack width = "100%" p ={2} spacing = {2}>
                            <Paper width = "100%">
                                <TextField onChange = {(e) => setText(e.target.value)} value = {text} fullWidth multiline rows = {10} variant = "outlined"></TextField>
                            </Paper>
                            <Box>
                                <Button sx = {{width : "49%", marginRight : "2%"}} variant = "contained" onClick = {() => {
                                    handleSubmit(text)
                                    setText("")
                                }
                                }> Create flashcards </Button>

                                <Button sx = {{width : "49%"}} variant = "contained" onClick = {() => {
                                    handleOpen()
                                }
                                }> Save flashcards </Button>
                            </Box>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs = {8}>
                    {
                        flashcards.length > 0 &&
                        <Box height = "70%" p = {2}>
                            <Typography variant = "h5"> Flashcards preview</Typography>
                            <Grid container spacing = {3}>
                                { flashcards.map((flashcard, index) =>
                                    <Grid item xs = {6} key = {index}>
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
                                )}
                            </Grid>
                        </Box>
                    }
                </Grid>
            </Grid>
            <Dialog open = {open} onClose = {handleClose}>
                <DialogTitle> Please enter a name for the Flashcards </DialogTitle>
                <DialogContent>
                    <TextField onChange = {(e) => setName(e.target.value)} fullWidth  variant = "outlined"></TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick = {() => {
                        saveFlashcards()
                        handleClose()
                    }}> Save </Button>
                </DialogActions>
            </Dialog>
            <BottomNav></BottomNav>
        </Box>
    )
}