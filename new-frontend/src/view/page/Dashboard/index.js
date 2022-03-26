/* eslint-disable react/no-unused-state */
import React from "react";
import SummaryNumber from "./summary";
import Sentiment from "./sentiment";
import Listing from './listing';
import WordCloud from "./wordcloud";

const Tweet = () => (
  <div style={{ padding: "5px" }}>
    <div className="row m-row--no-padding m-row--col-separator-xl">
      <div className="col-xl-12">
        <SummaryNumber />
      </div>
    </div>
    <div
      className="row m-row--no-padding padding_5"
      style={{ height: "500px" }}
    >
      <div className="col-xl-6">
        <Sentiment />
      </div>
      <div className="col-xl-6">
        <WordCloud />
      </div>
    </div>
    <div className="row">
      <div className="col-xl-12">
        <Listing />
      </div>
    </div>
  </div>
);

export default Tweet;
