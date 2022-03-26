import { get } from '../../config/request';

const TopicServices = {
  getTerms(numOfkeyWord) {
    return get(
      `/topic/terms?numOfTerms=${numOfkeyWord}`
    );
  },
};

export default TopicServices;
