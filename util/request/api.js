const http = uni.$u.http

// 用户用户的CheckIn信息
export const storeCheckIn = (params, config = {}) => http.post('/api/store/check-in', params, config)
// 获取用户信息
export const getUserInfo = (data) => http.get('/api/user/info', data)
// 获取CheckIn的信息
export const getCheckInInfo = (params, config = {}) => http.post('/api/check-in-info', params, config)
// 获取遗迹详情数据
export const getDataDetail = (data) => http.get('/api/data-info', data)
// 获取用户CheckIn的遗迹数量
export const getUserCheckInCount = (data) => http.get('/api/user/check-in-count', data)
// 获取用户打卡的遗迹列表
export const getUserCheckInData = (data) => http.get('/api/user/check-in-country-count', data)
// 获取所有的遗迹信息
export const getListData = (data) => http.get('/api/list-data', data)
// 根据经纬度获取遗迹信息
export const getDataByLocation = (data) => http.get('/api/data-by-location', data)
// 根据token_key获取用户信息
export const getUserTokenByTokenKey = (data) => http.get('/api/user/token-by-key', data)
