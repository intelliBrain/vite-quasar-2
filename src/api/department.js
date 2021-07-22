import { api } from '@/plugins/api'

export const departmentApi = {
  create: (obj) => api.post('/api/departments', obj),
  get: (id) => api.get(`/api/departments/${id}`),
  delete: (obj) => api.delete('/api/departments', obj),
  update: (obj) => api.post(`/api/departments/${obj.id}`, obj),
  findByCode: (code) => api.get(`/api/departments/code/${code}`),
  findByName: (name) => api.get(`/api/departments/name/${name}`),
  search: () => api.get('/api/departments')
}
