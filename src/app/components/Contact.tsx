import {AppBar, Container, Dialog, Divider, IconButton, Slide, Toolbar, Typography} from "@mui/material";
import {forwardRef} from "react";
import {TransitionProps} from '@mui/material/transitions';
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {Box} from "@mui/system";

interface ContactProps {
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

export default function Contact({open, close}: ContactProps) {
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
                    Contact
                </Typography>
            </Toolbar>
        </AppBar>
        <Container>
            <Box>
                <Typography variant="body1" mt={2}>
                    We’d love to hear from you! Whether you have questions, feedback, or ideas to improve Moon Sight, we’re here to help.
                </Typography>
                <Typography variant="body1" mt={2}>
                    For any inquiries or to get in touch with our team, please contact us on <a href="mailto:contacts.moon.sight@gmail.com">contacts.moon.sight@gmail.com</a>
                </Typography>
                <Typography variant="body1" mt={2}>
                    Facing an issue?<br/>
                    If you encounter any problems while using Moon Sight, or if you have suggestions for improvements, we encourage you to submit an issue on our GitHub repository. This helps us keep track of bugs and feature requests, and allows the community to contribute to the development of Moon Sight.<br/>
                    GitHub: <a href="https://github.com/ngirot/Moon-Sight/issues">Submit an Issue Here</a>
                </Typography>
                <Typography variant="body1" mt={2}>
                    We appreciate your feedback and your contributions to making Moon Sight the best tool it can be. Thank you for being part of our community! 🌕
                </Typography>
            </Box>
        </Container>
    </Dialog>
}