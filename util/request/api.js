const http = uni.$u.http

export const storeCheckIn = (params, config = {}) => http.post('/api/store/check-in', params, config)
export const getUserInfo = (data) => http.get('/api/user/info', data)
export const getCheckInInfo = (params, config = {}) => http.post('/api/check-in-info', params, config)
export const getDataDetail = (data) => http.get('/api/data-info', data)
export const getUserCheckInCount = (data) => http.get('/api/user/check-in-count', data)
export const getUserCheckInPosition = (data) => http.get('/api/user/check-in-position', data)
export const getUserCheckInData = (data) => http.get('/api/user/check-in-country-count', data)
export const getListData = (data) => http.get('/api/list-data', data)
export const getDataByLocation = (data) => http.get('/api/data-by-location', data)
export const getUserTokenByTokenKey = (data) => http.get('/api/user/token-by-key', data)
