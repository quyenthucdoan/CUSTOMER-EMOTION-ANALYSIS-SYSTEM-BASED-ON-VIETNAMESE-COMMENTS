/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import CmsServices from '../../../services/CsmServices';

const Summary = () => {
  const [statistic, setDataStatistic] = useState([0, 0, 0, 0]);
  const fetchData = () => {
    // Fetch tweet sentiment
    CmsServices.getSentimentSummary().then((res) => {
      res = res.results;
      // console.log(res);
      let total = 0;
      const stats = [];
      for (let i = 0; i < res.length; i += 1) {
        stats.push(res[i].value);
        total += res[i].value;
      }
      stats.push(total);
      setDataStatistic(stats);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="m-portlet">
      <div className="m-portlet__body  m-portlet__body--no-padding">
        <div className="row m-row--no-padding m-row--col-separator-xl">
          <div
            className="col-md-12 col-lg-3 col-xl-3"
            style={{
              margin: 'auto',
            }}
          >
            <div className="m-widget24">
              <div
                className="m-widget24__item"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <h4
                  className="m-widget24__title"
                  style={{ alignItems: 'center', marginTop: '0' }}
                >
                  Total
                </h4>
                <span
                  className="m-widget24__stats m--font-brand"
                  style={{ marginTop: '0', marginRight: '10px' }}
                >
                  {statistic[3]}
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-3 col-xl-3">
            <div className="m-widget24">
              <div className="m-widget24__item">
                <h4 className="m-widget24__title">Positive</h4>
                <br />
                <span className="m-widget24__desc">#Positive</span>
                <span className="m-widget24__stats m--font-success">
                  {statistic[0]}
                </span>
                <div className="m--space-10" />
                <div className="progress m-progress--sm">
                  <div
                    className="progress-bar m--bg-success bg-positive"
                    role="progressbar"
                    style={{
                      width: `${Math.round(
                        (statistic[0] * 100) / statistic[3]
                      )}%`,
                    }}
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>
                <span className="m-widget24__change">% in total</span>
                <span className="m-widget24__number">
                  {Math.round((statistic[0] * 100) / statistic[3])}%
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-3 col-xl-3">
            <div className="m-widget24">
              <div className="m-widget24__item">
                <h4 className="m-widget24__title">Neutral</h4>
                <br />
                <span className="m-widget24__desc">#Neutral</span>
                <span className="m-widget24__stats m--font-info">
                  {statistic[1]}
                </span>
                <div className="m--space-10" />
                <div className="progress m-progress--sm">
                  <div
                    className="progress-bar m--bg-info"
                    role="progressbar"
                    style={{
                      width: `${Math.round(
                        (statistic[1] * 100) / statistic[3]
                      )}%`,
                    }}
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>
                <span className="m-widget24__change">% in total</span>
                <span className="m-widget24__number">
                  {Math.round((statistic[1] * 100) / statistic[3])}%
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-3 col-xl-3">
            <div className="m-widget24">
              <div className="m-widget24__item">
                <h4 className="m-widget24__title">Negative</h4>
                <br />
                <span className="m-widget24__desc">#Negative</span>
                <span className="m-widget24__stats m--font-danger">
                  {statistic[2]}
                </span>
                <div className="m--space-10" />
                <div className="progress m-progress--sm">
                  <div
                    className="progress-bar m--bg-danger"
                    role="progressbar"
                    style={{
                      width: `${Math.round(
                        (statistic[2] * 100) / statistic[3]
                      )}%`,
                    }}
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>
                <span className="m-widget24__change">% in total</span>
                <span className="m-widget24__number">
                  {Math.round((statistic[2] * 100) / statistic[3])}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
