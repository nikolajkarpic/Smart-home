import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

type Props = {
    showSignIn: () => void;
    scrollAboutIntoViel: () => void;
    scrollContactUsIntoView: () => void;
    scrollHomeIntoView: () => void;

}

export const Navbar: React.FC<Props> = ({ showSignIn, scrollAboutIntoViel, scrollContactUsIntoView, scrollHomeIntoView }) => {

    const navigate = useNavigate();

    return (
        <AppBar position='fixed' style={{ overflowX: 'hidden' }}>
            <Toolbar sx={{
                justifyContent: 'space-between',
                background: '#6699CC'
            }}>

                <IconButton
                    onClick={scrollHomeIntoView}
                    size='large'
                    edge='start'
                    color='inherit'
                    aria-label='logo'>
                    <Typography
                        variant='h6'
                        component='div'
                        sx={
                            {
                                flexGrow: 1,
                                color: '#003B6D',
                                fontVariant: 'small-caps',
                                fontWeight: 'bold',
                                fontSize: '22px',
                                letterSpacing: '4px'
                            }
                        }>
                        smart
                    </Typography>
                    <HomeIcon />
                </IconButton>
                <Stack direction='row' spacing={2} justifyContent='flex-end' alignSelf=''>
                    <Button
                        onClick={scrollAboutIntoViel}
                        color='inherit'>
                        About
                    </Button>
                    <Button
                        onClick={scrollContactUsIntoView}
                        color='inherit'>
                        Contact us
                    </Button>
                    <Button
                        onClick={() => navigate('/signin')}
                        color='inherit'>
                        Sign in
                    </Button>
                    <Button
                        onClick={() => navigate('/signup')}
                        color='inherit'>
                        Sign up
                    </Button>

                </Stack>
            </Toolbar>
        </AppBar >
    )
}