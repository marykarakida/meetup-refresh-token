import axios from '../services/api/axios';

import useAuth from './useAuth';

export default function useRefreshToken() {
    const { setAuth } = useAuth();
    // eslint-disable-next-line consistent-return
    const refresh = async () => {
        try {
            const refreshToken = localStorage.getItem('meetup-refreshToken');
            const { data } = await axios.post(`/auth/refresh`, { refreshToken });
            setAuth((prev) => {
                return {
                    ...prev,
                    accessToken: data.accessToken,
                };
            });

            localStorage.setItem('meetup-refreshToken', data.refreshToken);

            return data.accessToken;
        } catch (err) {
            setAuth({});
            localStorage.removeItem('meetup-refreshToken');
        }
    };

    return refresh;
}
