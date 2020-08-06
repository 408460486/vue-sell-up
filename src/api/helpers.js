import axios from 'axios'

const urlMap = {
  development: '/',
  production: 'http://192.168.137.1:8900/'
}
const baseUrl = urlMap[process.env.NODE_ENV]
const ERROR_OK = 0

export function get(url) {
  return function(params = {}) {
    return axios.get(baseUrl + url, {
      params
    }).then((response) => {
      const {
        errno,
        data
      } = response.data
      if (errno === ERROR_OK) {
        return data
      }
    }).catch((e) => {

    })
  }
}
