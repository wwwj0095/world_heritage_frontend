const http = uni.$u.http

// post请求，获取菜单
export const postMenu = (params, config = {}) => http.post('/ebapi/public_api/index', params, config)
// 用户用户的CheckIn信息
export const storeCheckIn = (params, config = {}) => http.post('/api/store/check-in', params, config)

// get请求，获取菜单，注意：get请求的配置等，都在第二个参数中，详见前面解释
// 获取用户信息
export const getUserInfo = (data) => http.get('/api/user/info', data)
// 获取遗迹的总数量
export const getHeritageCount = (data) => http.get('/api/heritage-count', data)
// 获取遗迹的大洲
export const getContinent = (data) => http.get('/api/heritage-continent-list', data)
// 获取遗迹的列表
export const getHeritage = (data) => http.get('/api/heritage-list', data)
// 获取遗迹的分类
export const getHeritageCategory = (data) => http.get('/api/heritage-category-list', data)
// 获取遗迹的国家
export const getHeritageCountry = (data) => http.get('/api/heritage-country-list', data)
// 获取CheckIn的信息
export const getCheckInInfo = (params, config = {}) => http.post('/api/check-in-info', params, config)
// 获取遗迹所属的国家列表
export const getMyCheckInHeritage = (data) => http.get('/api/my-check-in-heritage', data)
// 获取遗迹详情数据
export const getHeritageDetail = (data) => http.get('/api/heritage-detail', data)
// 获取用户CheckIn的遗迹数量
export const getUserCheckInCount = (data) => http.get('/api/user/check-in-count', data)
// 获取国家级别的遗迹数量
export const getHeritageCountryCount = (data) => http.get('/api/heritage-country-count', data)
// 获取用户打卡的遗迹列表
export const getUserCheckInHeritage = (data) => http.get('/api/user/check-in-country-count', data)

// 获取所有的遗迹信息
export const getAllHeritage = (data) => http.get('/api/heritage-all', data)
// 获取twitter 登录情况
export const getTwitterLogin = (data) => http.get('/twitter/auth/callback', data)
// 根据经纬度获取遗迹信息
export const getHeritageByLocation = (data) => http.get('/api/heritage-by-location', data)
