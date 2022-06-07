import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';

export const Navbar = () => {
    return (
        <AppBar position='fixed' style={{ overflowX: 'hidden' }}>
            <Toolbar sx={{
                justifyContent: 'space-between',
                background: '#6699CC'
            }}>

                <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
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
                    <Button color='inherit'>
                        About
                    </Button>
                    <Button color='inherit'>
                        Sign in
                    </Button>

                </Stack>
            </Toolbar>
        </AppBar >
    )
}