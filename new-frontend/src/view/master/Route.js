/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

const Route = ({ path, children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isCurrentDashboard, setCurrentDashboard] = useState(true);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popState', onLocationChange);

    // cleanup listener outside the component
    return () => {
      window.removeEventListener('popState', onLocationChange);
    };
  }, []);
  return currentPath === path ? children : null;
};

export default Route;
