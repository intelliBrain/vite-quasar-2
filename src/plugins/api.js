import router from 'src/router'
import axios from 'axios'
import qs from 'qs'
import errorMsgs from 'src/assets/langs/en.js'
import { LocalStorage, Notify } from 'quasar'

const parseError = (result) => {
  console.log('parseError', result)
  if (result.status === 401) {
    localStorage.setItem('lastUrl', router.currentRoute.fullPath)
    setTimeout(() => {
      router.push({
        name: 'login',
        params: { redirect: router.currentRoute.fullPath }
      })
    }, 350)
  } else {
    Notify.create({
      type: 'warning',
      position: 'top',
      message:
        errorMsgs[result.message] || errorMsgs[result.code] || errorMsgs['defaultErrorMessage']
    })
  }
}

const refreshAccessToken = () => {
  const refreshToken = LocalStorage.getItem('User/refreshToken') || {}
  return axios
    .post(
      '/api/captcha/token',
      qs.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken.tokenValue
      }),
      {
        headers: {
          accept: 'application/json',
          'accept-language': 'UTF-8',
          'content-type': 'application/x-www-form-urlencoded'
        }
      }
    )
    .then((response) => {
      if (response.status == 200) {
        const data = response.data.data
        LocalStorage.set('User/accessToken', {
          expiresAt: data.accessToken.expiresAt,
          tokenValue: data.accessToken.tokenValue
        })
        LocalStorage.set('User/refreshToken', {
          expiresAt: data.refreshToken.expiresAt,
          tokenValue: data.refreshToken.tokenValue
        })
      }
    })
    .catch((err) => ({}))
}
const api = axios.create({})

api.interceptors.request.use((req) => {
  const accessToken = LocalStorage.getItem('User/accessToken') || {}
  if (accessToken.tokenValue) {
    req.headers.Authorization = 'Bearer ' + accessToken.tokenValue
  }
  return req
})
// 响应拦截
api.interceptors.response.use(
  (res) => {
    let result = res.data || {}
    if (result.status === 'fail') {
      parseError(result)
    }
    return result || { data: {} }
  },
  async (err) => {
    const originalRequest = err.config
    if (err.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      await refreshAccessToken()
      const accessToken = LocalStorage.getItem('User/accessToken') || {}
      if (accessToken.tokenValue) {
        originalRequest.headers['Authorization'] = 'Bearer ' + accessToken.tokenValue
        return api(originalRequest)
      }
    }
    const result = err.response
    parseError(result)
    return Promise.reject(result)
  }
)

export { api, axios }
