import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from '@mui/material'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Logo } from '../../common/logo/logo'
import NavElement from './navElement/navElement'
import DropdownMenu from './dropdownMenu/dropdownMenu';

export const AppNavbar: React.FC<{}> = () => {
    return (
        <AppBar position='fixed' style={{ overflowX: 'hidden' }}>
            <Toolbar sx={{
                justifyContent: 'space-between',
                background: '#6699CC'
            }}>

                <IconButton>
                    <Logo redirectTo='/app' style={
                        {
                            padding: '0',
                            margin: '0',
                        }
                    } />
                </IconButton>
                <Stack direction='row' spacing={2} justifyContent='flex-end' alignSelf=''>
                    <Button
                        color='inherit'>
                        House
                    </Button>
                    <Button
                        color='inherit'>
                        Statistics
                    </Button>
                    <Button
                        color='inherit'>
                        options
                    </Button>
                </Stack>

                <Stack direction='row' spacing={2} justifyContent='flex-end' alignSelf=''>
                    <Button
                        color='inherit'>
                        Not
                    </Button>
                    <Button
                        onClick={() => {
                            localStorage.removeItem('access_token');
                        }}
                        color='inherit'>
                        User
                    </Button>
                    <NavElement icon={<AccountCircleOutlinedIcon />} >
                        <DropdownMenu>
                            lolic
                            l
                            l
                            <p>lol</p>
                            <div>
                                lol
                            </div>

                        </DropdownMenu>
                    </NavElement>
                </Stack>
            </Toolbar>
        </AppBar >
    )
}