import axios from '../services/api/axios';
import useAuth from './useAuth';

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        try {
            const refreshToken = localStorage.getItem('meetup-refreshToken');
            await axios.post('/auth/logout', { refreshToken });

            setAuth({});
            localStorage.removeItem('meetup-refreshToken');
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);
        }
    };

    return logout;
};

export default useLogout;
