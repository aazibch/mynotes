import { useEffect, useRef } from 'react';

const useClickOutside = (passedHandler) => {
    const elemRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (!elemRef.current?.contains(e.target)) {
                passedHandler();
            }
        };

        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        };
    });

    return elemRef;
};

export default useClickOutside;
