import {Box, Button, Stack, Typography} from "@mui/material";
import {useRouter} from "next/navigation";

function Unpaid() {
    const router = useRouter();
    return (
        <>
            <Box display = "flex" justifyContent = "center" alignItems = "center" m = {5}>
                <Stack>
                    <Typography variant = "h4"> Payment failed </Typography>
                    <Typography textAlign = "center" variant = "p"> Please try again </Typography>
                    <Box display = "flex" justifyContent = "center" m = {2}>
                        <Button variant = "contained" sx = {{width : "100px"}} onClick = {() => router.push("/")}> Try again </Button>
                    </Box>
                </Stack>
            </Box>
        </>
    );
}

export default Unpaid;