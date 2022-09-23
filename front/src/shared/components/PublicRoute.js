import React from 'react';
import { Navigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

function PublicRoute({ restricted, children }) {
    const { auth } = useAuth();

    if (auth?.accessToken && restricted) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default PublicRoute;
