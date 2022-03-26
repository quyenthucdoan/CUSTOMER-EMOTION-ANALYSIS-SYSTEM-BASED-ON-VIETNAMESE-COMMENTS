/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import SentimentPie from "./sentiment_pie";

const Sentiment = () => {
  const fetchData = () => {};
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="m-portlet  m-portlet--full-height"
         style={{ borderRight: "1px solid #ebedf2" }}>
      <div className="m-portlet__head">
        <div className="m-portlet__head-caption">
          <div className="m-portlet__head-title">
            <h3 className="m-portlet__head-text">Sentiment Analysis</h3>
          </div>
        </div>
      </div>
      <div className="m-portlet__body">
        <SentimentPie />
      </div>
    </div>
    // <div /////////////d-flex justify-content-center  h-100 d-inline-block 
    //   className="m-portlet  m-portlet--full-height"
    //   // style={{ height: '386px' }}
    // >
    //   <div className="m-portlet__head">
    //     <div className="m-portlet__head-caption">
    //       <div className="m-portlet__head-title">
    //         <h3 className="m-portlet__head-text">Sentiment Analysis</h3>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="m-portlet__body m-portlet__body--no-padding">
    //     <div
    //       className="row m-row--col-separator-xl"
    //       style={{ padding: '10px' }}
    //     >
    //       <div className="col-xl-12">
    //         <SentimentPie />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Sentiment;
