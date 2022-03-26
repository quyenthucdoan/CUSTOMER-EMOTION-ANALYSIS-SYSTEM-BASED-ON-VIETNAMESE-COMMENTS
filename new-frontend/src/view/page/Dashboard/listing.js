/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import ReactPaginate from 'react-paginate';
import Moment from 'moment';
// import Loader from 'react-loader-spinner';
import { Oval } from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import CmsServices from '../../../services/CsmServices/';

const Listing = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [totalData, setTotalData] = useState(0);
  const [sortingDesc, setSortingDesc] = useState(false);

  const refKeyword = useRef();

  const fetchData = (pageNumber) => {
    setIsLoading(true);
    CmsServices.getByKeyword(
      refKeyword.current.value,
      pageNumber + 1,
      sortingDesc
    ).then((res) => {
      setData(res.results);
      setTotalData(res.total);
      setIsLoading(false);
    });
  };
  const handlePageChanged = (pageNumber) => {
    console.log(pageNumber)
    pageNumber = pageNumber.selected;
    // setIsLoading(true);
    setCurrentPage(pageNumber);
    fetchData(pageNumber);
  };
  useEffect(() => {
    fetchData(currentPage);
  }, []);
  const toogleSort = () => {
    // setIsLoading(true);
    setSortingDesc(!sortingDesc);
    fetchData();
  };

  const getSentimentLabel = (value) => {
    if (value === 0) return 'Neutral';
    if (value === 1) return 'Positive';
    return 'Negative';
  };

  const getColor = (value) => {
    switch (value) {
      case 1:
        return 'rgb(6, 178, 217, 0.2)';
      case 0:
        return 'rgb(0, 35, 82, 0.2)';
      default:
        return 'rgb(217, 44, 125, 0.2)';
    }
  };
  return (
    <div className="m-portlet">
      <div className="m-portlet__body">
        <div className="row m-row--no-padding">
          <div className="col-sm-4">
            <input
              ref={refKeyword}
              className="form-control m-input"
              type="text"
              placeholder="Search keyword"
            />
          </div>
          <div className="col-sm-2" style={{ paddingLeft: '10px' }}>
            <button
              onClick={fetchData}
              id="upRelatedGraph"
              className="btn btn-primary"
            >
              <span>
                <i className="fa flaticon-search" />
                <span>&nbsp; Update</span>
              </span>
            </button>
          </div>
          <div className="col-sm-6" style={{ textAlign: 'right' }}>
            <ReactPaginate
              previousLabel="<"
              nextLabel=">"
              breakLabel=".."
              breakClassName="break-me"
              pageCount={totalData / 10}
              marginPagesDisplayed={2}
              pageRangeDisplayed={7}
              onPageChange={handlePageChanged}
              containerClassName="pagination"
              subContainerClassName="pages pagination"
              activeClassName="active"
            />
          </div>
        </div>
        <div className="row m-row--no-padding">
          <div
            className="col-sm-12"
            style={{ textAlign: 'center', marginTop: '20px' }}
          >
            {isLoading && (
              <Oval
                // type="Oval"
                color="#716ACA"
                height={100}
                width={100}
                style={{ marginTop: '200px', marginBottom: '200px' }}
              />
            )}
            {!isLoading && (
              <div className="m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll">
                <table
                  className="m-datatable__table table-bordered"
                  width="100%"
                  style={{
                    display: 'block',
                    minHeight: '300px',
                    overflowX: 'auto',
                  }}
                >
                  <thead className="m-datatable__head">
                    <tr className="m-datatable__row">
                      <th className="m-datatable__cell">
                        <span>Text</span>
                      </th>
                      <th
                        className="m-datatable__cell"
                        style={{ width: '200px', textAlign: 'right' }}
                      >
                        <span>Sentiment</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="m-datatable__body">
                    {data.map(item => (
                      <tr
                        className={`m-datatable__row sentiment_${item.sentiment}`}
                        key={item.id}
                        style={{
                          backgroundColor: getColor(item.sentiment),
                        }}
                      >
                        <td className="m-datatable__cell">
                          <span>{item.raw_text}</span>
                        </td>
                        <td
                          style={{ width: '200px' }}
                          className="m-datatable__cell text-align-right"
                        >
                          {getSentimentLabel(item.sentiment)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
