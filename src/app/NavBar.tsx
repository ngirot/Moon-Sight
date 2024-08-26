import {Box} from "@mui/system";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import Image from "next/image";

const pages = ['Home', 'About', 'Contact'];

export function NavBar() {
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
                    Moon perspective
                </Typography>
                {pages.map((page) => (
                    <Button
                        key={page}
                        sx={{my: 2, color: 'white', display: 'block'}}
                    >
                        {page}
                    </Button>
                ))}
            </Toolbar>
        </AppBar>
    </Box>
}