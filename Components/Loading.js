import {Box, CircularProgress} from "@mui/material";

const Loading = () => {
    return (
        <Box width = "100vw" height = "100vh" display = "flex" position = "absolute" justifyContent = "center" alignItems = "center" bgcolor = "#737373" sx = {{"opacity" : ".5"}}>
            <CircularProgress></CircularProgress>
        </Box>
    )
}

export default Loading;