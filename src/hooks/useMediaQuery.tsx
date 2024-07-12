import { useState, useEffect } from 'react';

type MediaQueryResult = {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
};

const useMediaQuery = (): MediaQueryResult => {
    const getMatches = (): MediaQueryResult => {
        return {
            isMobile: window.matchMedia('(max-width: 640px)').matches,
            isTablet: window.matchMedia('(min-width: 641px) and (max-width: 1024px)').matches,
            isDesktop: window.matchMedia('(min-width: 1025px)').matches,
        };
    };

    const [matches, setMatches] = useState<MediaQueryResult>(getMatches);

    useEffect(() => {
        const handleResize = () => setMatches(getMatches);

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return matches;
};

export default useMediaQuery;
