import { useEffect, useRef } from "react";

type Callback = (entries : IntersectionObserverEntry[]) => void;
interface ObserverOptions {
    root?: Element | null; // 관찰할 요소의 기준점, null일경우 viewport
    rootMargin?: string; // root와 관찰요소가 교차되는 거리 (클수록 멀리서 교차했을 때 이벤트 발생)
    threshold?: number | number[]; // 교차 비율 (몇퍼센트 이상 교차할 때 이벤트 발생)
}

export const useIntersectionObserver = (callback : Callback, options?: ObserverOptions) => {
    const targetRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(callback, options);
        
        if(targetRef.current) {
            observer.observe(targetRef.current);
        }
        
        return () => {
            if(targetRef.current) {
                observer.unobserve(targetRef.current);
            }
        }
    });

    return targetRef;
}