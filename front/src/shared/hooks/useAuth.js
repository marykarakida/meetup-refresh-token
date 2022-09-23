import { useContext } from 'react';
import AuthContext from '../contexts/AuthProvider';

function useAuth() {
    return useContext(AuthContext);
}

export default useAuth;
