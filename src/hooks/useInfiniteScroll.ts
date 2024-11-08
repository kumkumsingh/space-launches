import { useState, useCallback, useEffect } from 'react';

const useInfiniteScroll = (launchesLength: number, increment: number = 8) => {
  const [visibleCount, setVisibleCount] = useState<number>(8);

  const handleLoadMore = useCallback(() => {
    setVisibleCount(prevCount => Math.min(prevCount + increment, launchesLength));
  }, [launchesLength, increment]); 

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = window.innerHeight;

      if (scrollTop + clientHeight >= scrollHeight - 100) {
        handleLoadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleLoadMore]); 

  return { visibleCount };
};

export default useInfiniteScroll;
