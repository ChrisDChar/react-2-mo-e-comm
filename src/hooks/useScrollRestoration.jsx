import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const scrollPositions = {};

export const useScrollRestoration = (restoreImmediately = true) => {
  const { pathname } = useLocation();

  useEffect(() => {
    let timer;

    if (restoreImmediately) {
      timer = setTimeout(() => {
        const pos = scrollPositions[pathname] || 0;
        window.scrollTo(0, pos);
      }, 0);
    }

    const handleScroll = () => {
      scrollPositions[pathname] = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, restoreImmediately]);
};

export const restoreScrollPosition = (pathname) => {
  const pos = scrollPositions[pathname] || 0;
  window.scrollTo(0, pos);
};
