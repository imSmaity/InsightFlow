import axios from 'axios'
import config from '../apiConfig'

const axiosInstance = axios.create({
  baseURL: `${config.API_URL}${config.API_VERSION.BASE}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain, */*',
  },
})

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getVisualizationData() {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(config.USER.BASE.concat(config.INFO.BASE))
        .then((res) => resolve(res.data))
        .catch((error) => reject(error))
    })
  },
}
