import { useState, useEffect } from 'react';

interface Location {
  pathname: string;
  search: string;
  hash: string;
}

export function useLocation(): Location {
  const [location, setLocation] = useState<Location>({
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash
  });

  useEffect(() => {
    const handleLocationChange = () => {
      setLocation({
        pathname: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash
      });
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  return location;
}

export function navigate(to: string): void {
  const normalized = to.startsWith('#')
    ? to
    : `#/${to.startsWith('/') ? to.slice(1) : to}`;
  window.location.hash = normalized;
}