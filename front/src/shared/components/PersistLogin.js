import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import useRefreshToken from '../hooks/useRefreshToken';

export default function PersistLogin() {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                // eslint-disable-next-line no-console
                console.log(err);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        verifyRefreshToken();

        return () => {
            isMounted = false;
        };
    }, []);

    if (isLoading) {
        return <h1>Verificando se usuário possui um token de refresh...</h1>;
    }

    return <Outlet />;
}
