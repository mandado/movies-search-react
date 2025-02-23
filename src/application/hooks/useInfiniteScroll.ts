import { useEffect, RefObject } from 'react';

interface UseInfiniteScrollProps {
  observerRef: RefObject<HTMLDivElement>;
  hasMore: boolean;
  loading: boolean;
  onIntersect: () => void;
}

export function useInfiniteScroll({
  observerRef,
  hasMore,
  loading,
  onIntersect
}: UseInfiniteScrollProps) {
  useEffect(() => {
    const currentObserverRef = observerRef.current;

    console.log('currentObserverRef', currentObserverRef);
    if (!currentObserverRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        console.log('entry', entry, hasMore, loading);
        if (entry.isIntersecting && hasMore && !loading) {
          console.log('Intersecting, loading more...'); // Debug
          onIntersect();
        }
      },
      { 
        root: null,
        rootMargin: '20px',
        threshold: 0.1
      }
    );

    observer.observe(currentObserverRef);

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [observerRef, hasMore, loading, onIntersect]);
} 