import { api } from '@/plugins/api'

export const logApi = {
  search: (params) => api.post('/api/system/logs/search', params),
  list: (params) => api.post('/api/system/logs/list', params)
}
