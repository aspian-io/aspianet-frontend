import { FC, useEffect } from 'react';

interface IProps {
  handleScroll?: Function;
}

export const ScrollSpy: FC<IProps> = ({ handleScroll }) => {
  const isInViewPort = (entry: IntersectionObserverEntry, offset = 240) => {
    const rect = entry.boundingClientRect;
    return rect.top - 1 <= 0 + offset && rect.bottom >= 0 + offset;
  };

  useEffect(() => {
    const scrollables = Array.from(
      document.querySelectorAll('[data-scrollspy]')
    );
    for (let scrollable of scrollables) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            handleScroll && handleScroll(entry, isInViewPort);
          });
        },
        {
          root: null,
          rootMargin: '0px 0px 0px 0px',
          threshold: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        }
      );
      observer.observe(scrollable);
    }
  }, [handleScroll]);

  return null;
};
