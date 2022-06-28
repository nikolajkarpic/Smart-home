import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from '@mui/material'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Logo } from '../../common/logo/logo'
import NavElement from './navElement/navElement'
import DropdownMenu from './dropdownMenu/dropdownMenu';
import DropdownItem from './dropdownMenu/dropdownItem/dropdownItem';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DonutSmallOutlinedIcon from '@mui/icons-material/DonutSmallOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import styles from './navbar.module.css';
import { SmartHome } from '../../../global/types';

type Props = {
    smartHome: Array<SmartHome>;
}

export const AppNavbar: React.FC<{}> = () => {

    const signOutHandler = () => {
        localStorage.removeItem('access_token');
    }

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
                        <div className={styles.buttonChildren}>

                            <HomeOutlinedIcon />
                            House
                        </div>
                    </Button>
                    <Button
                        color='inherit'>
                        <div className={styles.buttonChildren}>

                            <DonutSmallOutlinedIcon />
                            Statistics
                        </div>
                    </Button>
                    <Button
                        color='inherit'>
                        <div className={styles.buttonChildren}>

                            <SettingsOutlinedIcon />
                            options
                        </div>
                    </Button>
                </Stack>

                <Stack direction='row' spacing={2} justifyContent='flex-end' alignSelf=''>
                    <Button
                        color='inherit'>
                        <NotificationsNoneOutlinedIcon />
                    </Button>
                    <NavElement icon={<AccountCircleOutlinedIcon />} >
                        <DropdownMenu>
                            <DropdownItem>
                                <Button onClick={signOutHandler} color='inherit'>
                                    Sign out!
                                </Button>
                                <LogoutRoundedIcon />

                            </DropdownItem>


                        </DropdownMenu>
                    </NavElement>
                </Stack>
            </Toolbar>
        </AppBar >
    )
}