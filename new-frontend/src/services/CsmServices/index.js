import { get } from '../../config/request';

const CsmServices = {
  getSentimentSummary() {
    return get('/csm/getCsmSentiment');
  },
  getByKeyword(filterKeyword, currentPage, sortDesc) {
    return get(`/csm/getCsmByKeyword?filterKeyword=${filterKeyword}&currentPage=${currentPage}&sortDesc=${sortDesc}`);
  },
};

export default CsmServices;
