/**
 * 请求拦截
 * @param {Object} http
 */
module.exports = (vm) => {
    uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
        // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
        config.data = config.data || {}
        config.header.Accept = 'application/json'
        // 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
        // console.log(vm.$store.state);
        // 根据custom参数中配置的是否需要token，添加对应的请求头
        config.header.Authorization = 'Bearer ' + uni.getStorageSync('auth_token')
        return config
    }, (config) => // 可使用async await 做异步操作
        Promise.reject(config))
}
