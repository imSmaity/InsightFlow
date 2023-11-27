import axios from 'axios'
import config from '../apiConfig'

const axiosInstance = axios.create({
  baseURL: `${config.API_URL}${config.API_VERSION.BASE}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain, */*',
  },
})

const axiosAuthInstance = function (token) {
  return axios.create({
    baseURL: `${config.API_URL}${config.API_VERSION.BASE}`,
    headers: {
      token,
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain, */*',
    },
  })
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  signupUser(data) {
    return new Promise((reject, resolve) => {
      axiosInstance
        .post(config.USER.BASE, data)
        .then((res) => resolve(res.data))
        .catch((error) => reject(error))
    })
  },
  loginUser(data) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(config.USER.BASE.concat(config.LOGIN.BASE), data)
        .then((res) => resolve(res.data))
        .catch((error) => reject(error))
    })
  },
  synchronizeUser(token) {
    return new Promise((resolve, reject) => {
      axiosAuthInstance(token)
        .get(config.USER.BASE.concat(config.SYNC.BASE))
        .then((res) => resolve(res.data))
        .catch((error) => reject(error))
    })
  },
  getVisualizationData(
    product,
    startDate,
    endDate,
    ageRange,
    gender,
    zoomStart,
    zoomEnd,
    token
  ) {
    return new Promise((resolve, reject) => {
      axiosAuthInstance(token)
        .get(
          config.USER.BASE.concat(config.INFO.BASE)
            .concat('?')
            .concat(
              `product=${product}&startDate=${startDate}&endDate=${endDate}&ageRange=${ageRange}&gender=${gender}&zoomStart=${zoomStart}&zoomEnd=${zoomEnd}`
            )
        )
        .then((res) => resolve(res.data))
        .catch((error) => reject(error))
    })
  },
}
