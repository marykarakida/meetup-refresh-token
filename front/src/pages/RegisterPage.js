import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Stack, TextField, Typography } from '@mui/material';

import useRouter from '../shared/hooks/useRouter';

import axios from '../shared/services/api/axios';

export default function RegisterPage() {
    const { navigate } = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function register() {
        try {
            await axios.post('/auth/register', { email, password });
            navigate('/login', { replace: true });
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log(err);
        }
    }

    return (
        <Stack height="100%" width="100%">
            <Typography variant="h2" component="h1">
                Cadastro
            </Typography>
            <TextField fullWidth type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField fullWidth type="text" label="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button variant="contained" onClick={() => register()}>
                Cadastrar
            </Button>
            <p>
                <Link to="/login">Redirecionar para login</Link>
            </p>
        </Stack>
    );
}
