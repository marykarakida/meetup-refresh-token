import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Stack, TextField, Typography } from '@mui/material';

import useAuth from '../shared/hooks/useAuth';

import axios from '../shared/services/api/axios';

export default function LoginPage() {
    const { setAuth } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function login() {
        try {
            const {
                data: { accessToken, refreshToken },
            } = await axios.post('/auth/login', { email, password });

            localStorage.setItem('meetup-refreshToken', refreshToken);
            setAuth((prev) => ({ ...prev, accessToken }));
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log(err);
        }
    }

    return (
        <Stack height="100%" width="100%">
            <Typography variant="h2" component="h1">
                Login
            </Typography>
            <TextField fullWidth type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField fullWidth type="text" label="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button variant="contained" onClick={() => login()}>
                Entrar
            </Button>
            <p>
                <Link to="/register">Redirecionar para cadastro</Link>
            </p>
        </Stack>
    );
}
