import {AppBar, Container, Dialog, Divider, IconButton, Slide, Toolbar, Typography} from "@mui/material";
import {forwardRef} from "react";
import {TransitionProps} from '@mui/material/transitions';
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {Box} from "@mui/system";

interface AboutProps {
    open: boolean
    close: () => void
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function About({open, close}: AboutProps) {
    return <Dialog fullScreen={true} open={open} onClose={close} TransitionComponent={Transition}>
        <AppBar sx={{position: 'relative'}}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={close}
                    aria-label="close"
                >
                    <CloseIcon/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    About
                </Typography>
            </Toolbar>
        </AppBar>
        <Container>
            <Box>
                <Typography variant="body1" mt={2}>
                    Welcome to Moon Sight, your interactive portal for exploring the moon as it appears in the sky from
                    any location on Earth, at any date and time. Whether you&apos;re a casual observer or an avid astronomer,
                    Moon Sight provides a real-time visualization of the moon&apos;s phase, position, and visibility,
                    customized
                    for your specific location and time zone. You can also look back to see the moon&apos;s past phases or
                    forward
                    to see how it will appear in the future.
                </Typography>
                <Typography variant="body1" mt={2}>
                    However, please note that our system does not manage horizon
                    effects yet, meaning the tool does not account for the moon&apos;s rise or set times, nor whether the
                    moon is
                    visible above the local horizon at a given time. Moon Sight will show you the moon&apos;s position as if
                    viewed from the celestial sphere, even if it is technically below the horizon in your area.
                </Typography>
                <Typography variant="body1" mt={2}>
                    Additionally, lunar eclipses are not managed by our system, so the moon’s appearance during
                    these events will not be reflected accurately.
                </Typography>
                <Typography variant="body1" mt={2} mb={3}>
                    Moon Sight is perfect for everyone from casual stargazers to seasoned astronomers, offering a
                    stunning
                    and accurate view of the moon&apos;s journey across the sky. Discover the beauty of the moon from any
                    point on Earth, and explore its phases and movements throughout time. 🌙
                </Typography>
            </Box>
            <Divider variant="fullWidth"/>
            <Box>
                <Typography variant="body1" mt={3}>
                    Moon texture and mapping are from : <a href="https://svs.gsfc.nasa.gov/4720/">NASA&apos;s Scientific
                    Visualization Studio</a>
                </Typography>
            </Box>
        </Container>
    </Dialog>
}