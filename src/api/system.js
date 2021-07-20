import { api } from '@/plugins/api'

export const systemApi = {
  search: (params) => api.post('/api/system/logs/search', params),
  list: (params) => api.post('/api/system/logs/list', params)
}
