import React from 'react';
import { Outlet } from 'react-router-dom';

import { Container, Stack } from '@mui/material';
import Header from './Header';

export default function Layout() {
    return (
        <Container component="main" sx={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
            <Stack sx={{ width: '100%' }}>
                <Header />
                <Outlet />
            </Stack>
        </Container>
    );
}
