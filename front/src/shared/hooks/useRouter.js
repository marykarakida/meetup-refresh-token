import { useMemo } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

function useRouter() {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    return useMemo(
        () => ({
            navigate,
            pathname: location.pathname,
            query: {
                ...queryString.parse(location.search),
                ...params,
            },
            location,
        }),
        [params, location]
    );
}

export default useRouter;
