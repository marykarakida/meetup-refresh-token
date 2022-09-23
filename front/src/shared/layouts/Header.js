import React from 'react';
import { Container, Typography } from '@mui/material';

import useAuth from '../hooks/useAuth';
import useRouter from '../hooks/useRouter';

export default function Header() {
    const { pathname } = useRouter();
    const { auth } = useAuth();

    return (
        <Container component="header" sx={{ alignItems: 'center' }}>
            <Typography variant="h5" component="p" sx={{ wordBreak: 'break-all', color: '' }}>
                access token: {auth?.accessToken} <br />
                refresh token: {localStorage.getItem('meetup-refreshToken')}
            </Typography>

            <br />
            {pathname !== '/' && (
                <>
                    <Typography variant="h6" component="p" sx={{ textAlign: 'justify' }}>
                        Esse é um exemplo de um site usando refresh token.
                    </Typography>
                    <Typography variant="h6" component="p" sx={{ textAlign: 'justify' }}>
                        Quando o usuário abre o aplicativo, o aplicativo verifica se o usuário possui um refresh token no local storage. Ele
                        vai enviar uma requisição para solicitar um access token (POST /auth/refresh). Se tiver refresh token e ele não
                        estiver expirado, o servidor vai devolver um novo access token e refresh token e redirecionar o usuário para a Home
                        Page (&quot;/&quot;). Se não for autorizado, o aplicativo vai redirecionar o usuário para a tela de login
                        (&quot;/login&quot;).
                    </Typography>
                </>
            )}
            {pathname === '/' && (
                <>
                    <Typography variant="h6" component="p" sx={{ textAlign: 'justify' }}>
                        Na página Home, você pode simular como o aplicativo solicita um novo access token quando o antigo expirar.
                    </Typography>
                    <Typography variant="h6" component="p" sx={{ textAlign: 'justify' }}>
                        O botão &quot;mostrar info do usuário&quot; manda uma requisição GET para a rota &quot;/users/me&quot; e é uma rota
                        autenticada. Se o access token não estiver expirado, ele retornará os dados do usuário salvo no banco de dados.
                        <br />O botão &quot;simular access token expirado&quot; troca o access token atual para um que está expirado. Se
                        clicar no botão &quot;mostrar info do usuário&quot; e o access token estiver expirado, o aplicativo vai pegar o
                        refresh token que está salvo no local storage e solicitar um novo access token (POST /auth/refresh) e reenviar a
                        requisição inicial.
                        <br />O botão &quot;simular refresh token expirado&quot; remove o refresh token do local storage (não é a melhor
                        maneira de simular refresh token expirado, mas mostra o POST /auth/refresh não dando certo). Se clicar no botão
                        &quot;simular access token expirado&quot; e &quot;mostrar info do usuário&quot; e o access token e o refresh token
                        estiver expirado, o aplicativo vai remover access e refresh token do aplicativo e voltar para a página de login.
                        <br />O botão &quot;logout&quot; manda uma requisição GET para a rota &quot;/users/me&quot; que remove a sessão do
                        banco de dados, remove access e refresh token atuais do aplicativo e redireciona para a página de login.
                    </Typography>
                </>
            )}
            <br />
        </Container>
    );
}
