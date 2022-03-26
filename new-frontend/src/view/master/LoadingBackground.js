import React from 'react';
import ReactLoading from 'react-loading';

const LoadingBackground = ({ className }) => (
  <div className={`loading-background ${className}`}>
    <ReactLoading
      type="spin"
      color="#DDD"
      width="50px"
      height="50px"
      className="loading-spinner"
    />
  </div>
);

export default LoadingBackground;
