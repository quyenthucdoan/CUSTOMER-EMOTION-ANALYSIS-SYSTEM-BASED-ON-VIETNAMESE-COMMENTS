import { get } from '../../config/request';

const DashboardServices = {
  getEmotionStats() {
    return get('/dashboard/getEmotionStats');
  },
  getSentiment2Source() {
    return get('/dashboad/getSentiment2Source');
  },
  getKeyword(method, numOfkeyWord) {
    return get(
      `/dashboard/getKeyword?method=${method}&numOfKeyword=${numOfkeyWord}`
    );
  },
  getCmsSentiment() {
    return get('/csm/getCmsSentiment');
  },
};

export default DashboardServices;
