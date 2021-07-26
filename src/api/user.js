import { api } from '@/plugins/api'

export const userApi = {
  login: (form) =>
    api.post('/api/login', form, {
      headers: {
        accept: 'application/json',
        'accept-language': 'UTF-8',
        'content-type': 'application/x-www-form-urlencoded'
      }
    }),
  register: (form) => api.post('api/users/registration', form),
  captchaLogin: (form) => api.post('/api/captcha/login', form),
  currentUser: () => api.get('/api/users/current'),
  search: (params) => api.post('/api/users/search', params),
  create: (params) => api.post('/api/users', params),
  update: (params) => api.put('/api/users', params),
  list: (filter) => api.post('/api/users/list', filter),
  check: (params) => api.get('/api/users/check', params),
  resetPassword: (params) => api.get('/api/users/password', params)
}

export const captchaApi = {
  sendCaptchaCode: (contact) => api.post(`/api/captcha/${contact}`)
}

export const roleApi = {
  list: () => api.get('/api/roles'),
  create: (obj) => api.post('/api/roles', obj),
  update: (obj) => api.put('/api/roles', obj),
  checkName: (params) => api.get('/api/roles/check', params)
}
