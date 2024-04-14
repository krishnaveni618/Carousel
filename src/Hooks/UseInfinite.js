import { useEffect, useRef } from 'react';

const useInfiniteScroll = (onReachEnd) => {
    const observer = useRef();

    useEffect(() => {
        const observedElement = document.createElement('div');
        document.body.appendChild(observedElement);

        if (window.IntersectionObserver) {
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    onReachEnd();
                }
            }, {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            });

            observer.current.observe(observedElement);
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
            document.body.removeChild(observedElement);
        };
    }, [onReachEnd]);

    // This hook does not return anything because its sole purpose is to observe and trigger the callback
}
export default useInfiniteScroll;