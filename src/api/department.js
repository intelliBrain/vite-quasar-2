import { api } from '@/plugins/api'

export const departmentApi = {
  create: (obj) => api.post('/api/departments', obj),
  get: (id) => api.get(`/api/departments/${id}`),
  delete: (obj) => api.delete('/api/departments', obj),
  update: (obj) => api.put('/api/departments', obj),
  checkName: (params) => api.get('/api/departments/check', params),
  search: () => api.get('/api/departments')
}
