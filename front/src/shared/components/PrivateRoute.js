import React from 'react';
import { Navigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import useRouter from '../hooks/useRouter';

function PrivateRoute({ children }) {
    const { auth } = useAuth();
    const { location } = useRouter();

    if (!auth?.accessToken) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default PrivateRoute;
