import React, { useState, useEffect } from 'react';
import DashboardServices from '../../../services/DashboardServices';

const EmotionList = () => {
  const [emotionStats, setEmotionStats] = useState([]);

  const fetchData = () => {
    DashboardServices.getEmotionStats().then((res) => {
      res = res.results;
      setEmotionStats(res);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderedList = emotionStats.map((item, idx) => (
    <div key={`abc_${idx}`} className="m-widget16__item">
      <span className="m-widget16__date">{item.emotion}</span>
      <span className="m-widget16__price m--align-right m--font-brand">
        {item.countemotion}
      </span>
    </div>
  ));

  return (
    <div>
      <div className="m-widget16__head">
        <div className="m-widget16__item">
          <span className="m-widget16__sceduled">Type</span>
          <span className="m-widget16__amount m--align-right">Amount</span>
        </div>
      </div>
      <div className="m-widget16__body">{renderedList}</div>
    </div>
  );
};

export default EmotionList;
