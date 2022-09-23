import React, { useState } from 'react';
import { Button, ButtonGroup, Stack, Typography } from '@mui/material';

import useAuth from '../shared/hooks/useAuth';
import useAxiosPrivate from '../shared/hooks/useAxiosPrivate';
import useRouter from '../shared/hooks/useRouter';
import useLogout from '../shared/hooks/useLogout';

export default function HomePage() {
    const { setAuth } = useAuth();
    const { navigate } = useRouter();
    const axiosPrivate = useAxiosPrivate();
    const logout = useLogout();

    const [userData, setUserData] = useState();

    async function getUserData() {
        try {
            const { data } = await axiosPrivate.get('/users/me');

            setUserData(data);
        } catch (err) {
            navigate('/login');
        }
    }

    async function signOut() {
        await logout();
        navigate('/login');
    }

    return (
        <Stack height="100%" width="100%">
            <Typography variant="h2" component="h1">
                Home
            </Typography>
            <ButtonGroup sx={{ justifyContent: 'space-between' }}>
                <Button variant="contained" onClick={() => getUserData()}>
                    Mostrar info do usuário
                </Button>
                <Button
                    variant="contained"
                    onClick={() =>
                        setAuth((prev) => ({
                            ...prev,
                            accessToken:
                                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI1OTEzYzg4LTUwNjEtNGVlZC05ODYzLTZiNjY0MmU2MmUyZSIsImlhdCI6MTY2Mzk0Njk0MSwiZXhwIjoxNjYzOTQ2OTQxfQ.D5ABax_i8TeORW_fgzxaIU-ASELkAa7QjYyLSqb9lZo',
                        }))
                    }
                >
                    Simular access token expirado
                </Button>
                <Button variant="contained" onClick={() => localStorage.removeItem('meetup-refreshToken')}>
                    simular refresh token expirado
                </Button>
                <Button variant="contained" onClick={() => signOut()}>
                    Logout
                </Button>
            </ButtonGroup>
            <Typography variant="h6" component="pre">
                {JSON.stringify(userData, null, 2)}
            </Typography>
        </Stack>
    );
}
