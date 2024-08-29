"use client"

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import getStripe from "@/utils/get-stripe";
import {useSearchParams} from "next/navigation";
import Loading from "@/Components/Loading";
import {Box, Container, Typography} from "@mui/material";
import NavBar from "@/Components/NavBar";
import BottomNav from "@/Components/BottomNav";
import Paid from "@/Components/Paid";
import Unpaid from "@/Components/Unpaid";

const ResultPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const session_id = searchParams.get("session_id");
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCheckoutSession = async () => {
            if(!session_id){
                return;
            }
            try{
                await fetch(`/api/checkout_sessions?session_id=${session_id}`).then(async (sessionData) =>
                {
                    const data = await sessionData.json();
                    if(sessionData.ok){
                        setSession((prevState) => ({...prevState, ...data}));
                    }else{
                        setError(data.error);
                    }
                });

            }catch(e){
                setError("An error occured");
            }finally{
                setLoading(false);
            }
        }
        fetchCheckoutSession();
    }, []);


    return (
        <>
            {
                loading && <Loading></Loading>
            }
            <NavBar></NavBar>

            {
                error ?
                    <>
                        <Container maxWidth = "100vw" mt = {4}>
                            <Typography> {error} </Typography>
                        </Container>
                    </> :
                    <Container maxWidth = "100vw" mt = {4}>
                        {
                            session && ( session.payment_status == "paid" ?
                                    <Paid></Paid>
                                        :
                                    <Unpaid></Unpaid>
                            )
                        }
                    </Container>
            }
            <BottomNav></BottomNav>
        </>
    );
}

export default ResultPage;