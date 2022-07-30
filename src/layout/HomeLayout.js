import React, {ReactNode} from 'react';
import ResponsiveAppBar from "../common/navbar/Navbar";
import {Box} from "@mui/material";



const HomeLayout = ({children}) => {
    return (
        <Box>
            <ResponsiveAppBar sx={{mt: '20rem'}}/>
            {children}
        </Box>

    )
}

export default HomeLayout