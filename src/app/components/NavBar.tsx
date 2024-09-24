import {Box} from "@mui/system";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import Image from "next/image";
import {useState} from "react";
import About from "@/app/components/About";

export function NavBar() {
    const [aboutOpen, setAboutOpen] = useState(false);

    return <Box sx={{flexGrow: 1}} paddingBottom={2}>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                >
                    <Image src={'img/logo.svg'} width={45} height={45} alt={'application logo'}/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Moon Sight
                </Typography>
                <Button
                    sx={{my: 2, color: 'white', display: 'block'}}
                    onClick={() => setAboutOpen(true)}
                >
                    About
                </Button>
                <About open={aboutOpen} close={() => setAboutOpen(false)}></About>
                <Button
                    sx={{my: 2, color: 'white', display: 'block'}}
                >
                    Contact
                </Button>
            </Toolbar>
        </AppBar>
    </Box>
}